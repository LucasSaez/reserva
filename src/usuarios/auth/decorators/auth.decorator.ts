import { applyDecorators, UseGuards } from "@nestjs/common";
import { RoleStatusList } from "../enum/role.enum";
import { Roles } from "./roles.decorator";
import { AuthGuard } from "../guard/auth.guard";
import { RolesGuard } from "../guard/roles.guard";



/*Composición del decorador
Nest proporciona un método auxiliar para componer varios decoradores. Por ejemplo, supongamos que desea combinar todos los decoradores relacionados con la autenticación en un solo decorador. Esto se puede hacer con la siguiente construcción:*/
//*aca almacenamos todos los decoradores que expongamos en las rutas,y lo hacemos en un solo decorador,como que juntas todo en uno solo
export function Auth(role: RoleStatusList){
    //*aca los juntamos
    return applyDecorators(Roles(role), UseGuards(AuthGuard,RolesGuard));
}