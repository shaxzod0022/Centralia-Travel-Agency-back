import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Admin, AdminSchema } from './admin.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your_jwt_secret',  // maxsus kalitni .env faylga yozing
      signOptions: { expiresIn: '1h' }, // token 1 soat amal qiladi
    }),
  ],
  providers: [AdminService],
  controllers: [AdminController],
  exports: [AdminService], // boshqa modullarda ishlatish uchun
})
export class AdminModule {}
