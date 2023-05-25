import { Module } from '@nestjs/common';
import { GastosService } from './gastos.service';
import { GastosResolver } from './gastos.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gasto } from './entities/gasto.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Gasto])],
  providers: [GastosResolver, GastosService, JwtService],
  exports: [GastosService]
})
export class GastosModule {}
