import { Module } from '@nestjs/common';
import { HabitacionService } from './habitacion.service';
import { HabitacionResolver } from './habitacion.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Habitacion } from './entities/habitacion.entity';
import { TipoHabitacion } from '../tipo_habitacion/entities/tipo_habitacion.entity';
import { TipoHabitacionModule } from '../tipo_habitacion/tipo_habitacion.module';

@Module({
  imports: [TypeOrmModule.forFeature([Habitacion, TipoHabitacion]), TipoHabitacionModule],
  providers: [HabitacionResolver, HabitacionService],
  exports: [HabitacionService]
})
export class HabitacionModule {}
