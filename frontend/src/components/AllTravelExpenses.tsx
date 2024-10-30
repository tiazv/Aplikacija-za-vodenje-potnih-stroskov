import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  TablePagination,
  Button,
} from "@mui/material";
import { IExpense } from "../models/expenses";

const ExpenseListPage: React.FC = () => {
  const [expenses, setExpenses] = useState<IExpense[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [totalItems, setTotalItems] = useState<number>(0);

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

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Traveling Expenses
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Datum odhoda</TableCell>
                  <TableCell>Datum prihoda</TableCell>
                  <TableCell>Kilometrina</TableCell>
                  <TableCell>Strošek</TableCell>
                  <TableCell>Lokacija</TableCell>
                  <TableCell>Opis</TableCell>
                  <TableCell>Delavec</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {expenses.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell>{expense.datum_odhoda}</TableCell>
                    <TableCell>{expense.datum_prihoda}</TableCell>
                    <TableCell>{expense.kilometrina} km</TableCell>
                    <TableCell>{expense.kilometrina}</TableCell> {/* Spremeni, ko bo dodan atribut */}
                    <TableCell>{expense.lokacija}</TableCell>
                    <TableCell>{expense.opis}</TableCell>
                    <TableCell>{expense.oseba}</TableCell>
                    <TableCell>
                      <Button> Podrobnosti </Button>
                    </TableCell>
                    <TableCell>
                      <Button> Uredi </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        color="error"
                        onClick={() => handleDelete(expense.id)}
                      >
                        {" "}
                        Izbriši{" "}
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
          />
        </Paper>
      )}
    </Container>
  );
};

export default ExpenseListPage;
