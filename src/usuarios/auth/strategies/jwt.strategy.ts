import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import {ExtractJwt, Strategy} from 'passport-jwt'
import { Usuarios } from "src/usuarios/entity/usuarios.entity";
import { Repository } from "typeorm";
import { JwtPayload } from "../interfaces/jwt-payload.interface";




@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(
        @InjectRepository(Usuarios)
        private readonly usuarioRepository: Repository<Usuarios>,

        configService: ConfigService
    ){

        super({
            secretOrKey: configService.get('JWT_SEED'),
            ignoreExpiration: false,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })

    }


    async validate(payload: JwtPayload): Promise<Usuarios>{

        const {id} = payload;

        const usuario = await this.usuarioRepository.findOneBy({id})

        if(!usuario){
            throw new UnauthorizedException('token not valid')
        }

        return usuario;

    }




}