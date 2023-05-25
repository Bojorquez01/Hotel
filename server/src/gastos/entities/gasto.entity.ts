import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('gastos')
@ObjectType()
export class Gasto {

  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'Example field (placeholder)' })
  id: number;

  @Column()
  @Field(()=> Float)
  monto: number;

  @Column()
  @Field()
  fecha: Date;

  @Column()
  @Field()
  nombre: string;

  @Column()
  @Field()
  empleado_id: number;

  @Column()
  @Field()
  nombre_empleado: string;
  

}
