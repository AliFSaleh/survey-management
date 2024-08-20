import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/services/user.service";
import { CreateUserDto } from "../dto/create-user.dto";
import { AuthResponseDto } from "../dto/auth-response.dto";
import { User } from "src/user/entities/user.entity";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
    constructor (
        private configService: ConfigService,
        private readonly jwtService: JwtService,
        private readonly userService: UserService
    ) {}

    /**
     * Registers a new user and generates access with refresh JWT tokens for them.
     * @param {CreateUserDto} createUserDto
     * @returns {Promise<AuthResponseDto>}
     */
    async signup (createUserDto: CreateUserDto): Promise<AuthResponseDto> {
        const user = await this.userService.create(createUserDto);

        const accessToken = await this.createAccessToken(user.id, user.role);

        await this.userService.updateUserAccessToken(user.id, accessToken);

        return {
            id: user.id,
            accessToken
        }
    }




    /**
     * Create JWT access token for users.
     * @param {User["id"]} id
     * @param {User["role"]} role
     * @returns {Promise<string>}
     */
    async createAccessToken(id: User["id"], role: User["role"]): Promise<string> {
        return this.jwtService.signAsync(
        { id, role },
        {
            secret: this.configService.get<string>("app.jwtAccessSecret", {
            infer: true
            }),
            expiresIn: this.configService.get<string>("app.accessTokenExpiresIn", {
            infer: true
            })
        }
        );
    }
}
