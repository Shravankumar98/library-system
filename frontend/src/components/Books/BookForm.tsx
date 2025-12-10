import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Select, Button, message } from "antd";
import {
  createBookRequest,
  updateBookRequest,
} from "../../redux/slices/booksSlice";
import { fetchAuthorsRequest } from "../../redux/slices/authorsSlice";
import { RootState } from "../../redux/store";
import { Book } from "../../types";

interface BookFormProps {
  onSuccess: () => void;
  formFor?: Book;
  updateMode?: boolean;
}

const BookForm: React.FC<BookFormProps> = ({
  onSuccess,
  formFor,
  updateMode = false,
}) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { loading } = useSelector((state: RootState) => state.books);
  const { authors } = useSelector((state: RootState) => state.authors);

  useEffect(() => {
    dispatch(fetchAuthorsRequest());
  }, [dispatch]);

  useEffect(() => {
    form.setFieldsValue(formFor);
  }, [form, formFor]);

  const onFinish = (values: any) => {
    updateMode
      ? dispatch(updateBookRequest({ ...formFor, ...values }))
      : dispatch(createBookRequest(values));
    message.success(`Book ${updateMode ? "updated" : "created"} successfully`);
    onSuccess();
    form.resetFields();
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please enter book title" }]}
      >
        <Input placeholder="Enter book title" />
      </Form.Item>

      <Form.Item
        label="ISBN"
        name="isbn"
        rules={[{ required: true, message: "Please enter ISBN" }]}
      >
        <Input placeholder="Enter ISBN" />
      </Form.Item>

      <Form.Item
        label="Author"
        name="authorId"
        rules={[{ required: true, message: "Please select an author" }]}
      >
        <Select
          placeholder="Select an author"
          options={authors.map((author) => ({
            label: author.name,
            value: author.id,
          }))}
        />
      </Form.Item>

      <Form.Item label="Description" name="description">
        <Input.TextArea placeholder="Enter book description" rows={4} />
      </Form.Item>

      <Button type="primary" htmlType="submit" loading={loading} block>
        {updateMode ? "Update Book" : "Create Book"}
      </Button>
    </Form>
  );
};

export default BookForm;
