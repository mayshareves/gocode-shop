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
import CancelIcon from '@mui/icons-material/Cancel';
import Input from "@mui/material/Input";


function Admin() {
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState([]);
  const [rows, setRows] = useState([]);
  const [previous, setPrevious] = useState({});

  useEffect(() => {
    // fetch("https://fakestoreapi.com/products")
    fetch("/api/products")
      .then((res) => {
        return res.json();
      })
      .then((products) => {
        setProducts(products.map(product => { return { id: product._id, ...product } }));
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
        price: 9.85,
        description: "rose",
        category: "women's clothing",
        image: "https://www.lovingly.com/wp-content/uploads/2019/09/red-rose-on-black-background-649x1024.jpg"
      })
    })
    let content = await res.json();
    console.log(content)
    setProducts([{ id: content._id, ...content }, ...products])
    setRows([...products, { id: content._id, ...content }])
  }

  const updateProduct = async (product) => {
    const res = await fetch(`/api/product/${product._id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        ...product
      })
    })
    let content = await res.json();
  }

  const onToggleEditMode = id => {
    setRows(state => {
      return rows.map(row => {
        if (row.id === id) {
          return { ...row, isEditMode: !row.isEditMode };
        }
        return row;
      });
    });
  };

  const onToggleSave = (id) => {
    
    setRows(state => {
      return rows.map(row => {
        if (row.id === id) {
          return { ...row, isEditMode: !row.isEditMode };
        }
        return row;
      });
    });

    console.log(rows.find(item => item.id === id))
    let product = rows.find(item => item.id === id);
    //save to DB
    updateProduct(product)
  }

  const onRevert = id => {
    // const newRows = rows.map(row => {
    //   if (row.id === id) {
    //     return previous[id] ? previous[id] : row;
    //   }
    //   return row;
    // });
    // setRows(newRows);
    // setPrevious(state => {
    //   delete state[id];
    //   return state;
    // });
    // onToggleEditMode(id);
  };


  const CustomTableCell = ({ row, name, onChange }) => {
    const { isEditMode } = row;
    return (
      <TableCell align="left" >
        {isEditMode ? (
          <div>
        <input value={row[name]} onChange={(e) => onChange(e, row)}></input>

          <Input
            value={row[name]}
            name={name}
            // TODO try save different way
            onChange={e => onChange(e, row)}
          /></div>
        ) : (
          row[name]
        )}
      </TableCell>
    );
  };
  const onChange = (e, row) => {
    console.log(1, previous)
    if (!previous[row.id]) {
      setPrevious(state => ({ ...state, [row.id]: row }));
    }
    const value = e.target.value;
    const name = e.target.name;
    const { id } = row;
    const newRows = rows.map(row => {
      if (row.id === id) {
        return { ...row, [name]: value };
      }
      return row;
    });
    setRows(newRows);
  };

  return (
    <div>
      <div style={{ height: 600, width: '100%', overflow: 'auto' }}>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <caption>A basic table example with a caption</caption>
          <TableHead>
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
                    <IconButton
                      onClick={() => onToggleEditMode(row.id)}
                    >
                      <EditIcon />
                    </IconButton>
                  )}
                </TableCell>
                <CustomTableCell {...{ row, name: "title", onChange }}>{row.title}</CustomTableCell>
                <CustomTableCell {...{ row, name: "price", onChange }}>{row.price}</CustomTableCell>
                <CustomTableCell {...{ row, name: "description", onChange }}>{row.description}</CustomTableCell>
                <CustomTableCell {...{ row, name: "category", onChange }}>{row.category}</CustomTableCell>
                <CustomTableCell {...{ row, name: "image", onChange }}>{row.image}</CustomTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <form onSubmit={e => { e.preventDefault(); console.log(title); addNewProduct() }}>
        <input value={title} onChange={(e) => setTitle(e.target.value)}></input>
        <input type="submit" value="Click" />
      </form>
    </div>
  )
  //https://codesandbox.io/s/material-ui-editable-tables-wsp0c?file=/src/index.js:1185-1200 
}

export default Admin;