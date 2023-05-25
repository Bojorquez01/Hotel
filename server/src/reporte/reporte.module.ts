import { Module } from '@nestjs/common';
import { ReporteService } from './reporte.service';
import { ReporteResolver } from './reporte.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reporte } from './entities/reporte.entity';
import { Reservacion } from 'src/reservacion/entities/reservacion.entity';
import { ReservacionModule } from 'src/reservacion/reservacion.module';
import { GastosModule } from 'src/gastos/gastos.module';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Reporte]), ReservacionModule, GastosModule, UsuariosModule],
  providers: [ReporteResolver, ReporteService, JwtService],
})
export class ReporteModule {}
