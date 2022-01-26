import './Header.css'
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import { useState } from "react"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function Header({categories, onSelectCategory, onFilterPrice}) {

    const [value, setValue] = useState([0, 1000]);
    const [filter, setFilter] = useState('');

    const handleChange = (event, newValue) => {
        setValue(newValue);
        // send filter value
        onFilterPrice(newValue)
        //console.log(111, newValue)
      };

    return (
        <nav className="product-filter">
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel variant="outlined">Filter By</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        label="Filter By"
                        value={filter}
                        onChange={(e)=>{onSelectCategory(e.target.value); setFilter(e.target.value)}}
                    >
                        <MenuItem value="/">Clear</MenuItem>
                        {categories.map((category, index) => (
                            // <option key={index} value={category} >{category}</option>
                            <MenuItem key={index} value={category}>{category}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{ width: 200 ,padding: '0 20px;'}}>
                <Slider
                    getAriaLabel={() => 'Temperature range'}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    min={0}
                    max={1000}
                />
                {value[0]}$ - {value[1]}$
            </Box>
        </nav>
    )
}

export default Header;