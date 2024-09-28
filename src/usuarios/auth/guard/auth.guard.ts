import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { envs } from 'src/config';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private readonly jwtService: JwtService){}

  async canActivate(context: ExecutionContext): Promise<boolean>{

    //*obtenemos la request del body
    const request = context.switchToHttp().getRequest();

    //*extraemos el token
    const token = this.extractTokenFromHeader(request);


    //*si no existe token, tire un UnauthorizedException
    if(!token){
      throw new UnauthorizedException();
    }

    try {
      //*verificamos el payload que coincida con el token
      const payload = await this.jwtService.verifyAsync(token,{
        secret: envs.jwt
      });
      request.user = payload;
      
    } catch (error) {
      throw new UnauthorizedException();
    }
    
    return true;

  }

  //*funcion que extrae el token de la peticion, desde los headers y del Bearer
  //* si es Bearer token, que traiga el token, de lo contrario retorne un undefined
  private extractTokenFromHeader(request: Request){
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}