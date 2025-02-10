import { Test, TestingModule } from '@nestjs/testing';
import { XRayService } from './x_ray.service';

describe('XRayService', () => {
  let service: XRayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [XRayService],
    }).compile();

    service = module.get<XRayService>(XRayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
