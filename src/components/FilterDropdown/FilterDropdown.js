import React, { useEffect, useState }  from 'react';
import './FilterDropdown.scss';

const FilterDropdown = (props) => {

    // useEffect(() => {
    //     var allTags = props.fullfiltpost.map(function(o){return o.post.tag}).filter(function(v,i,a) {
    //         return a.indexOf(v)===i
    //     });
    //     props.setTagList(allTags);
    //     console.log('allTags: ', allTags);
    // }, []);

    // const checkChanged = (checkTagText) => {
    //     console.log('checkChanged');
    //     var tagArray = props.tagList;
    //     var statArray = props.tagStatusList;
    //     console.log('og tagArray: ', tagArray);
    //     var tagIndex = tagArray.indexOf(checkTagText);
    //     if (tagIndex > -1) {
    //         statArray[tagIndex] = false;
    //         tagArray.splice(tagIndex, 1);
    //     }
    //     console.log('fin tagArray: ', tagArray);
    //     props.setTagList(tagArray);
    //     props.setTagStatusList(statArray);
    // }

    function ShellItem(props) {
        return (
            <div className="filt_menu_item">
                {props.children}
            </div>
        );
    }
    // function CheckItem(props) {
    //     return (
    //         <ShellItem >
    //             <input type="checkbox" onChange={(e) => checkChanged(props.children)} defaultChecked={defaultChecked}/>
    //             {props.children}
    //         </ShellItem>
    //     );
    // }

    return (
        <div className="filterdrop">
            {/* <form className="filt_menu">
                <p className="filt_menu_title">Tags</p>
                { 
                    props.tagList.map((tagname, id) => {
                        return <CheckItem key={id} >{tagname}</CheckItem>
                    })
                }
            </form> */}
            <form className="filt_menu">
                <p className="filt_menu_title">Timeline</p>
                <ShellItem >
                    <input type="radio" id="1" name="sort_rad" value="Recent First" defaultChecked onChange={()=>document.getElementById("pastcont").style.flexDirection = 'column'}/>
                    <label htmlFor="1">Recent First</label>
                </ShellItem>
                <ShellItem >
                    <input type="radio" id="2" name="sort_rad" value="Older First" onChange={()=>document.getElementById("pastcont").style.flexDirection = 'column-reverse'}/>
                    <label htmlFor="2">Older First</label>
                </ShellItem>
            </form>
        </div>
    );
}

export default FilterDropdown;