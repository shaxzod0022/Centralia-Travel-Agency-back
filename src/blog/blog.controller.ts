import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  ParseUUIDPipe,
  BadRequestException,
} from "@nestjs/common";
import { BlogService } from "./blog.service";
import { BlogDto } from "./dto/blog.dto";
import { Types } from "mongoose";

@Controller("api/blogs")
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  async create(@Body() dto: BlogDto) {
    return this.blogService.create(dto);
  }

  @Get()
  async findAll() {
    return this.blogService.findAll();
  }

  @Get("top")
  async getTopBlogs() {
    return this.blogService.getTopBlogs();
  }

  @Get(":id")
  async findById(@Param("id") id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException("Invalid blog ID");
    }
    const blog = await this.blogService.findById(id);
    if (!blog) {
      throw new NotFoundException("Blog not found");
    }
    return blog;
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() dto: Partial<BlogDto>) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException("Invalid blog ID");
    }
    return this.blogService.update(id, dto);
  }

  @Delete(":id")
  async delete(@Param("id") id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException("Invalid blog ID");
    }
    return this.blogService.delete(id);
  }

  // Optional: view count increment endpoint
  @Post(":id/views")
  async incrementViews(@Param("id") id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException("Invalid blog ID");
    }
    await this.blogService.incrementViews(id);
    return { message: "View count incremented" };
  }
}
