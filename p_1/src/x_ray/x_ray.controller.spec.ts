import { Test, TestingModule } from '@nestjs/testing';
import { XRayController } from './x_ray.controller';
import { XRayService } from './x_ray.service';

describe('XRayController', () => {
  let controller: XRayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [XRayController],
      providers: [XRayService],
    }).compile();

    controller = module.get<XRayController>(XRayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
