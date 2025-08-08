import { Injectable, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Admin, AdminDocument } from './admin.schema';
import { CreateAdminDto, UpdateAdminDto } from './dto/admin.dto';

@Injectable()
export class AdminService {
    constructor(
        @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
        private jwtService: JwtService,
    ) { }

    // Admin yaratish
    async create(createAdminDto: CreateAdminDto): Promise<Admin> {
        const { email, password, username } = createAdminDto;

        // Email mavjudligini tekshirish
        const existingAdmin = await this.adminModel.findOne({ email });
        if (existingAdmin) {
            throw new BadRequestException('Admin with this email already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const createdAdmin = new this.adminModel({
            email,
            username,
            password: hashedPassword,
            status: createAdminDto.status ?? 'active',
        });

        return createdAdmin.save();
    }

    // Adminni yangilash
    async update(id: string, updateAdminDto: UpdateAdminDto): Promise<Admin> {
        const admin = await this.adminModel.findById(id);
        if (!admin) {
            throw new NotFoundException('Admin not found');
        }

        if (updateAdminDto.email && updateAdminDto.email !== admin.email) {
            const emailExists = await this.adminModel.findOne({ email: updateAdminDto.email });
            if (emailExists) {
                throw new BadRequestException('Email is already in use');
            }
        }

        if (updateAdminDto.password) {
            updateAdminDto.password = await bcrypt.hash(updateAdminDto.password, 10);
        }

        Object.assign(admin, updateAdminDto);
        return admin.save();
    }

    // Login qilish
    async login(email: string, password: string): Promise<{ accessToken: string }> {
        const admin = await this.adminModel.findOne({ email });
        if (!admin) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { sub: admin._id, email: admin.email };
        const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' });

        return { accessToken };
    }

    async findById(id: string): Promise<Admin> {
        const admin = await this.adminModel.findById(id);
        if (!admin) {
            throw new NotFoundException('Admin not found');
        }
        return admin;
    }



}
