import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TableState, TableData } from "../types/types";

export const fetchTableData = createAsyncThunk(
  "table/fetchData",
  async (page: number) => {
    const limit = 20;
    const offset = (page - 1) * limit;
    const apiUrl = `https://technical-task-api.icapgroupgmbh.com/api/table/?limit=${limit}&offset=${offset}`;
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
  initialState: {
    originalTableData: [],
    tableData: [],
    currentPage: 1,
    totalPages: 0,
    loading: false,
    trouble: null,
  } as TableState,
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
        axios
          .put(
            `https://technical-task-api.icapgroupgmbh.com/api/table/${id}/`,
            editedRow.data
          )
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

    sortByName: (state) => {
      state.tableData = state.tableData.sort((a, b) =>
        a.data.name.localeCompare(b.data.name)
      );
    },

    sortByEmail: (state) => {
      state.tableData = state.tableData.sort((a, b) =>
        a.data.email.localeCompare(b.data.email)
      );
    },

    sortByBirthdayDate: (state) => {
      state.tableData = state.tableData.sort((a, b) =>
        a.data.birthday_date.localeCompare(b.data.birthday_date)
      );
    },

    searchByName: (state, action) => {
      const searchTerm = action.payload;
      if (searchTerm.trim() === "") {
        state.trouble = null;
        state.tableData = state.originalTableData;
      } else {
        state.tableData = state.originalTableData.filter((row) =>
          row.data.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (state.tableData.length === 0) {
          state.trouble = "No results found";
        } else {
          state.trouble = null;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTableData.fulfilled, (state, action) => {
      state.originalTableData = action.payload.tableData;
      state.tableData = action.payload.tableData;
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
      state.loading = false;
      state.trouble = null;
    });

    builder.addCase(fetchTableData.rejected, (state) => {
      state.loading = false;
      state.trouble = "An error occurred while processing your request";
    });

    builder.addCase(fetchTableData.pending, (state) => {
      state.loading = true;
      state.trouble = null;
    });
  },
});

export const {
  editRow,
  saveRow,
  sortByName,
  sortByBirthdayDate,
  sortByEmail,
  searchByName,
} = tableSlice.actions;

export default tableSlice.reducer;
