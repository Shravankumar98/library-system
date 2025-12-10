import  { useState } from "react";
import { useSelector } from "react-redux";
import { ConfigProvider } from "antd";
import appTheme from "./theme/theme";
import { RootState } from "./redux/store";
import LoginForm from "./components/Auth/LoginForm";
import MainLayout from "./components/Layout/MainLayout";
import BookList from "./components/Books/BookList";
import AuthorList from "./components/Authors/AuthorList";
import UserList from "./components/Users/UserList";
import UserBorrowedBooks from "./components/Borrow/UserBorrowedBooks";

type PageType = "books" | "authors" | "users" | "borrowed";

function App() {
  const { user, token } = useSelector((state: RootState) => state.auth);
  const [currentPage, setCurrentPage] = useState<PageType>("books");

  const renderPage = () => {
    switch (currentPage) {
      case "books":
        return <BookList />;
      case "authors":
        return <AuthorList />;
      case "users":
        return <UserList />;
      case "borrowed":
        return <UserBorrowedBooks />;
      default:
        return <BookList />;
    }
  };

  if (!user || !token) {
    return (
      <ConfigProvider theme={appTheme}>
        <LoginForm />
      </ConfigProvider>
    );
  }

  return (
    <ConfigProvider theme={appTheme}>
      <MainLayout
        currentPage={currentPage}
        onMenuClick={(key) => setCurrentPage(key as PageType)}
      >
        {renderPage()}
      </MainLayout>
    </ConfigProvider>
  );
}

export default App;
