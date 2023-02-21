import react ,{useEffect,useState } from 'react';
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




const Referals = ({cart}) => {
  const [data, setData] = useState([]);
  const [cookie, setCookie] = useCookies("jwt");
  
  const getReferals =async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${cookie.jwt}`,
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*',
        }
      };
      const { data } = await axios.get("http://localhost:8080/referrals/allreferral",config);
      setData(data);
    } catch (e) {
      
    }

  }
  useEffect(() => {
    getReferals();
  }, [])
  
  return (
    <>
      <NavbarComponent auth={true} cart={cart} />
      <Container>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ReferalId</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Mail</TableCell>
                <TableCell align="right">Phone Number</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data && data.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container></>
  )
}

export default Referals