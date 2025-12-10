import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  Button,
  Space,
  Modal,
  message,
  Input,
  Select,
  Row,
  Col,
} from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import {
  fetchBooksRequest,
  deleteBookRequest,
} from "../../redux/slices/booksSlice";
import { fetchAuthorsRequest } from "../../redux/slices/authorsSlice";
import { RootState } from "../../redux/store";
import { Book } from "../../types";
import BookForm from "./BookForm";
import styles from "./BookList.module.css";

const BookList: React.FC = () => {
  const dispatch = useDispatch();
  const { books, loading } = useSelector((state: RootState) => state.books);
  const { authors } = useSelector((state: RootState) => state.authors);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAuthorId, setSelectedAuthorId] = useState<
    number | undefined
  >();
  const [searchText, setSearchText] = useState("");
  const [formFor, setFormFor] = useState<Book>();

  useEffect(() => {
    dispatch(fetchBooksRequest());
    dispatch(fetchAuthorsRequest());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: "Delete Book",
      content: "Are you sure you want to delete this book?",
      okText: "Yes",
      cancelText: "No",
      onOk() {
        dispatch(deleteBookRequest(id));
        message.success("Book deleted successfully");
      },
    });
  };

  const handleUpdate = (id: number) => {
    const book = books.find((book: Book) => book.id === id);
    if (book) {
      console.log("Book to update:", book);
      setFormFor(book);
      setIsModalVisible(true);
    }
  };

  const filteredBooks = books.filter((book) => {
    const matchesAuthor =
      !selectedAuthorId || book.authorId === selectedAuthorId;
    const matchesSearch = book.title
      .toLowerCase()
      .includes(searchText.toLowerCase());
    return matchesAuthor && matchesSearch;
  });

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: "ISBN",
      dataIndex: "isbn",
      key: "isbn",
    },
    {
      title: "Author",
      dataIndex: "authorId",
      key: "authorId",
      render: (authorId: number) => {
        const author = authors.find((a) => a.id === authorId);
        return author?.name || "Unknown";
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Book) => (
        <Space>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => handleUpdate(record.id)}
          >
            Update
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <Row gutter={[16, 16]} className={styles.header}>
        <Col span={24}>
          <Space direction="vertical" style={{ width: "100%" }} size="large">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsModalVisible(true)}
            >
              Add New Book
            </Button>
            <Space>
              <Input
                placeholder="Search by title..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ width: 200 }}
              />
              <Select
                placeholder="Filter by author"
                style={{ width: 200 }}
                allowClear
                value={selectedAuthorId}
                onChange={setSelectedAuthorId}
                options={authors.map((author) => ({
                  label: author.name,
                  value: author.id,
                }))}
              />
            </Space>
          </Space>
        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={filteredBooks}
        loading={loading}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title="Add New Book"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {formFor ? (
          <BookForm
            onSuccess={() => setIsModalVisible(false)}
            formFor={formFor}
            updateMode={true}
          />
        ) : (
          <BookForm onSuccess={() => setIsModalVisible(false)} />
        )}
      </Modal>
    </div>
  );
};

export default BookList;
