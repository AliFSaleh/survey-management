import { applyDecorators, UseGuards, SetMetadata } from "@nestjs/common";
import { AuthGuard } from "../guards/auth.guard";
import { RolesGuard } from "../guards/roles.guard";
import { RoleEnum } from "src/user/enums/role.enum";

export function Auth(...roles: RoleEnum[]) {
  return applyDecorators(
    SetMetadata("roles", roles),
    UseGuards(AuthGuard, RolesGuard)
  );
}
