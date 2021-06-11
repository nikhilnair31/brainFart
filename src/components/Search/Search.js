import React, { useState, useEffect } from 'react';
import FilterDropdown from '../FilterDropdown/FilterDropdown';
import './Search.scss';

const Search = (props) => {
	const [openState, setOpenState] = useState(false);

    // useEffect(() => {
    //     console.log('props.tagList: ', props.tagList);
    // }, [props.tagList]);

    const handleSearchInputChange = event => {
        console.log(event.target.value);
        props.setSearchedIdea(event.target.value);
    }

    return (
        <div className="search">
            <img className="search_img" src='.\images\search_icon2.png' alt="search icon"/>
            <input className="search_input" type="text" placeholder="Search for ideas, users or tags" onChange={handleSearchInputChange}/>
            <img className="filter_img" src='.\images\filter_icon2.png' alt="filter icon" onClick={() => setOpenState(!openState)}/>
            {openState && <FilterDropdown fullfiltpost={props.fullfiltpost} tagList={props.tagList} setTagList={props.setTagList} tagStatusList={props.tagStatusList} setTagStatusList={props.setTagStatusList}/>}
        </div>
    );
}

export default Search;