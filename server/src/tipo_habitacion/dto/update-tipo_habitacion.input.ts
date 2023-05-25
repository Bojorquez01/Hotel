import { CreateTipoHabitacionInput } from './create-tipo_habitacion.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTipoHabitacionInput extends PartialType(CreateTipoHabitacionInput) {
  @Field(() => Int)
  id: number;
}
