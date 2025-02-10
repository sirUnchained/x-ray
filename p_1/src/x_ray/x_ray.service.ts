import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateXRayDto } from './dto/create-x_ray.dto';
import { UpdateXRayDto } from './dto/update-x_ray.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Signal } from './entities/x_ray.entity';
import { isValidObjectId, Model } from 'mongoose';

@Injectable()
export class XRayService {
  constructor(@InjectModel(Signal.name) private signalModel: Model<Signal>) {}

  create(createXRayDto: CreateXRayDto) {
    const newSignal = new this.signalModel(createXRayDto);
    return newSignal.save();
  }

  async findAll(limit: number, page: number) {
    page = +page || 1;
    limit = +limit || 5;
    const results = await this.signalModel
      .find()
      .limit(limit)
      .skip((page - 1) * limit);
    return { status: 200, message: results };
  }

  async findOne(id: string) {
    try {
      if (!isValidObjectId(id)) {
        throw new NotFoundException({
          status: 404,
          message: 'device with this id not found.',
        });
      }

      const result = await this.signalModel.findById(id);
      return { status: 200, message: result };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
    }
  }

  update(id: number, updateXRayDto: UpdateXRayDto) {
    return `This action updates a #${id} xRay`;
  }

  async remove(id: string) {
    try {
      if (!isValidObjectId(id)) {
        throw new NotFoundException({
          status: 404,
          message: 'device with this id not found.',
        });
      }

      const result = await this.signalModel.findByIdAndDelete(id);
      return { status: 200, message: 'device with this id removed.', result };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
    }
  }
}
