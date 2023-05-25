import { InputType, Int, Field, Float, ObjectType } from '@nestjs/graphql';
import { Gasto } from '../entities/gasto.entity';

@ObjectType()
export class GastosTotalResponse {
  

  @Field(()=> Gasto)
  gastos: Gasto[];
 
  @Field()
  total: number;
}
