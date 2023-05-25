import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { Reservacion } from 'src/reservacion/entities/reservacion.entity';
import { Entity } from 'typeorm';

@InputType()
export class CreateHabitacionInput {

  @Field(()=> Int)
  id: number;

  @Field(()=> Int)
  tipo_habitacion_id: number;

  @Field(()=>String)
  estado: string;

  @Field(()=> Float)
  precio: number;


  @Field(()=>String)
  ubicacion: string;

  @Field(()=> Int)
  capacidad: number;


}
