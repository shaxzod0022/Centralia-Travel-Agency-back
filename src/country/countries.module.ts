import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { CountriesService } from "./countries.service"
import { Country, CountrySchema } from "./schemas/country.schema"
import { CountriesController } from "./countries.controller"

@Module({
  imports: [MongooseModule.forFeature([{ name: Country.name, schema: CountrySchema }])],
  controllers: [CountriesController],
  providers: [CountriesService],
  exports: [CountriesService],
})
export class CountriesModule {}
