import { 
    IsEmail,
    IsNotEmpty,
    IsString,
    MaxLength,
    MinLength
} from "class-validator";


export class CreateUserDto {
    @IsNotEmpty({ message: "Email is required" })
    @IsEmail({}, { message: "Email should be a valid email address" })
    email: string

    @IsNotEmpty({ message: "Name is required" })
    @IsString()
    @MaxLength(50)
    name: string

    @IsNotEmpty({ message: "Password is required" })
    @IsString()
    @MinLength(8)
    password: string
}