import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(){

        super({

            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'hide-me',
            sessionStorage: true,

        });
    }

    async validate(payload: any){
        return {
            id: payload.sub_id, correo: payload.correo, role: payload.role_usuario, nombre: payload.nombre, 
            apPaterno: payload.apPaterno, apMaterno: payload.apMaterno,
        };
    }
}
