import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Gasto } from 'src/gastos/entities/gasto.entity';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
export class Reporte {
  
  
  @PrimaryGeneratedColumn()
  @Field(()=> Int)
  id: number;

  @Field(()=> Int)
  gasto_id;

  @Field(()=> Int)
  reserva_id;
  

}
