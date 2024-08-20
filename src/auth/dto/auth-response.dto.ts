import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class AuthResponseDto {
  @IsNotEmpty()
  @IsUUID("4")
  id: string;

  @IsString()
  accessToken?: string;
}
