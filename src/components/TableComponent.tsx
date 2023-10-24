import { useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { editRow, saveRow, fetchTableData } from "../redux/tableSlice";
import CustomLoader from "./CustomLoader";

import "../styles/TableComponent.scss";

const TableComponent = () => {
  const tableData = useAppSelector((state) => state.table.tableData);
  const currentPage = useAppSelector((state) => state.table.currentPage);
  const loading = useAppSelector((state) => state.table.loading);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTableData(currentPage));
  }, [currentPage, dispatch]);

  const handleEdit = (id: number) => {
    dispatch(editRow({ id }));
  };

  const handleSave = (id: number) => {
    dispatch(saveRow({ id }));
  };

  return (
    <Table striped bordered hover className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Birthday date</th>
          <th>Phone number</th>
          <th>Address</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {loading ? (
          <tr>
            <td colSpan={6}>
              <CustomLoader />
            </td>
          </tr>
        ) : (
          tableData.map((row) => (
            <tr key={row.id}>
              {row.isEditing ? (
                <>
                  <td>
                    <input
                      type="text"
                      value={row.data.name}
                      onChange={(e) => {
                        const newData = { ...row.data, name: e.target.value };
                        const updatedData = tableData.map((r) =>
                          r.id === row.id ? { ...r, data: newData } : r
                        );
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={row.data.email}
                      onChange={(e) => {
                        const newData = {
                          ...row.data,
                          email: e.target.value,
                        };
                        const updatedData = tableData.map((r) =>
                          r.id === row.id ? { ...r, data: newData } : r
                        );
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={row.data.birthday_date}
                      onChange={(e) => {
                        const newData = {
                          ...row.data,
                          birthday_date: e.target.value,
                        };
                        const updatedData = tableData.map((r) =>
                          r.id === row.id ? { ...r, data: newData } : r
                        );
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={row.data.phone_number}
                      onChange={(e) => {
                        const newData = {
                          ...row.data,
                          phone_number: e.target.value,
                        };
                        const updatedData = tableData.map((r) =>
                          r.id === row.id ? { ...r, data: newData } : r
                        );
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={row.data.address}
                      onChange={(e) => {
                        const newData = {
                          ...row.data,
                          address: e.target.value,
                        };
                        const updatedData = tableData.map((r) =>
                          r.id === row.id ? { ...r, data: newData } : r
                        );
                      }}
                    />
                  </td>
                  <td>
                    <Button onClick={() => handleSave(row.id)}>Save</Button>
                  </td>
                </>
              ) : (
                <>
                  <td>{row.data.name}</td>
                  <td>{row.data.email}</td>
                  <td>{row.data.birthday_date}</td>
                  <td>{row.data.phone_number}</td>
                  <td>{row.data.address}</td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => handleEdit(row.id)}
                    >
                      Edit
                    </Button>
                  </td>
                </>
              )}
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
};

export default TableComponent;
