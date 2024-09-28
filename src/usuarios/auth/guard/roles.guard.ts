import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { RoleStatusList } from "../enum/role.enum";
import { ROLES_KEY } from "../decorators/roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate{

    constructor(private reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<RoleStatusList>(ROLES_KEY,[
            //* da como resultado la extracción de los metadatos para el controlador de ruta procesado actualmente.
            context.getHandler(),
            //*metadatos del controlador de clase
            context.getClass()
        ])

        if(!requiredRoles){
            return true;
        }

        const {user} = context.switchToHttp().getRequest();
        return user.role === requiredRoles

    }

}