import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { BorrowRecord } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { BorrowBookDto } from './dto/borrow-book.dto';
import { ReturnBookDto } from './dto/return-book.dto';
import { BorrowRecordDto } from './dto/borrow-record.dto';

@Injectable()
export class BorrowService {
  constructor(private readonly prisma: PrismaService) {}

  async borrowBook(borrowBookDto: BorrowBookDto): Promise<BorrowRecordDto> {
    const { userId, bookId } = borrowBookDto;

    // Verify user exists
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new BadRequestException(`User with ID ${userId} not found`);
    }

    // Verify book exists
    const book = await this.prisma.book.findUnique({
      where: { id: bookId },
    });

    if (!book) {
      throw new BadRequestException(`Book with ID ${bookId} not found`);
    }

    // Check if book is already borrowed (not returned)
    const activeBorrow = await this.prisma.borrowRecord.findFirst({
      where: {
        bookId,
        returnedAt: null,
      },
    });

    if (activeBorrow) {
      throw new BadRequestException('This book is already borrowed');
    }

    // Create borrow record
    const borrowRecord = await this.prisma.borrowRecord.create({
      data: {
        userId,
        bookId,
      },
    });

    return this.mapToDto(borrowRecord);
  }

  async returnBook(returnBookDto: ReturnBookDto): Promise<BorrowRecordDto> {
    const { borrowRecordId } = returnBookDto;

    // Verify borrow record exists
    const borrowRecord = await this.prisma.borrowRecord.findUnique({
      where: { id: borrowRecordId },
    });

    if (!borrowRecord) {
      throw new NotFoundException(
        `Borrow record with ID ${borrowRecordId} not found`,
      );
    }

    // Check if already returned
    if (borrowRecord.returnedAt !== null) {
      throw new BadRequestException('This book has already been returned');
    }

    // Update borrow record with return time
    const updatedRecord = await this.prisma.borrowRecord.update({
      where: { id: borrowRecordId },
      data: {
        returnedAt: new Date(),
      },
    });

    return this.mapToDto(updatedRecord);
  }

  async getUserBorrowedBooks(userId: number): Promise<BorrowRecordDto[]> {
    // Verify user exists
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new BadRequestException(`User with ID ${userId} not found`);
    }

    // Get all active (not returned) borrow records for the user
    const borrowRecords = await this.prisma.borrowRecord.findMany({
      where: {
        userId,
        returnedAt: null,
      },
    });

    return borrowRecords.map((record) => this.mapToDto(record));
  }

  async getBorrowRecord(id: number): Promise<BorrowRecordDto> {
    const borrowRecord = await this.prisma.borrowRecord.findUnique({
      where: { id },
    });

    if (!borrowRecord) {
      throw new NotFoundException(`Borrow record with ID ${id} not found`);
    }

    return this.mapToDto(borrowRecord);
  }

  private mapToDto(borrowRecord: BorrowRecord): BorrowRecordDto {
    return {
      id: borrowRecord.id,
      userId: borrowRecord.userId,
      bookId: borrowRecord.bookId,
      borrowedAt: borrowRecord.borrowedAt,
      returnedAt: borrowRecord.returnedAt,
    };
  }
}
