import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateGastoInput {
  

  @Field(()=> Float)
  monto: number;
 
  @Field()
  nombre: string;

}
