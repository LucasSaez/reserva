import { SetMetadata } from "@nestjs/common";
import { RoleStatusList } from "../enum/role.enum";

export const ROLES_KEY = "roles";
export const Roles = (role: RoleStatusList) => SetMetadata(ROLES_KEY, role);