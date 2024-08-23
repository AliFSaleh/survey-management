import { RoleEnum } from "src/user/enums/role.enum"
import { getAllEnumValues } from "src/utils/helpers.utils"

/**
 * Database tables
 */
export const ENTITIES = {
    USERS: "users",
    CATEGORIES: "categories",
}

export const ALL_ROLES: RoleEnum[] = getAllEnumValues(RoleEnum);