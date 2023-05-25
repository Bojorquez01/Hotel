import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver, Query } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response';
import { LoginUserInput } from './dto/login-user.input';
import { GqlAuthGuard } from './gql-auth.guard';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { CreateUsuarioInput } from 'src/usuarios/dto/create-usuario.input';

@Resolver()
export class AuthResolver {

    constructor(private authService: AuthService,
                
                private usuarioService: UsuariosService,
                ){}

    @UseGuards(GqlAuthGuard)
    @Query(()=> LoginResponse, {nullable: true})
    async login(@Args('loginUserInput') loginUserInput: LoginUserInput): Promise<LoginResponse>{

        const usuario = await this.usuarioService.findOneByCorreo(loginUserInput.correo);

        return this.authService.login(usuario);
    }
    

    @Mutation(()=> Usuario)
    signup(@Args('signupUserInput') signupUserInput: CreateUsuarioInput){
        return this.authService.signup(signupUserInput)
    }

}
