import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SingnalDocument = HydratedDocument<Signal>;

@Schema()
class Status {
  @Prop({ type: Number, required: true })
  'x-coordination': number;

  @Prop({ type: Number, required: true })
  'y-coordination': number;

  @Prop({ type: Number, required: true })
  speed: number;
}

@Schema()
class Coordinations {
  @Prop({ type: Number, required: true })
  time: Number;

  @Prop({ type: Status, required: true })
  coordinates: Status;
}

@Schema()
export class Signal {
  @Prop({ required: true })
  device_id: string;

  @Prop({ type: [Coordinations], required: true })
  device_data: Coordinations[];

  @Prop({ type: Number, required: true })
  time_stamp: number;
}

export const SingnalSchema = SchemaFactory.createForClass(Signal);

/* 
{
  "66bb584d4ae73e488c30a072": { //deviceId
    "data": [
      [
        762, // time
        [
          51.339764, // x-coordination
          12.339223833333334, // y-coordination
          1.2038000000000002 // speed
        ]
      ],
      [
        1766,
        [
          51.33977733333333,
          12.339211833333334,
          1.531604
        ]
      ],
    ],
    "time": 1735683480000 //timestamp
  }
}
*/
