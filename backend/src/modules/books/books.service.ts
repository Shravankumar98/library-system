import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Book } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { FilterBookDto } from './dto/filter-book.dto';
import { BookDto } from './dto/book.dto';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBookDto: CreateBookDto): Promise<BookDto> {
    const { title, isbn, description, authorId } = createBookDto;

    // Verify author exists
    const author = await this.prisma.author.findUnique({
      where: { id: authorId },
    });

    if (!author) {
      throw new BadRequestException(`Author with ID ${authorId} not found`);
    }

    // Check if ISBN already exists
    const existingBook = await this.prisma.book.findUnique({
      where: { isbn },
    });

    if (existingBook) {
      throw new BadRequestException('Book with this ISBN already exists');
    }

    const book = await this.prisma.book.create({
      data: {
        title,
        isbn,
        description: description || null,
        authorId,
      },
    });

    return this.mapToDto(book);
  }

  async findAll(filter?: FilterBookDto): Promise<BookDto[]> {
    const where: Record<string, any> = {};

    if (filter?.authorId) {
      where.authorId = filter.authorId;
    }

    // Filter by borrowed status if provided
    if (filter?.isBorrowed !== undefined) {
      if (filter.isBorrowed) {
        // Books with active (not returned) borrow records
        const borrowedBookIds = await this.prisma.borrowRecord.findMany({
          where: {
            returnedAt: null,
          },
          select: {
            bookId: true,
          },
        });

        where.id = {
          in: borrowedBookIds.map((record) => record.bookId),
        };
      } else {
        // Books without active borrow records
        const borrowedBookIds = await this.prisma.borrowRecord.findMany({
          where: {
            returnedAt: null,
          },
          select: {
            bookId: true,
          },
        });

        where.id = {
          notIn: borrowedBookIds.map((record) => record.bookId),
        };
      }
    }

    const books = await this.prisma.book.findMany({
      where,
    });

    return books.map((book: Book) => this.mapToDto(book));
  }

  async findOne(id: number): Promise<BookDto> {
    const book = await this.prisma.book.findUnique({
      where: { id },
    });

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return this.mapToDto(book);
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<BookDto> {
    // Verify book exists
    await this.findOne(id);

    // If updating author, verify new author exists
    if (updateBookDto.authorId) {
      const author = await this.prisma.author.findUnique({
        where: { id: updateBookDto.authorId },
      });

      if (!author) {
        throw new BadRequestException(
          `Author with ID ${updateBookDto.authorId} not found`,
        );
      }
    }

    const book = await this.prisma.book.update({
      where: { id },
      data: updateBookDto,
    });

    return this.mapToDto(book);
  }

  async delete(id: number): Promise<{ message: string }> {
    // Verify book exists
    await this.findOne(id);

    // Check if book has active borrow records
    const activeBorrow = await this.prisma.borrowRecord.findFirst({
      where: {
        bookId: id,
        returnedAt: null,
      },
    });

    if (activeBorrow) {
      throw new BadRequestException(
        'Cannot delete a book that is currently borrowed',
      );
    }

    await this.prisma.book.delete({
      where: { id },
    });

    return { message: `Book with ID ${id} deleted successfully` };
  }

  private mapToDto(book: Book): BookDto {
    return {
      id: book.id,
      title: book.title,
      isbn: book.isbn,
      description: book.description || undefined,
      authorId: book.authorId,
      createdAt: book.createdAt,
      updatedAt: book.updatedAt,
    };
  }
}
