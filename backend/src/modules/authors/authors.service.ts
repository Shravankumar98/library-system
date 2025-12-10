import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthorDto } from './dto/author.dto';
import { Author } from '@prisma/client';

@Injectable()
export class AuthorsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAuthorDto: CreateAuthorDto): Promise<AuthorDto> {
    const { name, bio } = createAuthorDto;

    const author = await this.prisma.author.create({
      data: {
        name,
        bio: bio || null,
      },
    });

    return this.mapToDto(author);
  }

  async findAll(): Promise<AuthorDto[]> {
    const authors = await this.prisma.author.findMany();
    return authors.map((author) => this.mapToDto(author));
  }

  async findOne(id: number): Promise<AuthorDto> {
    const author = await this.prisma.author.findUnique({
      where: { id },
    });

    if (!author) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }

    return this.mapToDto(author);
  }

  async update(
    id: number,
    updateAuthorDto: UpdateAuthorDto,
  ): Promise<AuthorDto> {
    // Verify author exists
    await this.findOne(id);

    const author = await this.prisma.author.update({
      where: { id },
      data: updateAuthorDto,
    });

    return this.mapToDto(author);
  }

  async delete(id: number): Promise<{ message: string }> {
    // Verify author exists
    await this.findOne(id);

    // Check if author has books
    const bookCount = await this.prisma.book.count({
      where: { authorId: id },
    });

    if (bookCount > 0) {
      throw new BadRequestException(
        `Cannot delete author with ${bookCount} associated book(s)`,
      );
    }

    await this.prisma.author.delete({
      where: { id },
    });

    return { message: `Author with ID ${id} deleted successfully` };
  }

  private mapToDto(author: Author): AuthorDto {
    return {
      id: author.id,
      name: author.name,
      bio: author.bio ?? undefined,
      createdAt: author.createdAt,
      updatedAt: author.updatedAt,
    };
  }
}
