import { ValidationPipeOptions } from "@nestjs/common";

export const validationOptions: ValidationPipeOptions = {
  transform: true,
  whitelist: true
};
