import react, {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/system';
import NavbarComponent from '../Components/Navbar';
import axios from "axios";
import { useCookies } from 'react-cookie';



const Orders = ({ cart }) => {
  const [data, setData] = useState([]);
  const [cookie, setCookie] = useCookies("jwt");
  const getOrders = async() => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${cookie.jwt}`,
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*',
        }
      };
      console.log("asdsdsd")
      const orders = await axios.get("http://localhost:8080/displayall", config);
      setData(orders.data);
      
    } catch (e) {

    }

  }
  console.log(data);
  useEffect(() => {
    getOrders();
  },[])
  return (
    <>
      <NavbarComponent auth={true} cart={cart} />
      <Container>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>productId</TableCell>
                <TableCell align="right">orderDate</TableCell>
                <TableCell align="right">redeemedPoints</TableCell>
                <TableCell align="right">salePrice</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data && data.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.productId}
                  </TableCell>
                  <TableCell align="right">{row.productBrand}</TableCell>
                  <TableCell align="right">{row.productModel}</TableCell>
                  <TableCell align="right">{row.productPrice}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container></>
  )
}

export default Orders