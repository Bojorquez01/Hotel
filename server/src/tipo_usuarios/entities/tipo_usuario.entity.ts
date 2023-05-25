import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tipo_usuarios')
@ObjectType()
export class TipoUsuario {

  @PrimaryGeneratedColumn()
  @Field((type)=> Int)
  id: number;

  @Column()
  @Field()
  nombre: string;

  @OneToMany(()=> Usuario, (usuario) => usuario.tipo_usuario)
  @Field(()=> [Usuario], {nullable: true})
  usuarios: Usuario[];
}
