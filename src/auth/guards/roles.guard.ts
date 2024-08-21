import {
    Injectable,
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus
  } from "@nestjs/common";
  import { Reflector } from "@nestjs/core";
  import MESSAGES from "src/common/messages";
import { RoleEnum } from "src/user/enums/role.enum";
  
  /**
   * Roles Guard to protect endpoints with JWT verification and roles check
   * Assigns destructured JWT to the req.user for controllers to access
   */
  @Injectable()
  export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
    canActivate(context: ExecutionContext): boolean {
      const requireRoles = this.reflector.getAllAndOverride<RoleEnum[]>("roles", [
        context.getHandler(),
        context.getClass()
      ]);
  
      if (requireRoles.length === 0) {
        return true;
      }
  
      try {
        const { user } = context.switchToHttp().getRequest();
  
        const result = requireRoles.some((role) => user.role.includes(role));
  
        return result;
      } catch (error) {
        throw new HttpException(
          MESSAGES.ERROR.UNAUTHORIZED,
          HttpStatus.UNAUTHORIZED
        );
      }
    }
  }
  