import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateGastoInput {
  

  @Field(()=> Float)
  monto: number;

  
  @Field()
  fecha: Date;

 
  @Field()
  nombre: string;

  @Field()
  empleadi: string;
}
