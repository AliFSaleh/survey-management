import {
    Injectable,
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus
  } from "@nestjs/common";
  import { JwtService } from "@nestjs/jwt";
  import CONSTANTS from "src/common/constants";
  import MESSAGES from "src/common/messages";
import { User } from "src/user/entities/user.entity";
import { UserService } from "src/user/services/user.service";
import { validateTokenProperties } from "src/utils/auth.utils";
  
  /**
   * Auth Guard Middleware for Private routes.
   * Checks if token is valid or not and puts it in req.user object
   */
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(
      private readonly jwtService: JwtService,
      private readonly userService: UserService
    ) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
  
      const authHeader = request?.headers?.authorization;
  
      if (!authHeader) {
        throw new HttpException(
          MESSAGES.ERROR.UNAUTHORIZED,
          HttpStatus.UNAUTHORIZED
        );
      }
  
      const [bearer, token] = authHeader.split(" ");
  
      if (bearer !== "Bearer" || !token)
        throw new HttpException(
          MESSAGES.ERROR.UNAUTHORIZED,
          HttpStatus.UNAUTHORIZED
        );
  
      let payload;
  
      try {
        payload = await this.jwtService.verifyAsync(token, {
          secret: CONSTANTS.JWT_ACCESS_SECRET
        });
      } catch (error) {
        throw new HttpException(
          MESSAGES.ERROR.EXPIRED_ACCESS_TOKEN,
          HttpStatus.UNAUTHORIZED
        );
      }
  
      if (!validateTokenProperties(payload))
        throw new HttpException(
          MESSAGES.ERROR.INVALID_JWT_TOKEN_PAYLOAD + ": " + payload,
          HttpStatus.UNAUTHORIZED
        );
  
      const user: User = await this.userService.findOneById(payload.id);
  
      if (!user.accessToken || user.accessToken !== token)
        throw new HttpException(
          MESSAGES.ERROR.INVALID_JWT_TOKEN + ": " + payload,
          HttpStatus.UNAUTHORIZED
        );
  
      request["user"] = payload;
  
      return true;
    }
  }
  