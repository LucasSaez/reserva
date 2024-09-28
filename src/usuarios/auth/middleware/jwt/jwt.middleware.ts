import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../../auth.service';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { Request, Response } from 'express';

@Injectable()
export class JwtMiddleware implements NestMiddleware {

  constructor(
    private readonly authService: AuthService,
    private readonly usuarioService: UsuariosService,
  ){}

  async use(req: Request, res: Response, next: () => void) {
    try {
      const authHeader = req.headers['authorization'];
      
      if (!authHeader) {
        throw new UnauthorizedException('Authorization header not found');
      }
  
      const tokenArray: string[] = authHeader.split(" ");
      
      if (tokenArray.length !== 2 || tokenArray[0] !== 'Bearer') {
        throw new UnauthorizedException('Invalid token format');
      }
  
      const decodedToken = await this.authService.verifyJwt(tokenArray[1]);
  
      if (decodedToken) {
        const usuario = await this.usuarioService.getUsuarioById(decodedToken.sub);
        if (usuario) return next();
        throw new UnauthorizedException('Invalid token');
      } else {
        throw new UnauthorizedException('Invalid token');
      }
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('Unauthorized access');
    }
  }
  
}