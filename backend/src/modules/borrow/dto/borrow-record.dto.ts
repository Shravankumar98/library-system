export class BorrowRecordDto {
  id: number;
  userId: number;
  bookId: number;
  borrowedAt: Date;
  returnedAt: Date | null;
}
