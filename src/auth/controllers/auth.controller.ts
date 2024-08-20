import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { CreateUserDto } from "../dto/create-user.dto";
import MESSAGES from "src/common/messages";

@Controller("auth")
export class AuthController {
    constructor (
        private authService: AuthService 
    ) {}
    
    /**
     * Registers a new user and generates a JWT access and refresh tokens for him.
     * @param {CreateUserDto} createUserDto
     */
    @Post("signup")
    @HttpCode(HttpStatus.CREATED)
    async signup (@Body() createUserDto: CreateUserDto) {
       const data = await this.authService.signup(createUserDto);
       
       return {
            message: MESSAGES.SUCCESS.USER_CREATED,
            id: data.id,
            Authorization: `Bearer ${data.accessToken}`
        };
    }
}