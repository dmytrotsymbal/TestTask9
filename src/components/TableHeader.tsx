import {
  sortByName,
  sortByEmail,
  sortByBirthdayDate,
} from "../redux/tableSlice";
import { useDispatch } from "react-redux";
import ChevroneDown from "./ui/ChevroneDown";
import "../styles/TableHeader.scss";

type Props = {};
const TableHeader = (props: Props) => {
  const dispatch = useDispatch();
  return (
    <thead>
      <tr>
        <th className="filterName" onClick={() => dispatch(sortByName())}>
          Name <ChevroneDown />
        </th>
        <th className="filterEmail" onClick={() => dispatch(sortByEmail())}>
          Email <ChevroneDown />
        </th>
        <th
          className="filterBirthday"
          onClick={() => dispatch(sortByBirthdayDate())}
        >
          Birthday date <ChevroneDown />
        </th>
        <th>Phone number</th>
        <th>Address</th>
        <th>Actions</th>
      </tr>
    </thead>
  );
};
export default TableHeader;
