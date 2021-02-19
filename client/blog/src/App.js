import React, { useState, useEffect } from "react"
import './App.css';
import Axios from 'axios'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};


function App() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [tutorialsList, setTutorialsList] = useState([])
  const [description1, setDescription1] = useState("")
  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setTutorialsList(response.data);
    })
  }, []);
  const SearchResults = () => {
    Axios.post("http://localhost:3001/api/Search",
    );
  }

  const saveDetails = () => {
    Axios.post("http://localhost:3001/api/insert",
      {
        titleName: title,
        descriptionName: description,
      });
    setTutorialsList([
      ...tutorialsList,
      { titleName: title, descriptionName: description },
    ]);
    setTitle(" ")
    setDescription(" ")
  };

  const deleteDetails = (id) => {
    Axios.delete(`http://localhost:3001/api/delete/${id}`);
  };

  const updateDetails = (id) => {
    Axios.put(`http://localhost:3001/api/update/${id}`);
  };


  const updateDetails1 = (id) => {
    Axios.put(`http://localhost:3001/api/update1/${id}`,
      {
        descriptionName1: description1,
      });
    setDescription1("")
  };

  const classes = useStyles();
  const useStyles2 = makeStyles({
    table: {
      minWidth: 500,
    },
  });

  return (
    <div align="center" className="App">
      <h1>Tutorials Application React</h1>
      <div className="form">
        <label> Title</label>
        <input type="text" name="title" onChange={(e) => {
          setTitle(e.target.value)
        }} />
        <label> Description</label>
        <input type="text" name="description" onChange={(e) => {
          setDescription(e.target.value)
        }} />
        <button onClick={saveDetails} className="submit">Submit</button>
        <input type="text" name="search" placeholder="Please Search Movie Here"></input>

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="Tutorial Table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align="left">Description</TableCell>
                <TableCell align="left">Publish Status</TableCell>
                <TableCell align="center">New Description to update</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tutorialsList.map((val) => (
                <TableRow key={val.title}>
                  <TableCell component="th" scope="row">
                    {val.title}
                  </TableCell>
                  <TableCell align="left">{val.description}</TableCell>
                  <TableCell align="left">{val.publish_status}</TableCell>
                  <TableCell align="left"><input type="text" id="idinput" onChange={(e) => { setDescription1(e.target.value) }}></input></TableCell>
                  <button className="delete" onClick={() => { deleteDetails(val.id) }}> Delete</button> <button className="submit" onClick={() => { updateDetails(val.id) }}> {val.publish_status === 'Published' ? 'Unpublish' : 'Publish'}</button><button className="edit" onClick={() => { updateDetails1(val.id) }}>Edit</button>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      </div>
    </div>
  );
}

export default App;
