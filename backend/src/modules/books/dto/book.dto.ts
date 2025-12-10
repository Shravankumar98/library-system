export class BookDto {
  id: number;
  title: string;
  isbn: string;
  description?: string;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
}
