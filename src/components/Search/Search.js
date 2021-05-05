import React from 'react';
import './Search.scss';

const Search = ({onSearch}) => (
    <div className="search">
        <img className="search_img" src='.\images\search_icon2.png' alt="myFace"/>
        <input className="search_input" type="text" onChange={onSearch} placeholder="Search for ideas"/>
    </div>
);

export default Search;