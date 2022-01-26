import './App.css';

import React from "react"
// import Button from './Button';
import { useState } from "react";

import MyContext from './MyContext';
//https://mui.com/getting-started/usage/

// https://gocode-shop-noam.herokuapp.com/

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import ProductsPage from './pages/Products'
import ProductPage from './pages/product';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Drawer from '@mui/material/Drawer';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Cart from './components/Cart/Cart';
import { Link } from 'react-router-dom';
import AdminPage from './components/Admin/Admin'

function App() {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [productsInCart, setProductsInCart] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false)
  const isMenuOpen = Boolean(anchorEl);
  const menuId = 'primary-search-account-menu';

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}><Link to={`/admin`}>Admin</Link></MenuItem>
      <MenuItem onClick={handleMenuClose}><Link to={`/products`}>Products</Link></MenuItem>
    </Menu>
  );


  return (
    <Router>
      <MyContext.Provider value={[productsInCart, setProductsInCart]}>
        <div className="App">
          {/* App bar */}
          <Box sx={{ flexGrow: 1 }}>
            {renderMenu}
            <AppBar position="static">
              <Toolbar>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  My Shop
                </Typography>
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                  <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                    onClick={()=>{setOpenDrawer(true)}}
                  >
                    <Badge badgeContent={productsInCart.length} color="error">
                      <ShoppingCartIcon />
                    </Badge>
                  </IconButton>
                  <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={'primary-search-account-menu'}
                    aria-haspopup="true"
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                </Box>
              </Toolbar>
            </AppBar>
          </Box>
          <Switch>         
              <Route path="/products">
              <ProductsPage></ProductsPage>
              </Route>
              <Route path="/product/:id">
              <ProductPage></ProductPage>
              </Route>
              <Route path="/admin">
              <AdminPage></AdminPage>
              </Route>
              <Route path="/">
                <ProductsPage/>
              </Route>
          </Switch>
          <Drawer
            anchor={'right'}
            open={openDrawer}
            onClose={()=>{console.log(111);setOpenDrawer(false)}}
          >
            <Cart />
          </Drawer>
        </div>
      </MyContext.Provider>
    </Router>
 
  );
}

export default App;
