import { PartialType } from '@nestjs/mapped-types';
import { CreateXRayDto } from './create-x_ray.dto';

export class UpdateXRayDto extends PartialType(CreateXRayDto) {}
