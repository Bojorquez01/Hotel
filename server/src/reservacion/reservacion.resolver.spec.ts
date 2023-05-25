import { Test, TestingModule } from '@nestjs/testing';
import { ReservacionResolver } from './reservacion.resolver';
import { ReservacionService } from './reservacion.service';

describe('ReservacionResolver', () => {
  let resolver: ReservacionResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReservacionResolver, ReservacionService],
    }).compile();

    resolver = module.get<ReservacionResolver>(ReservacionResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
