import { Field, ObjectType } from "@nestjs/graphql";
import { Usuario } from "src/usuarios/entities/usuario.entity";

@ObjectType()
export class LoginResponse{

    @Field()
    access_token: string;

    @Field(()=> Usuario)
    usuario: Usuario;
}