import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authService: AuthService){
        super({
            usernameField: 'correo',
            passwordField: 'contrasenia',
        });
    }

    async validate(correo: string, contrasenia: string): Promise<any>{
        const usuario = await this.authService.validateUser(correo, contrasenia);

        if(usuario){   
            return usuario;
        }else {
            
            throw new UnauthorizedException();
        } 
    } 

}