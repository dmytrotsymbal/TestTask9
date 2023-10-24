import PaginationElement from "../components/PaginationElement";
import TableComponent from "../components/TableComponent";

type Props = {};
const TablePage = (props: Props) => {
  return (
    <>
      <h2>Table Page:</h2>
      <TableComponent />
      <PaginationElement />
    </>
  );
};
export default TablePage;
