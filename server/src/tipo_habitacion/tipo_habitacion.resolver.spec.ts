import { Test, TestingModule } from '@nestjs/testing';
import { TipoHabitacionResolver } from './tipo_habitacion.resolver';
import { TipoHabitacionService } from './tipo_habitacion.service';

describe('TipoHabitacionResolver', () => {
  let resolver: TipoHabitacionResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipoHabitacionResolver, TipoHabitacionService],
    }).compile();

    resolver = module.get<TipoHabitacionResolver>(TipoHabitacionResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
