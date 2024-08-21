import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { FindOperator, ILike, Repository } from "typeorm";
import { CreateUserDto } from "src/auth/dto/create-user.dto";
import MESSAGES from "src/common/messages";
import { instanceToInstance } from "class-transformer";

@Injectable()
export class UserService {
    constructor (
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    /**
     * Creates a user.
     * @param {CreateUserDto} createUserDto
     * @returns {Promise<User>}
     * @throws {HttpException} if a user with the same email already exists.
     */
    async create (createUserDto: CreateUserDto) {
        const existingUser = await this.findOneByEmail(createUserDto.email);

        if(existingUser) {
            throw new HttpException(
                MESSAGES.ERROR.EMAIL_ALREADY_EXIST,
                HttpStatus.CONFLICT
            )
        }

        const newUser = this.userRepository.create({
            email: createUserDto.email,
            name: createUserDto.name,
            password: createUserDto.password,
        })

        return instanceToInstance(this.userRepository.save(newUser));
    }

    /**
     * Finds a user by email.
     * @param {string} email - The email of the user to be retrieved.
     * @returns {Promise<User | null>}
     */
    async findOneByEmail (email: string): Promise<User | null> {
        const searchCriteria: {
            email: FindOperator<string>
        } = {
            email: ILike(email)
        }

        return this.userRepository.findOne({
            where: searchCriteria
        })
    }

    /**
     * Finds a user by id.
     * @param {User["id"]} id - The id of the user to be retrieved.
     * @returns {Promise<User>}
     * @throws {HttpException} if the user does not exist.
     */
    async findOneById(id: User["id"]): Promise<User> {
        const user = await this.userRepository.findOne({
            where: { id }
        });

        if (!user) {
        throw new HttpException(
            MESSAGES.ERROR.ID_DOES_NOT_EXISTS,
            HttpStatus.NOT_FOUND
        );
        }

        return user;
    }

    async updateUserAccessToken(
        id: User["id"],
        accessToken: string
    ): Promise<User> {
        return this.userRepository.save({ id, access_token: accessToken });
    }
}