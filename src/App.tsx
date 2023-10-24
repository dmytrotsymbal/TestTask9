import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Container } from "react-bootstrap";
import CustomLoader from "./components/CustomLoader";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const TablePage = lazy(() => import("./pages/TablePage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

type Props = {};
const App = (props: Props) => {
  return (
    <div
      style={{
        overflowX: "auto",
        overflowY: "auto",
        height: "100vh",
        width: "100%",
      }}
    >
      <Container>
        <Suspense fallback={<CustomLoader />}>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/table" element={<TablePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Container>
    </div>
  );
};
export default App;
