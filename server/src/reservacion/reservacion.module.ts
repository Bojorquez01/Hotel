import { Module } from '@nestjs/common';
import { ReservacionService } from './reservacion.service';
import { ReservacionResolver } from './reservacion.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservacion } from './entities/reservacion.entity';
import { HabitacionModule } from 'src/habitacion/habitacion.module';
import { Habitacion } from 'src/habitacion/entities/habitacion.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { UsuariosModule } from 'src/usuarios/usuarios.module';

@Module({
  imports: [TypeOrmModule.forFeature([Reservacion, Habitacion, Usuario]), HabitacionModule, UsuariosModule],
  providers: [ReservacionResolver, ReservacionService],
  exports: [],
})
export class ReservacionModule {}
