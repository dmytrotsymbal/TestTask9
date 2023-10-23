import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export type TableData = {
  name: string;
  email: string;
  birthday_date: string;
  phone_number: string;
  address?: string;
};

export type TableRow = {
  id: number;
  data: TableData;
  isEditing: boolean;
};

interface TableState {
  tableData: TableRow[];
  currentPage: number;
  totalPages: number;
}

export const fetchTableData = createAsyncThunk(
  "table/fetchData",
  async (page: number) => {
    const limit = 10;
    const offset = (page - 1) * limit;
    const apiUrl = `http://146.190.118.121/api/table/?limit=${limit}&offset=${offset}`;

    const response = await axios.get(apiUrl);
    const data = response.data.results;
    const tableRows = data.map((item: TableData, index: number) => ({
      id: index + 1,
      data: item,
      isEditing: false,
    }));

    const totalCount = response.data.count;
    const totalPages = Math.ceil(totalCount / limit);

    return { tableData: tableRows, currentPage: page, totalPages };
  }
);

const tableSlice = createSlice({
  name: "table",
  initialState: { tableData: [], currentPage: 1, totalPages: 0 } as TableState,
  reducers: {
    editRow: (state, action) => {
      const { id } = action.payload;
      state.tableData = state.tableData.map((row) => ({
        ...row,
        isEditing: row.id === id,
      }));
    },
    saveRow: (state, action) => {
      const { id } = action.payload;
      const editedRow = state.tableData.find((row) => row.id === id);
      if (editedRow) {
        // Відправка змінених даних на сервер та оновлення стану
        axios
          .put(`http://146.190.118.121/api/table/${id}`, editedRow.data)
          .then((response) => {
            const updatedData = state.tableData.map((row) => ({
              ...row,
              isEditing: false,
            }));
            state.tableData = updatedData;
          })
          .catch((error) => {
            console.error("Помилка при збереженні змін:", error);
          });
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTableData.fulfilled, (state, action) => {
      state.tableData = action.payload.tableData;
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
    });

    builder.addCase(fetchTableData.rejected, (state, action) => {
      console.error("Помилка завантаження даних:", action.error);
    });

    builder.addCase(fetchTableData.pending, (state, action) => {
      console.log("Завантаження даних...", action.meta);
    });
  },
});

export const { editRow, saveRow } = tableSlice.actions;

export default tableSlice.reducer;
