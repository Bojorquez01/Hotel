import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateReservacionRecepcionistaInput {
  
  @Field(() => Int, { description: 'Example field (placeholder)' })
  num_huespedes: number;

  @Field(()=>Date)
  fecha_inicio: Date;

  @Field(()=> Date)
  fecha_final: Date;
  
  @Field(()=> String)
  nombre_cliente: string;

}

