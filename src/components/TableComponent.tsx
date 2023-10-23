import { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Pagination } from "react-bootstrap";

type TableData = {
  name: string;
  email: string;
  birthday_date: string;
  phone_number: string;
  address?: string;
};

type TableRow = {
  id: number;
  data: TableData;
  isEditing: boolean;
};

const apiUrl = "http://146.190.118.121/api/table/";
const limit = 10;

const TableComponent = () => {
  const [tableData, setTableData] = useState<TableRow[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = (page: number) => {
    const offset = (page - 1) * limit;
    const url = `${apiUrl}?limit=${limit}&offset=${offset}`;

    axios
      .get(url)
      .then((response) => {
        const data = response.data.results;
        const tableRows = data.map((item: TableData, index: number) => ({
          id: index + 1,
          data: item,
          isEditing: false,
        }));
        setTableData(tableRows);

        const totalCount = response.data.count;
        const totalPages = Math.ceil(totalCount / limit);
        setTotalPages(totalPages);
      })
      .catch((error) => {
        console.error("Помилка завантаження даних:", error);
      });
  };

  const handleEdit = (id: number) => {
    const updatedData = tableData.map((row) => ({
      ...row,
      isEditing: row.id === id,
    }));
    setTableData(updatedData);
  };

  const handleSave = (id: number) => {
    // Відправка змінених даних на сервер та оновлення стану
    const editedRow = tableData.find((row) => row.id === id);
    if (editedRow) {
      axios
        .put(`${apiUrl}${id}`, editedRow.data)
        .then((response) => {
          // Успішно оновлено на сервері
          const updatedData = tableData.map((row) => ({
            ...row,
            isEditing: false,
          }));
          setTableData(updatedData);
        })
        .catch((error) => {
          console.error("Помилка при збереженні змін:", error);
        });
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Table striped bordered hover>
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
          {tableData.map((row) => (
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
                        setTableData(updatedData);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={row.data.email}
                      onChange={(e) => {
                        const newData = { ...row.data, email: e.target.value };
                        const updatedData = tableData.map((r) =>
                          r.id === row.id ? { ...r, data: newData } : r
                        );
                        setTableData(updatedData);
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
                        setTableData(updatedData);
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
                        setTableData(updatedData);
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
                        setTableData(updatedData);
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
          ))}
        </tbody>
      </Table>
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
    </>
  );
};

export default TableComponent;
