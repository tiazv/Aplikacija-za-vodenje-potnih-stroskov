import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  CircularProgress,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TablePagination,
  IconButton,
  Box,
} from '@mui/material';
import detailsIcon from '../assets/more2.png';
import editIcon from '../assets/edit2.png';
import deleteIcon from '../assets/delete2.png';
import { IExpense } from "../models/expenses";

const ExpenseListPage: React.FC = () => {
  const [expenses, setExpenses] = useState<IExpense[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [totalItems, setTotalItems] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExpenses = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `http://localhost:9000/strosek/vsi?page=${
            page + 1
          }&limit=${rowsPerPage}`
        );
        setExpenses(response.data.data);
        setTotalItems(response.data.totalItems);
      } catch (error) {
        setError("Error fetching expenses");
        console.error("Error fetching expenses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, [page, rowsPerPage]);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:9000/strosek/${id}`);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (id: string) => {
    navigate(`/edit/${id}`);  // Navigate to edit page with expense id
  };

  const handleDetails = (id: string) => {
    navigate(`/details/${id}`);  // Navigate to edit page with expense id
  };

  return (
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Traveling Expenses
        </Typography>
    
        {loading ? (
          <Box display="flex" justifyContent="center" my={3}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" align="center">
            {error}
          </Typography>
        ) : (
          <Paper elevation={3} sx={{ mt: 2 }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center"><strong>Datum odhoda</strong></TableCell>
                    <TableCell align="center"><strong>Datum prihoda</strong></TableCell>
                    <TableCell align="center"><strong>Naziv</strong></TableCell>
                    <TableCell align="center"><strong>Delavec</strong></TableCell>
                    <TableCell align="center" colSpan={3}><strong></strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {expenses.map((expense) => (
                    <TableRow key={expense.id} hover>
                      <TableCell align="center">{expense.datum_odhoda}</TableCell>
                      <TableCell align="center">{expense.datum_prihoda}</TableCell>
                      <TableCell align="center">{expense.naziv}</TableCell>
                      <TableCell align="center">{expense.oseba}</TableCell>
                      <TableCell align="center">
                        <Button onClick={() => handleDetails(expense.id)}>
                          <img src={detailsIcon} alt="Details" width="24" height="24" /></Button>
                      </TableCell>
                      <TableCell align="center">
                        <Button onClick={() => handleEdit(expense.id)}>  {/* Edit button */}
                          <img src={editIcon} alt="Edit" width="24" height="24" />
                        </Button>
                      </TableCell>
                      <TableCell align="center">
                        <Button onClick={() => handleDelete(expense.id)}>
                        <img src={deleteIcon} alt="Delete" width="24" height="24" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
    
            <TablePagination
              component="div"
              count={totalItems}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{ px: 2 }}
            />
          </Paper>
        )}
      </Container>
    );
  };
export default ExpenseListPage;
