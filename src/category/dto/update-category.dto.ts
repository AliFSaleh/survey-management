import {
    IsNotEmpty,
    IsString,
    IsUrl,
    MaxLength
} from "class-validator";

export class UpdateCategoryDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    name: string

    @IsString()
    @IsUrl()
    imageUrl: string;
}