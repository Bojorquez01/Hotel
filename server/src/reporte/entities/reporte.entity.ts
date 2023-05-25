import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Gasto } from 'src/gastos/entities/gasto.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('reporte')
@ObjectType()
export class Reporte {
  
  
  @PrimaryGeneratedColumn()
  @Field(()=> Int)
  id: number;

  @Column()
  @Field(()=> Float)
  total_gastos: number;

  @Column()
  @Field(()=> Int)
  total_reservas: number;

  @Column()
  @Field()
  total_ingresos_reservas: number;

  @Column()
  @Field()
  total_usuarios: number;

  @Column()
  @Field(()=> Date)
  fecha: Date;

  @Column()
  @Field(()=> String)
  nombre_autor: string;
  
  @Column()
  @Field(()=> String)
  hora_reporte: string;

}
