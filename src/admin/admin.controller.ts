import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Get,
  HttpCode,
  HttpStatus,
  Delete,
} from "@nestjs/common";
import { AdminService } from "./admin.service";
import { CreateAdminDto, UpdateAdminDto } from "./dto/admin.dto";

@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // Admin yaratish
  @Post()
  async createAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  // Admin login qilish
  @HttpCode(HttpStatus.OK)
  @Post("login")
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    return this.adminService.login(email, password);
  }

  // Adminni olish (id bo‘yicha)
  @Get(":id")
  async getAdmin(@Param("id") id: string) {
    return this.adminService.findById(id); // findById methodni servicega qo'shish kerak
  }

  // Adminni yangilash
  @Patch(":id")
  async updateAdmin(
    @Param("id") id: string,
    @Body() updateAdminDto: UpdateAdminDto
  ) {
    return this.adminService.update(id, updateAdminDto);
  }

  @Delete(":id")
  async deleteAdmin(@Param("id") id: string) {
    return this.adminService.delete(id);
  }

  @Get()
  async getAll() {
    return this.adminService.findAll();
  }
}
