import { CreateHabitacionInput } from './create-habitacion.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateHabitacionInput extends PartialType(CreateHabitacionInput) {
  @Field(() => Int)
  id: number;
}
