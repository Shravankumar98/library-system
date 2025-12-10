import React from "react";
import { Card, Button, Space, Tag } from "antd";

interface BookCardProps {
  id: number;
  title: string;
  author: string;
  isbn: string;
  availableCopies: number;
  onBorrow?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const BookCard: React.FC<BookCardProps> = ({
  id,
  title,
  author,
  isbn,
  availableCopies,
  onBorrow,
  onEdit,
  onDelete,
}) => {
  return (
    <Card title={title} style={{ marginBottom: 16 }}>
      <p>
        <strong>Author:</strong> {author}
      </p>
      <p>
        <strong>ISBN:</strong> {isbn}
      </p>
      <p>
        <strong>Available Copies:</strong>{" "}
        <Tag color={availableCopies > 0 ? "green" : "red"}>
          {availableCopies}
        </Tag>
      </p>
      <Space>
        {availableCopies > 0 && (
          <Button type="primary" onClick={onBorrow}>
            Borrow
          </Button>
        )}
        <Button onClick={onEdit}>Edit</Button>
        <Button danger onClick={onDelete}>
          Delete
        </Button>
      </Space>
    </Card>
  );
};

export default BookCard;
