import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Habitacion } from '../../habitacion/entities/habitacion.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tipo_habitacion')
@ObjectType()
export class TipoHabitacion {

  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'Example field (placeholder)' })
  id: number;

  @Column()
  @Field(()=>String)
  tipo: string;

  @OneToMany(() => Habitacion, (habitacion) => habitacion.tipo_habitacion, {cascade: true, nullable: true})
  habitacion?: Habitacion[];
}
