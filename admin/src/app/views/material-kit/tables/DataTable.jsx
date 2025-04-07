import React, { useState } from "react";
import {
  Box,
  Table,
  styled,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TextField,
  IconButton,
  Button
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0, cursor: "pointer" } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));

export default function DataTable({ columns, data, onSubmit, onStatusChange }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate(); // For navigation

  const handleSubmit = (action, row) => {
    if (action === "edit") {
      navigate(row.editUrl); // Navigate to the edit page
    } else if (action === "delete") {
      onSubmit(action, row); // Call onSubmit prop to delete the row
    }
  };

  const handleStatusChange = (row) => {
    onStatusChange(row); // Call onStatusChange prop to update the status
  };

  // Sorting the data
  const sortedData = [...data].sort((a, b) => {
    if (sortBy) {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    }
    return 0;
  });

  // Filtering the data
  const filteredData = sortedData.filter((row) => {
    return columns.some((column) =>
      row[column.field]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSort = (columnField) => {
    const isAsc = sortBy === columnField && sortDirection === "asc";
    setSortDirection(isAsc ? "desc" : "asc");
    setSortBy(columnField);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Box width="100%" overflow="auto">
      <Box mb={2} display="flex" justifyContent="flex-end">
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
          fullWidth
          sx={{ maxWidth: 300 }}
        />
      </Box>

      <StyledTable>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.field}
                align="left"
                onClick={() => handleSort(column.field)}
              >
                {column.headerName}
                {sortBy === column.field ? (sortDirection === "asc" ? " ↑" : " ↓") : null}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => {
                  const value = row[column.field];
                  return (
                    <TableCell key={column.field} align="left">
                      {column.field === "image" && value ? (
                        <img src={value} alt="Image" width={50} />
                      ) : column.field === "action" ? (
                        <Box>
                          <IconButton
                            onClick={() => handleSubmit("edit", row)}
                            color="primary"
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            onClick={() => handleSubmit("delete", row)}
                            color="error"
                          >
                            <Delete />
                          </IconButton>
                        </Box>
                      ) : column.field === "status" ? (
                        <Box>
                          <Button
                            variant="contained"
                            color={
                              String(value).charAt(0).toLowerCase() + String(value).slice(1) === "approve" || 
                              value === "Unblock" || 
                              value === 'Active' ||
                              value === 'Success' ? "success" : "error"}
                            onClick={() => handleStatusChange(row)}
                          >
                            {String(value).charAt(0).toUpperCase() + String(value).slice(1)}
                            {/* {value === "approved" ? "Approve" : "Disapprove"} */}
                          </Button>
                        </Box>
                      ) : column.field === "link" && value ? (
                        <a href={value} target="_blank" rel="noopener noreferrer">
                          {value}
                        </a>
                      ) : (
                        value
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
        </TableBody>
      </StyledTable>

      <TablePagination
        sx={{ px: 2 }}
        page={page}
        component="div"
        rowsPerPage={rowsPerPage}
        count={filteredData.length}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={handleChangeRowsPerPage}
        nextIconButtonProps={{ "aria-label": "Next Page" }}
        backIconButtonProps={{ "aria-label": "Previous Page" }}
      />
    </Box>
  );
}
