import React, { useState, useEffect } from 'react';
import FilterDropdown from '../FilterDropdown/FilterDropdown';
import './Search.scss';

const Search = (props) => {
    const [scrollTop, setScrollTop] = useState(0);
	const [openState, setOpenState] = useState(false);

    useEffect(() => {
        //console.log('useEffect');
        const onScroll = e => {
          console.log('onScroll');
        };
    }, [scrollTop]);

    const handleSearchInputChange = event => {
        console.log(event.target.value);
        props.setSearchedIdea(event.target.value);
    }

    return (
        <div className="search">
            <img className="search_img" src='.\images\search_icon2.png' alt="search icon"/>
            <input className="search_input" type="text" placeholder="Search IdeaHub" onChange={handleSearchInputChange}/>
            <img className="filter_img" src='.\images\filter_icon2.png' alt="filter icon" onClick={() => setOpenState(!openState)}/>
            {openState && <FilterDropdown fullfiltpost={props.fullfiltpost}/>}
        </div>
    );
}

export default Search;