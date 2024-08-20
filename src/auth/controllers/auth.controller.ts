import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { CreateUserDto } from "../dto/create-user.dto";
import MESSAGES from "src/common/messages";
import { LoginUserDto } from "../dto/login-user.dto";
import { AuthResponseDto } from "../dto/auth-response.dto";

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

    /**
     * Auth Login for User and generates a JWT access token for him..
     * @param {LoginUserDto} loginUserDto
     */
    @Post("login")
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginUserDto: LoginUserDto) {
        const authResponseDto: AuthResponseDto = await this.authService.login(
        loginUserDto
        );

        return {
        message: MESSAGES.SUCCESS.SUCCESS,
        id: authResponseDto.id,
        Authorization: `Bearer ${authResponseDto.accessToken}`
        };
    }
}