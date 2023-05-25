import { Test, TestingModule } from '@nestjs/testing';
import { GastosResolver } from './gastos.resolver';
import { GastosService } from './gastos.service';

describe('GastosResolver', () => {
  let resolver: GastosResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GastosResolver, GastosService],
    }).compile();

    resolver = module.get<GastosResolver>(GastosResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
