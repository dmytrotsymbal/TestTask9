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

export type TableState = {
  originalTableData: TableRow[];
  tableData: TableRow[];
  currentPage: number;
  totalPages: number;
  loading: boolean;
  trouble: string | null;
};
