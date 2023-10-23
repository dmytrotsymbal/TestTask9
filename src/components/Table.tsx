import React, { useState, useEffect } from "react";
import axios from "axios";

interface TableData {
  name: string;
  email: string;
  birthday_date: string;
  phone_number: string;
  address?: string;
}

interface TableRow {
  id: number;
  data: TableData;
  isEditing: boolean;
}

const apiUrl = "http://146.190.118.121/api/table/";

const Table: React.FC = () => {
  const [tableData, setTableData] = useState<TableRow[]>([]);

  useEffect(() => {
    // Завантаження даних із сервера при завантаженні компонента
    axios
      .get(apiUrl)
      .then((response) => {
        const data = response.data.results;
        const tableRows = data.map((item: TableData, index: number) => ({
          id: index + 1, // Можна використовувати id, отриманий від сервера, якщо він є
          data: item,
          isEditing: false,
        }));
        setTableData(tableRows);
      })
      .catch((error) => {
        console.error("Помилка завантаження даних:", error);
      });
  }, []);

  const handleEdit = (id: number) => {
    // Оновлення стану редагування для відповідного рядка
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

  return (
    <div>
      <table>
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
                    <button onClick={() => handleSave(row.id)}>Save</button>
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
                    <button onClick={() => handleEdit(row.id)}>Edit</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
