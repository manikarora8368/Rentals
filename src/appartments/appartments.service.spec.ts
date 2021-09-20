import { Test, TestingModule } from '@nestjs/testing';
import { AppartmentsService } from './appartments.service';

describe('AppartmentsService', () => {
  let service: AppartmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppartmentsService],
    }).compile();

    service = module.get<AppartmentsService>(AppartmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
