import { Test, TestingModule } from '@nestjs/testing';
import { ReporteResolver } from './reporte.resolver';
import { ReporteService } from './reporte.service';

describe('ReporteResolver', () => {
  let resolver: ReporteResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReporteResolver, ReporteService],
    }).compile();

    resolver = module.get<ReporteResolver>(ReporteResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
