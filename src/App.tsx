import { Routes, Route } from "react-router-dom";
import Table from "./components/Table";
import LoginPage from "./pages/LoginPage";

type Props = {};
const App = (props: Props) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/table" element={<Table />} />
      </Routes>
    </>
  );
};
export default App;
