import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AuthorsModule } from './modules/authors/authors.module';
import { BooksModule } from './modules/books/books.module';
import { BorrowModule } from './modules/borrow/borrow.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [AuthModule, UsersModule, AuthorsModule, BooksModule, BorrowModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
