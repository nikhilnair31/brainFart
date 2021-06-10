import React, { useEffect, useState }  from 'react';
import './FilterDropdown.scss';

const FilterDropdown = (props) => {
	const [tagList, setTagList] = useState([]);

    useEffect(() => {
        var allTags = props.fullfiltpost.map(function(o){return o.post.tag}).filter(function(v,i,a) {
            return a.indexOf(v)===i
        });
        allTags = allTags.slice(0, -1);
        setTagList(allTags);
        console.log('allTags: ', allTags);
    }, []);

    function ShellItem(props) {
        return (
            <div className="filt_menu_item">
                {props.children}
            </div>
        );
    }
    function CheckItem(props) {
        return (
            <ShellItem >
                <input type="checkbox" />
                {props.children}
            </ShellItem>
        );
    }

    return (
        <div className="filterdrop">
            <form className="filt_menu_item">
                <p className="filt_menu_title">Tags</p>
                { 
                    tagList.map((tagname, id) => {
                        return <CheckItem key={id} >{tagname}</CheckItem>
                    })
                }
            </form>
            <form className="filt_menu_item">
                <p className="filt_menu_title">Timeline</p>
                <input type="radio" id="1" name="sort_rad" value="Recent First" checked="checked" onChange={()=>document.getElementById("pastcont").style.flexDirection = 'column'}/>
                <label htmlFor="1">Recent First</label>
                <input type="radio" id="2" name="sort_rad" value="Older First" onChange={()=>document.getElementById("pastcont").style.flexDirection = 'column-reverse'}/>
                <label htmlFor="2">Older First</label>
            </form>
        </div>
    );
}

export default FilterDropdown;