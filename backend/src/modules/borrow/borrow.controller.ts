import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { BorrowService } from './borrow.service';
import { BorrowBookDto } from './dto/borrow-book.dto';
import { ReturnBookDto } from './dto/return-book.dto';

@Controller('borrow')
export class BorrowController {
  constructor(private readonly borrowService: BorrowService) {}

  @Post('borrow')
  async borrowBook(@Body() borrowBookDto: BorrowBookDto) {
    return this.borrowService.borrowBook(borrowBookDto);
  }

  @Post('return')
  async returnBook(@Body() returnBookDto: ReturnBookDto) {
    return this.borrowService.returnBook(returnBookDto);
  }

  @Get('user/:userId')
  async getUserBorrowedBooks(@Param('userId', ParseIntPipe) userId: number) {
    return this.borrowService.getUserBorrowedBooks(userId);
  }

  @Get(':id')
  async getBorrowRecord(@Param('id', ParseIntPipe) id: number) {
    return this.borrowService.getBorrowRecord(id);
  }
}
