import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class CoordinatesDTO {
  @IsNumber()
  @IsNotEmpty()
  'x-coordination': 99;

  @IsNumber()
  @IsNotEmpty()
  'y-coordination': 56;

  @IsNumber()
  @IsNotEmpty()
  'speed': 97;
}

class CreateCoordinateDataDto {
  @IsNumber()
  @IsNotEmpty()
  time: number;

  @ValidateNested()
  @Type(() => CoordinatesDTO)
  @IsNotEmpty()
  coordinates: CoordinatesDTO;
}

class CreateDeviceDataDto {
  @ValidateNested()
  @Type(() => CreateCoordinateDataDto)
  @IsNotEmpty()
  data: CreateCoordinateDataDto[];
}

export class CreateXRayDto {
  @IsString()
  @IsNotEmpty()
  device_id: string;

  @ValidateNested()
  @Type(() => CreateCoordinateDataDto)
  @IsNotEmpty()
  device_data: CreateCoordinateDataDto[];

  @IsNumber()
  @IsNotEmpty()
  time_stamp: number;
}

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
