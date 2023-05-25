import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserInput } from './dto/login-user.input';
import * as bcrypt from 'bcrypt';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { CreateUsuarioInput } from 'src/usuarios/dto/create-usuario.input';


@Injectable()
export class AuthService {

    constructor(
            private jwtService: JwtService,

            private usuariosService: UsuariosService,
        ){}

    async validateUser(correo: string, contrasenia: string): Promise <any>{

        const usuario = await this.usuariosService.findOneByCorreo(correo);

        if(usuario){
            
            const valid = await bcrypt.compare(contrasenia, usuario?.contrasenia);

            if(usuario && valid){
                const {contrasenia, ...result} = usuario;
                return result;
            }
                return null;
        } else{
            throw new NotFoundException(`El usario con el correo ${correo}`);
        }


    }

    async login(usuario: Usuario){
        return {
            access_token: this.jwtService.sign({
                correo: usuario.correo,
                id: usuario.id,
                nombre: usuario.nombre,
                apPaterno: usuario.apPaterno,
                apMaterno: usuario.apMaterno,
                role: usuario.role_usuario,
            }),
            usuario,
        };
    }

    async signup(signupUserInput: CreateUsuarioInput){
        const usuario = await this.usuariosService.findOneByCorreo(signupUserInput.correo);

        if (usuario){
            
            throw new ConflictException('Este usuario ya está registrado!');
        }

        const contrasenia = await bcrypt.hash(signupUserInput.contrasenia, 10);
        
        return this.usuariosService.create({
            ...signupUserInput,
            contrasenia,
        });
    }
}
