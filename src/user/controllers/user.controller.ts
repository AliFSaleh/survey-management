import { Controller, Get, HttpCode, HttpStatus, Request } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { Auth } from "src/auth/decorators/auth.decorator";
import { User } from "../entities/user.entity";

@Controller("users")
export class UserController {
    constructor (
        private userService: UserService
    ) {}

    /**
     * Get my profile info
     */
    @Get("me")
    @Auth()
    @HttpCode(HttpStatus.CREATED)
    async get_me (@Request() req): Promise<User> {
        return this.userService.findOneById(req.user.id);
    }
}