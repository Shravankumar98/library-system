import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Modal, message, Row, Col } from "antd";
import { CheckOutlined, PlusOutlined } from "@ant-design/icons";
import {
  fetchUserBorrowedBooksRequest,
  returnBookRequest,
} from "../../redux/slices/borrowSlice";
import { RootState } from "../../redux/store";
import { BorrowRecord } from "../../types";
import BorrowModal from "./BorrowModal";
import styles from "./UserBorrowedBooks.module.css";

const UserBorrowedBooks: React.FC = () => {
  const dispatch = useDispatch();
  const { userBorrowedBooks, loading } = useSelector(
    (state: RootState) => state.borrow
  );
  const { user } = useSelector((state: RootState) => state.auth);
  const { books } = useSelector((state: RootState) => state.books);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUserBorrowedBooksRequest(user.id) as any);
    }
  }, [dispatch, user?.id]);

  const handleReturn = (borrowRecordId: number) => {
    Modal.confirm({
      title: "Return Book",
      content: "Are you sure you want to return this book?",
      okText: "Yes",
      cancelText: "No",
      onOk() {
        dispatch(returnBookRequest({ borrowRecordId }) as any);
        message.success("Book returned successfully");
      },
    });
  };

  const columns = [
    {
      title: "Book Title",
      dataIndex: "bookId",
      key: "bookId",
      render: (bookId: number) => {
        const book = books.find((b) => b.id === bookId);
        return <strong>{book?.title || "Unknown"}</strong>;
      },
    },
    {
      title: "Borrowed Date",
      dataIndex: "borrowedAt",
      key: "borrowedAt",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Status",
      dataIndex: "returnedAt",
      key: "status",
      render: (returnedAt: string | null) => (
        <span
          style={{ color: returnedAt ? "gray" : "#018790", fontWeight: "bold" }}
        >
          {returnedAt ? "Returned" : "Active"}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: BorrowRecord) =>
        !record.returnedAt ? (
          <Button
            type="primary"
            icon={<CheckOutlined />}
            onClick={() => handleReturn(record.id)}
          >
            Return
          </Button>
        ) : (
          <span style={{ color: "gray" }}>Returned</span>
        ),
    },
  ];

  return (
    <div className={styles.container}>
      <Row gutter={[16, 16]} className={styles.header}>
        <Col span={24}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalVisible(true)}
          >
            Borrow New Book
          </Button>
        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={userBorrowedBooks}
        loading={loading}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />

      <BorrowModal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onSuccess={() => {
          setIsModalVisible(false);
          if (user?.id) {
            dispatch(fetchUserBorrowedBooksRequest(user.id) as any);
          }
        }}
      />
    </div>
  );
};

export default UserBorrowedBooks;
