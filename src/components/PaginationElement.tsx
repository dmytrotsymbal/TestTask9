import { Pagination } from "react-bootstrap";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { fetchTableData } from "../redux/tableSlice";

type Props = {};
const PaginationElement = (props: Props) => {
  const currentPage = useAppSelector((state) => state.table.currentPage);
  const totalPages = useAppSelector((state) => state.table.totalPages);
  const dispatch = useAppDispatch();

  const handlePageChange = (page: number) => {
    dispatch(fetchTableData(page));
  };
  return (
    <Pagination>
      {Array.from({ length: totalPages }, (_, index) => (
        <Pagination.Item
          key={index + 1}
          active={currentPage === index + 1}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </Pagination.Item>
      ))}
    </Pagination>
  );
};
export default PaginationElement;
