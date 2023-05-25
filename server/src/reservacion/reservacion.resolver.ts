import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { ReservacionService } from './reservacion.service';
import { Reservacion } from './entities/reservacion.entity';
import { CreateReservacionInput } from './dto/create-reservacion.input';
import { UpdateReservacionInput } from './dto/update-reservacion.input';
import { Habitacion } from 'src/habitacion/entities/habitacion.entity';
import { ConflictException, UseGuards } from '@nestjs/common';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { AdminGuard } from 'src/roles/admin.guard';



@Resolver(() => Reservacion)
export class ReservacionResolver {
  constructor(private readonly reservacionService: ReservacionService) {}

  @Mutation(() => Reservacion)
  createReservacion(@Args('createReservacionInput') createReservacionInput: CreateReservacionInput) {
    return this.reservacionService.create(createReservacionInput);
  }

  @UseGuards(AdminGuard)
  @Query(() => [Reservacion], { name: 'reservaciones' })
  findAll() {
    return this.reservacionService.findAll();
  }

  @Query(() => Reservacion, { name: 'reservacion' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.reservacionService.findOne(id);
  }

  @Mutation(() => Reservacion)
  updateReservacion(@Args('updateReservacionInput') updateReservacionInput: UpdateReservacionInput) {
    return this.reservacionService.update(updateReservacionInput.id, updateReservacionInput);
  }

  @Mutation(() => Reservacion)
  removeReservacion(@Args('id', { type: () => Int }) id: number) {
    return this.reservacionService.remove(id);
  }

  
  @ResolveField((returns)=> Habitacion)
  async habitacion(@Parent() reservacion: Reservacion): Promise<Habitacion>{
    const habitacion = await this.reservacionService.getHabitacion(reservacion.habitacion_id)

    if (habitacion){
      return habitacion;

    } else {
      throw new ConflictException("No se encontro la habitacion asociada");
    }
  }

  //Usuarios
  @ResolveField((returns)=> Usuario)
  async usuario(@Parent() reservacion: Reservacion): Promise<Usuario>{
    const usuario = await this.reservacionService.getUsuario(reservacion.persona_id)

    if (usuario){
      return usuario;

    } else {
      throw new ConflictException("No se encontro el usuario asociado");
    }
  }
  


}
