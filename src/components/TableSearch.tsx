import { useState } from "react";
import { Form } from "react-bootstrap";
import { useAppDispatch } from "../redux/hooks";
import { searchByName } from "../redux/tableSlice";
import "../styles/TableSearch.scss";

type Props = {};
const TableSearch = (props: Props) => {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState(""); // Состояние для хранения поискового запроса

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    dispatch(searchByName(e.target.value));
  };
  return (
    <>
      <Form.Control
        className="searchInput"
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearch}
      />
    </>
  );
};
export default TableSearch;
