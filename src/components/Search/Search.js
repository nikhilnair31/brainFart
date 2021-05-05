import React from 'react';
import './Search.scss';

const Search = () => (
    <div className="search">
        <img className="search_img" src='.\images\search_icon2.png' alt="myFace"/>
        <input className="search_input" type="text" placeholder="Search IdeaHub"/>
    </div>
);

export default Search;