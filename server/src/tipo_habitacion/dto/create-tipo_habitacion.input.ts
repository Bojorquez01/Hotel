import { InputType, Int, Field } from '@nestjs/graphql';
import { PrimaryColumn } from 'typeorm';

@InputType()
export class CreateTipoHabitacionInput {
  
  @Field(()=> Int)
  id: number;

  @Field(()=>String)
  tipo: string;
}
