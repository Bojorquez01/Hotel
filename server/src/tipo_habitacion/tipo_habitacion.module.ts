import { Module } from '@nestjs/common';
import { TipoHabitacionService } from './tipo_habitacion.service';
import { TipoHabitacionResolver } from './tipo_habitacion.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoHabitacion } from './entities/tipo_habitacion.entity';
import { Habitacion } from '../habitacion/entities/habitacion.entity';
import { HabitacionService } from '../habitacion/habitacion.service';

@Module({
  imports: [TypeOrmModule.forFeature([TipoHabitacion, Habitacion])],
  providers: [TipoHabitacionResolver, TipoHabitacionService],
  exports: [TipoHabitacionService]
})
export class TipoHabitacionModule {}
