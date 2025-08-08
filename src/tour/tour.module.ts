import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TourService } from "./tour.service";
import { TourController } from "./tour.controller";
import { Tour, TourSchema } from "./tour.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tour.name, schema: TourSchema }]),
  ],
  controllers: [TourController],
  providers: [TourService],
  exports: [TourService], // agar boshqa modullar ham TourService dan foydalansa
})
export class TourModule {}
