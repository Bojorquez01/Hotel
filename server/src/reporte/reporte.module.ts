import { Module } from '@nestjs/common';
import { ReporteService } from './reporte.service';
import { ReporteResolver } from './reporte.resolver';

@Module({
  providers: [ReporteResolver, ReporteService]
})
export class ReporteModule {}
