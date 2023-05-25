import { Module } from '@nestjs/common';
import { GastosService } from './gastos.service';
import { GastosResolver } from './gastos.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gasto } from './entities/gasto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Gasto])],
  providers: [GastosResolver, GastosService]
})
export class GastosModule {}
