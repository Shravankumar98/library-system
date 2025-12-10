import { Module } from '@nestjs/common';
import { BorrowController } from './borrow.controller';
import { BorrowService } from './borrow.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [BorrowController],
  providers: [BorrowService, PrismaService],
  exports: [BorrowService],
})
export class BorrowModule {}
