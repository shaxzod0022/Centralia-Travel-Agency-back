import { Module } from '@nestjs/common';
import { TourService } from './tour.service';
import { TourController } from './tour.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tour, TourSchema } from './tour.schema';

@Module({
  providers: [TourService],
  controllers: [TourController],
  imports: [MongooseModule.forFeature([{ name: Tour.name, schema: TourSchema }])],
})
export class TourModule { }
