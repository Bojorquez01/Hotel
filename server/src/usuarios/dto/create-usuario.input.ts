import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';



@InputType()
export class CreateUsuarioInput {

  @Field()
  nombre: string;

  @Field()
  apPaterno: string;
  
  @Field({nullable: true})
  apMaterno?: string;

  @Field()
  fech_nacimiento: string;

  @Field()
  numTelefono: string;

  @IsNotEmpty()
  @Field((type)=> Int)
  tipo_usuario_id: number;
  
  //Datos de acceso
  @Field()
  correo: string;

  @Field()
  contrasenia: string;

  @Field()
  role_usuario: string;
}
