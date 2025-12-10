import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Space, Modal, message, Input, Row, Col } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import {
  fetchAuthorsRequest,
  deleteAuthorRequest,
} from "../../redux/slices/authorsSlice";
import { RootState } from "../../redux/store";
import { Author } from "../../types";
import AuthorForm from "./AuthorForm";
import styles from "./AuthorList.module.css";

export interface FormValues {
  name: string;
  bio?: string;
}

const AuthorList: React.FC = () => {
  const dispatch = useDispatch();
  const { authors, loading } = useSelector((state: RootState) => state.authors);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formFor, setFormFor] = useState<Author>();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    dispatch(fetchAuthorsRequest());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: "Delete Author",
      content: "Are you sure you want to delete this author?",
      okText: "Yes",
      cancelText: "No",
      onOk() {
        dispatch(deleteAuthorRequest(id));
        message.success("Author deleted successfully");
      },
    });
  };

  const handleUpdate = (id: number) => {
    const author = authors.find((author: Author) => author.id === id);
    if (author) {
      console.log("Author to update:", author);
      setFormFor(author);
      setIsModalVisible(true);
    }
  };

  const filteredAuthors = authors.filter((author: Author) =>
    author.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: "Bio",
      dataIndex: "bio",
      key: "bio",
      ellipsis: true,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Author) => (
        <Space>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              handleUpdate(record.id);
            }}
          >
            Edit
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
              Add New Author
            </Button>
            <Input
              placeholder="Search by author name..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 300 }}
            />
          </Space>
        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={filteredAuthors}
        loading={loading}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title="Add New Author"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {formFor ? (
          <AuthorForm
            onSuccess={() => setIsModalVisible(false)}
            formFor={formFor}
            updateMode={true}
          />
        ) : (
          <AuthorForm
            onSuccess={() => setIsModalVisible(false)}
            formFor={undefined}
          />
        )}
      </Modal>
    </div>
  );
};

export default AuthorList;
