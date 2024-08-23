import {
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUrl,
    MaxLength
} from "class-validator";

export class CreateCategoryDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    name: string;

    @IsOptional()
    @IsNotEmpty()
    @IsUrl()
    image_url?: string;
}