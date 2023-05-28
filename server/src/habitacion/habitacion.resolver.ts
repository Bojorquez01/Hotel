import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { HabitacionService } from './habitacion.service';
import { Habitacion } from './entities/habitacion.entity';
import { CreateHabitacionInput } from './dto/create-habitacion.input';
import { UpdateHabitacionInput } from './dto/update-habitacion.input';
import { TipoHabitacion } from '../tipo_habitacion/entities/tipo_habitacion.entity';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/roles/admin.guard';
import { TrabajadorAdminGuard } from 'src/roles/trabajador-admin.guard';

@Resolver(() => Habitacion)
export class HabitacionResolver {
  constructor(private readonly habitacionService: HabitacionService) {}

  @UseGuards(AdminGuard)
  @Mutation(() => Habitacion)
  createHabitacion(@Args('createHabitacionInput') createHabitacionInput: CreateHabitacionInput) {
    return this.habitacionService.create(createHabitacionInput);
  }
  @Query(() => [Habitacion], { name: 'habitaciones' })
  findAll() {
    return this.habitacionService.findAll();
  }

  @UseGuards(TrabajadorAdminGuard)
  @Query(() => Habitacion, { name: 'habitacion' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.habitacionService.findOne(id);
  }
  
  @ResolveField((returns)=> TipoHabitacion)
  async tipohabitacion(@Parent() habitacion: Habitacion): Promise<TipoHabitacion>{
    const tipoHab = await this.habitacionService.getTipoHabitacion(habitacion.tipo_habitacion_id);

    //Esta comprobacion se hace para que en caso de que no haya un tipo de usuario
    //Se devuelva una alternativa de respuesta y no solo null
    if (tipoHab){
      return tipoHab;
    } else {
      throw new NotFoundException('No hay para este');
    } 


  }

  @UseGuards(AdminGuard)
  @Mutation(() => Habitacion)
  updateHabitacion(@Args('updateHabitacionInput') updateHabitacionInput: UpdateHabitacionInput) {
    return this.habitacionService.update(updateHabitacionInput.id, updateHabitacionInput);
  }

  @UseGuards(AdminGuard)
  @Mutation(() => Habitacion)
  removeHabitacion(@Args('id', { type: () => Int }) id: number) {
    return this.habitacionService.remove(id);
  }
}
