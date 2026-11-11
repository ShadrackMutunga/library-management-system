import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGenreDto, UpdateGenreDto } from './dto/create-genre.dto';

@Injectable()
export class GenresService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateGenreDto) {
    const slug = dto.name.toLowerCase().replace(/\s+/g, '-');
    return this.prisma.genre.create({
      data: { ...dto, slug },
    });
  }

  findAll() {
    return this.prisma.genre.findMany({
      include: { books: true },
    });
  }

  async findOne(id: number) {
    const genre = await this.prisma.genre.findUnique({
      where: { id },
      include: { books: true },
    });
    if (!genre) {
      throw new NotFoundException(`Genre with ID ${id} not found`);
    }
    return genre;
  }

  async update(id: number, dto: UpdateGenreDto) {
    const slug = dto.name.toLowerCase().replace(/\s+/g, '-');
    const genre = await this.prisma.genre.findUnique({ where: { id } });
    if (!genre) {
      throw new NotFoundException(`Genre with ID ${id} not found`);
    }
    return this.prisma.genre.update({
      where: { id },
      data: { ...dto, slug },
    });
  }

  async remove(id: number) {
    const genre = await this.prisma.genre.findUnique({ where: { id } });
    if (!genre) {
      throw new NotFoundException(`Genre with ID ${id} not found`);
    }
    return this.prisma.genre.delete({
      where: { id },
    });
  }
}