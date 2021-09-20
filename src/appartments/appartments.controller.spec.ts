import { Test, TestingModule } from '@nestjs/testing';
import { AppartmentsController } from './appartments.controller';
import { AppartmentsService } from './appartments.service';

describe('AppartmentsController', () => {
  let controller: AppartmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppartmentsController],
      providers: [AppartmentsService],
    }).compile();

    controller = module.get<AppartmentsController>(AppartmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
