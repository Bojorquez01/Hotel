import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Habitacion } from 'src/habitacion/entities/habitacion.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('reservas')
@ObjectType()
export class Reservacion {

  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'Example field (placeholder)' })
  id: number;


  //Pendientes
  @Column()
  @Field()
  num_huespedes: number;

  @Column()
  @Field()
  num_cuartos: number;
//


  @Column()
  @Field()
  fecha_reserva: Date;

  @Column()
  @Field()
  periodo: number;

  @Column("decimal", { precision: 10, scale: 2 })
  @Field(()=> Float)
  monto: number;


  @Column()
  @Field(()=> Int)
  habitacion_id: number;

  @ManyToOne(()=> Habitacion, (habitacion)=> habitacion.reservacion)
  @JoinColumn({name: 'habitacion_id'})
  @Field(()=> Habitacion, {nullable: true})
  habitacion: Habitacion;

  @Column()
  @Field()
  persona_id: number;


  @ManyToOne(()=> Usuario, (usuario)=> usuario.reservacion)
  @JoinColumn({name: 'persona_id'})
  @Field(()=> Usuario, {nullable: true})
  usuario: Usuario;

  @Column()
  @Field()
  fecha_inicio: Date;

  @Column()
  @Field()
  fecha_final: Date;

  @Column()
  @Field()
  hora_registro: string;


}
