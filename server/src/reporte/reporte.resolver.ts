import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ReporteService } from './reporte.service';
import { Reporte } from './entities/reporte.entity';
import { CreateReporteInput } from './dto/create-reporte.input';
import { UpdateReporteInput } from './dto/update-reporte.input';

@Resolver(() => Reporte)
export class ReporteResolver {
  constructor(private readonly reporteService: ReporteService) {}

  @Mutation(() => Reporte)
  createReporte(@Args('createReporteInput') createReporteInput: CreateReporteInput) {
    return this.reporteService.create(createReporteInput);
  }

  @Query(() => [Reporte], { name: 'reporte' })
  findAll() {
    return this.reporteService.findAll();
  }

  @Query(() => Reporte, { name: 'reporte' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.reporteService.findOne(id);
  }

  @Mutation(() => Reporte)
  updateReporte(@Args('updateReporteInput') updateReporteInput: UpdateReporteInput) {
    return this.reporteService.update(updateReporteInput.id, updateReporteInput);
  }

  @Mutation(() => Reporte)
  removeReporte(@Args('id', { type: () => Int }) id: number) {
    return this.reporteService.remove(id);
  }
}
