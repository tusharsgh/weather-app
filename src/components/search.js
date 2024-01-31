import React,{useState} from 'react'
import { AsyncPaginate } from "react-select-async-paginate";
import AsyncSelect from 'react-select/async';
function Search({onSearchChange}) {
    const [search, setSearch] = useState(null);


    const loadOptions = (inputValue) => {
        const url = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '434f41e4d2mshea26813ad9b1e6fp1b0622jsn661b1ceb7987',
                'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
            }
        }
        return fetch(
          `${url}?minPopulation=100000&namePrefix=${inputValue}`,
          options
        )
          .then((response) => response.json())
          .then((response) => {
            return {
              options: response.data.map((city) => {
                return {
                  value: `${city.latitude} ${city.longitude}`,
                  label: `${city.name}, ${city.countryCode}`,
                };
              }),
            };
          });
      };

    const handleOnChange = (searchData) => {
      onSearchChange(searchData);
        setSearch(searchData);
        
      };
      const customStyles = {
        placeholder: (defaultStyles) => ({
            
                ...defaultStyles,
                color: '#ffffff',
                maxwidth:'100px',
            
        }),

        control: (provided, state) => ({
            ...provided,
        
            borderRadius: '20px',
            border: '1px solid #FFFFFF',
            boxShadow: state.isFocused ? '0 0 0 1px #FFFFFF' : null,
            backgroundColor:'#088FFA',
            color: '#FFFFFF',
            whitespace: 'nowrap',
            minwidth:'100px'
   
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? '#62B8FC' : null,
            color: state.isFocused ? 'black' : null,
            midwidth:'100px'
        }),
    }
  return (


    <div>
      <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
      styles={customStyles}
    />

    <div>
        
    </div>
    </div>
  )
}

export default Search
