import { CreateGastoInput } from './create-gasto.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGastoInput extends PartialType(CreateGastoInput) {
  @Field(() => Int)
  id: number;
}
