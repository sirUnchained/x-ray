import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { XRayService } from './x_ray.service';
import { CreateXRayDto } from './dto/create-x_ray.dto';
import { UpdateXRayDto } from './dto/update-x_ray.dto';

@Controller('x-ray')
export class XRayController {
  constructor(private readonly xRayService: XRayService) {}

  @Post()
  create(@Body() createXRayDto: CreateXRayDto) {
    return this.xRayService.create(createXRayDto);
  }

  @Get()
  findAll(@Query('limit') limit: number, @Query('page') page: number) {
    return this.xRayService.findAll(+limit, +page);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.xRayService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateXRayDto: UpdateXRayDto) {
    return this.xRayService.update(+id, updateXRayDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.xRayService.remove(id);
  }
}
