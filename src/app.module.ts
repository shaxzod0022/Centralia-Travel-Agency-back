import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { TourModule } from "./tour/tour.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CountryController } from './country/country.controller';
import { CountryService } from './country/country.service';
import { CountryModule } from './country/country.module';
import { AdminService } from './admin/admin.service';
import { AdminController } from './admin/admin.controller';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // .env faylni yuklaydi
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>("MONGO_URI"),
      }),
    }),
    TourModule,
    CountryModule,
    AdminModule
  ],
  controllers: [AppController, CountryController, AdminController],
  providers: [AppService, CountryService, AdminService],
})
export class AppModule { }
