import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Blog } from './blog.schema';
import { BlogDto } from './dto/blog.dto';

@Injectable()
export class BlogService {
  constructor(@InjectModel(Blog.name) private readonly blogModel: Model<Blog>) {}

  async create(dto: BlogDto): Promise<Blog> {
    const existing = await this.blogModel.findOne({ slug: dto.slug });
    if (existing) {
      throw new BadRequestException('Blog with this slug already exists');
    }
    const blog = new this.blogModel(dto);
    return blog.save();
  }

  async findAll(): Promise<Blog[]> {
    return this.blogModel.find({ status: 'published' }).exec();
  }

  async findById(id: string): Promise<Blog> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid blog ID');
    }
    const blog = await this.blogModel.findById(id);
    if (!blog) {
      throw new NotFoundException('Blog not found');
    }
    return blog;
  }

  async update(id: string, dto: Partial<BlogDto>): Promise<Blog> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid blog ID');
    }
    const updated = await this.blogModel.findByIdAndUpdate(id, dto, { new: true });
    if (!updated) {
      throw new NotFoundException('Blog not found');
    }
    return updated;
  }

  async delete(id: string): Promise<Blog> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid blog ID');
    }
    const deleted = await this.blogModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException('Blog not found');
    }
    return deleted;
  }

  // Qo'shimcha funksiyalar:
  // Blogga view qo'shish
  async incrementViews(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid blog ID');
    }
    await this.blogModel.findByIdAndUpdate(id, { $inc: { views: 1 } });
  }

  // Bloglarni eng ko'p o'qilgan va yuqori baholanganlari bilan olish
  async getTopBlogs(limit = 3): Promise<Blog[]> {
    return this.blogModel
      .find({ status: 'published' })
      .sort({ views: -1, ratingAvg: -1 })
      .limit(limit)
      .exec();
  }
}
