import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class LoginUserInput{
    @Field()
    correo: string;

    @Field()
    contrasenia: string;
}