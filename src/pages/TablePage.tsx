import PaginationElement from "../components/PaginationElement";
import TableComponent from "../components/TableComponent";
import TableSearch from "../components/TableSearch";

type Props = {};
const TablePage = (props: Props) => {
  return (
    <>
      <h2 style={{ textAlign: "center" }}>Table Page:</h2>
      <TableSearch />
      <TableComponent />
      <PaginationElement />
    </>
  );
};
export default TablePage;
