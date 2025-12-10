export class CreateBookDto {
  title: string;
  isbn: string;
  description?: string;
  authorId: number;
}
