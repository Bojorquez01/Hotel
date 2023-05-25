import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateTipoUsuarioInput {

  @Field()
  nombre: string;
}
