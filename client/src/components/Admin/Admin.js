import './Admin.css';
import { useState, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/DoneAll";
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import Input from "@mui/material/Input";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


function Admin() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [updateTitle, setUpdateTitle] = useState('');
  const [updatePrice, setUpdatePrice] = useState('');
  const [updateDescription, setUpdateDescription] = useState('');
  const [updateCategory, setUpdateCategory] = useState('');
  const [updateImage, setUpdateImage] = useState('');
  const [rows, setRows] = useState([]);
  

  useEffect(() => {
    // fetch("https://fakestoreapi.com/products")
    fetch("/api/products")
      .then((res) => {
        return res.json();
      })
      .then((products) => {
        //setProducts(products.map(product => { return { id: product._id, ...product } }));
        setRows(products.map((product) => { return { isEditMode: false, id: product._id, ...product } }));
      });
  }, []);

  const addNewProduct = async () => {
    const res = await fetch("/api/products", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        price: price,
        description: description,
        category: category,
        image: image
      })
    })
    let content = await res.json();
    console.log(content)
    reset()
    //setProducts([{ id: content._id, ...content }, ...products])
    setRows([...rows, { id: content._id, ...content }])
  }

  const updateProduct = (product) => {
    fetch(`/api/product/${product._id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        ...product
      })
    })
  }

  const onToggleEditMode = (rowToEdit) => {
    setRows(state => {
      return rows.map(row => {
        if (row.id === rowToEdit.id) {
          return { ...row, isEditMode: !row.isEditMode };
        } else { // edit one row at a time
          return {...row, isEditMode: false}
        }
      });
    });
     setUpdateFields(rowToEdit)
  };

  const setUpdateFields=(row)=>{
    setUpdateTitle(row.title)
    setUpdateDescription(row.description)
    setUpdatePrice(row.price)
    setUpdateCategory(row.category)
    setUpdateImage(row.image)
  }

  const onToggleSave = (id) => {
    let product = rows.find(item => item.id === id);
    product = {...product, title: updateTitle, price: updatePrice, description: updateDescription,
      image: updateImage, category: updateCategory}
    setRows(state => {
      return rows.map(row => {
        if (row.id === id) {
          return { ...product, isEditMode: !row.isEditMode };
        }
        return row;
      });
    });
    //save to DB
    updateProduct({...product})
    
  }

  const onRevert = id => {
    setRows(state => {
      return rows.map(row => {
        if (row.id === id) {
          return { ...row, isEditMode: !row.isEditMode };
        }
        return row;
      });
    });
  };

  const onDelete=(id)=>{
    const res = fetch(`/api/product/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      }
    })
    setRows(rows.filter(row=>row._id!==id));
  }

  const reset=()=>{
    setTitle('');
    setDescription('');
    setCategory('');
    setImage('');
    setPrice('');
  }

  return (
    <div>
      <div style={{ height: 600, width: '100%', overflow: 'auto' }}>
        <Table sx={{ minWidth: 650, backgroundColor: '#f2eede' }} aria-label="caption table">
          <TableHead sx={{ position: 'sticky', top: '0px', background: 'antiquewhite'}}>
            <TableRow>
              <TableCell align="left" />
              <TableCell>Title</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Image</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row._id}>
                <TableCell>
                  {row.isEditMode ? (
                    <>
                      <IconButton
                        aria-label="done"
                        onClick={() => onToggleSave(row.id)}
                      >
                        <DoneIcon />
                      </IconButton>
                      <IconButton
                        aria-label="revert"
                        onClick={() => onRevert(row.id)}
                      >
                        <CancelIcon />
                      </IconButton>
                    </>
                  ) : (
                    <>
                    <IconButton
                      onClick={() => onToggleEditMode(row)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                    onClick={() => onDelete(row._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  </>
                  )}
                </TableCell>
                <TableCell align="left" >
                  {row.isEditMode ? (
                    <div>
                      <Input
                        value={updateTitle}
                        onChange={e => setUpdateTitle(e.target.value)}
                      /></div>
                  ) : (
                    row.title
                  )}
                </TableCell>
                <TableCell align="left" >
                  {row.isEditMode ? (
                    <div>
                      <Input
                        value={updatePrice}
                        onChange={e => setUpdatePrice(e.target.value)}
                      /></div>
                  ) : (
                    row.price
                  )}
                </TableCell>
                <TableCell align="left" >
                  {row.isEditMode ? (
                    <div>
                      <Input
                        value={updateDescription}
                        onChange={e => setUpdateDescription(e.target.value)}
                      /></div>
                  ) : (
                    row.description
                  )}
                </TableCell>
                <TableCell align="left" >
                  {row.isEditMode ? (
                    <div>
                      <Input
                        value={updateCategory}
                        onChange={e => setUpdateCategory(e.target.value)}
                      /></div>
                  ) : (
                    row.category
                  )}
                </TableCell>
                <TableCell align="left" >
                  {row.isEditMode ? (
                    <div>
                      <Input
                        value={updateImage}
                        onChange={e => setUpdateImage(e.target.value)}
                      /></div>
                  ) : (
                    row.image
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Box
      component="form"
      sx={{
        backgroundColor: '#b8d9ff',
      }}
      onSubmit={e => { e.preventDefault();console.log(title, price); addNewProduct(); }}
    >
      {/* <form onSubmit={e => { e.preventDefault(); console.log(title, price); addNewProduct() }}> */}
        <TextField
          required
          id="outlined-required"
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          required
          id="outlined-required"
          label="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <TextField
          required
          id="outlined-required"
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          required
          id="outlined-required"
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <TextField
          required
          id="outlined-required"
          label="Image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <Button type="submit" variant="contained">Add</Button>
      </Box>
    </div>
  )
}

export default Admin;