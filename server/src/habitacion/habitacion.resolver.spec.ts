import { Test, TestingModule } from '@nestjs/testing';
import { HabitacionResolver } from './habitacion.resolver';
import { HabitacionService } from './habitacion.service';

describe('HabitacionResolver', () => {
  let resolver: HabitacionResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HabitacionResolver, HabitacionService],
    }).compile();

    resolver = module.get<HabitacionResolver>(HabitacionResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
