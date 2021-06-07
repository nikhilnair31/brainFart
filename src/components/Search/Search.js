import React from 'react';
import './Search.scss';

const Search = (props) => {
    const handleSearchInputChange = event => {
        // console.log(event.target.value);
        props.setSearchedIdea(event.target.value);
    }

    return (
        <div className="search">
            <img className="search_img" src='.\images\search_icon2.png' alt="search icon"/>
            <input className="search_input" type="text" placeholder="Search IdeaHub" onChange={handleSearchInputChange}/>
            <img className="filter_img" src='.\images\filter_icon.png' alt="filter icon"/>
        </div>
    );
}

export default Search;