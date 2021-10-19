import './Header.css'
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import { useState } from "react"


function Header({categories, onSelectCategory, onFilterPrice}) {

    const [value, setValue] = useState([0, 1000]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        // send filter value
        onFilterPrice(newValue)
        //console.log(111, newValue)
      };

    return (
        <nav className="product-filter">
            <h1>Products</h1> 
            <div className="sort">
                <div className="collection-sort">
                    <label>Filter by:</label>
                    <select onChange={(e)=>onSelectCategory(e.target.value)}>
                        <option value="/">Select</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category} >{category}</option>
                        ))}
                    </select>
                </div>

                <div className="collection-sort">
                    <label>Sort by:</label>
                    <select>
                    <option value="/">Featured</option>
                    <option value="/">Best Selling</option>
                    <option value="/">Alphabetically, A-Z</option>
                    <option value="/">Alphabetically, Z-A</option>
                    <option value="/">Price, low to high</option>
                    <option value="/">Price, high to low</option>
                    <option value="/">Date, new to old</option>
                    <option value="/">Date, old to new</option>
                    </select>
                </div>
            </div>
            <Box sx={{ width: 200 ,padding: '0 20px;'}}>
                <Slider
                    getAriaLabel={() => 'Temperature range'}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    min={0}
                    max={1000}
                />
                {value[0]} - {value[1]}
            </Box>
        </nav>
    )
}

export default Header;