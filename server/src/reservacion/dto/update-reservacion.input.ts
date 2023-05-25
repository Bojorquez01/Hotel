import { CreateReservacionInput } from './create-reservacion.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateReservacionInput extends PartialType(CreateReservacionInput) {
  @Field(() => Int)
  id: number;
}
