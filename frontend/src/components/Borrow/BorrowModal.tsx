import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Form, Select, Button, message } from "antd";
import { borrowBookRequest } from "../../redux/slices/borrowSlice";
import { fetchUsersRequest } from "../../redux/slices/usersSlice";
import { fetchBooksRequest } from "../../redux/slices/booksSlice";
import { RootState } from "../../redux/store";

interface BorrowModalProps {
  visible: boolean;
  onCancel: () => void;
  onSuccess: () => void;
}

const BorrowModal: React.FC<BorrowModalProps> = ({
  visible,
  onCancel,
  onSuccess,
}) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { loading } = useSelector((state: RootState) => state.borrow);
  const { users } = useSelector((state: RootState) => state.users);
  const { books } = useSelector((state: RootState) => state.books);

  useEffect(() => {
    if (visible) {
      dispatch(fetchUsersRequest());
      dispatch(fetchBooksRequest());
    }
  }, [visible, dispatch]);

  // Filter books that are not currently borrowed
  const availableBooks = books.filter((book) => {
    // This is a simplified check - in production, you'd check borrowRecords
    return true; // All books shown for now, filtering happens server-side
  });

  const onFinish = (values: any) => {
    dispatch(borrowBookRequest(values) as any);
    message.success("Book borrowed successfully");
    form.resetFields();
    onSuccess();
  };

  return (
    <Modal
      title="Borrow a Book"
      open={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          label="User"
          name="userId"
          rules={[{ required: true, message: "Please select a user" }]}
        >
          <Select
            placeholder="Select a user"
            options={users.map((user) => ({
              label: `${user.name} (${user.email})`,
              value: user.id,
            }))}
          />
        </Form.Item>

        <Form.Item
          label="Book"
          name="bookId"
          rules={[{ required: true, message: "Please select a book" }]}
        >
          <Select
            placeholder="Select a book"
            options={availableBooks.map((book) => ({
              label: book.title,
              value: book.id,
            }))}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={loading} block>
          Borrow Book
        </Button>
      </Form>
    </Modal>
  );
};

export default BorrowModal;
