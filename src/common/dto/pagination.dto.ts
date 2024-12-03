import { IsNumber, IsOptional } from "class-validator";

export class PageinationDTO {
    @IsOptional()
    @IsNumber()
    pageNumber: number

    @IsOptional()
    @IsNumber()
    pageSize: number
}