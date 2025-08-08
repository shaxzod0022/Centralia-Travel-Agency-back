import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TourController } from "./tour/tour.controller";
import { TourModule } from "./tour/tour.module";
import { CountriesModule } from "./country/countries.module";
import { CountriesController } from "./country/countries.controller";
import { CountriesService } from "./country/countries.service";

@Module({
  imports: [TourModule, CountriesModule],
  controllers: [AppController, TourController, CountriesController],
  providers: [AppService, CountriesService],
})
export class AppModule {}
