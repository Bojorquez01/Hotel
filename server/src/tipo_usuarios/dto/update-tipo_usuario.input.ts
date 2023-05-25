import { CreateTipoUsuarioInput } from './create-tipo_usuario.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTipoUsuarioInput extends PartialType(CreateTipoUsuarioInput) {
  @Field(() => Int)
  id: number;
}
