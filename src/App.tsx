import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TablePage from "./pages/TablePage";
import NotFoundPage from "./pages/NotFoundPage";
import { Container } from "react-bootstrap";

type Props = {};
const App = (props: Props) => {
  return (
    <>
      <Container>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/table" element={<TablePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Container>
    </>
  );
};
export default App;
