import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TipoHabitacionService } from './tipo_habitacion.service';
import { TipoHabitacion } from './entities/tipo_habitacion.entity';
import { CreateTipoHabitacionInput } from './dto/create-tipo_habitacion.input';
import { UpdateTipoHabitacionInput } from './dto/update-tipo_habitacion.input';

@Resolver(() => TipoHabitacion)
export class TipoHabitacionResolver {
  constructor(private readonly tipoHabitacionService: TipoHabitacionService) {}

  @Mutation(() => TipoHabitacion)
  createTipoHabitacion(@Args('createTipoHabitacionInput') createTipoHabitacionInput: CreateTipoHabitacionInput) {
    return this.tipoHabitacionService.create(createTipoHabitacionInput);
  }

  @Query(() => [TipoHabitacion], { name: 'tipoHabitaciones' })
  findAll() {
    return this.tipoHabitacionService.findAll();
  }

  @Query(() => TipoHabitacion, { name: 'tipoHabitacion' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.tipoHabitacionService.findOne(id);
  }

  @Mutation(() => TipoHabitacion)
  updateTipoHabitacion(@Args('updateTipoHabitacionInput') updateTipoHabitacionInput: UpdateTipoHabitacionInput) {
    return this.tipoHabitacionService.update(updateTipoHabitacionInput.id, updateTipoHabitacionInput);
  }

  @Mutation(() => TipoHabitacion)
  removeTipoHabitacion(@Args('id', { type: () => Int }) id: number) {
    return this.tipoHabitacionService.remove(id);
  }
}
