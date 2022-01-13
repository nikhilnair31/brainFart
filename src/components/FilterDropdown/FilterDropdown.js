import React, { useEffect, useState }  from 'react';
import './FilterDropdown.scss';

const FilterDropdown = (props) => {

    // useEffect(() => {
    //     var allTags = props.fullfiltpost.map(function(o){return o.post.tag}).filter(function(v,i,a) {
    //         return a.indexOf(v)===i
    //     });
    //     props.setTagList(allTags);
    //   //console.log('allTags: ', allTags);
    // }, []);

    // const checkChanged = (checkTagText) => {
    //   //console.log('checkChanged');
    //     var tagArray = props.tagList;
    //     var statArray = props.tagStatusList;
    //   //console.log('og tagArray: ', tagArray);
    //     var tagIndex = tagArray.indexOf(checkTagText);
    //     if (tagIndex > -1) {
    //         statArray[tagIndex] = false;
    //         tagArray.splice(tagIndex, 1);
    //     }
    //   //console.log('fin tagArray: ', tagArray);
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

    function changeSortDir(dir){
        document.getElementById("pastcont").style.flexDirection = dir;
    }
    function mostUpvotedPosts(dir){
        document.getElementById("pastcont").style.flexDirection = dir;
    }
    function mostDownvotedPosts(dir){
        document.getElementById("pastcont").style.flexDirection = dir;
    }

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
                <p className="filt_menu_title">Sort Timeline</p>
                <ShellItem >
                    {/* <input type="radio" id="1" name="sort_rad" value="Recent First" onChange={(e)=>changeSortDir('column')} defaultChecked/> */}
                    <label htmlFor="1" className="dir_sort" id="nor_sort" onClick={(e)=>mostUpvotedPosts('column')}>Most Upvoted</label>
                </ShellItem>
                <ShellItem >
                    {/* <input type="radio" id="2" name="sort_rad" value="Older First" onChange={(e)=>changeSortDir('column-reverse')}/> */}
                    <label htmlFor="2" className="dir_sort" id="rev_sort" onClick={(e)=>mostDownvotedPosts ('column-reverse')}>Most Downvoted</label>
                </ShellItem>
                <ShellItem >
                    {/* <input type="radio" id="1" name="sort_rad" value="Recent First" onChange={(e)=>changeSortDir('column')} defaultChecked/> */}
                    <label htmlFor="1" className="dir_sort" id="nor_sort" onClick={(e)=>changeSortDir('column')}>Recent First</label>
                </ShellItem>
                <ShellItem >
                    {/* <input type="radio" id="2" name="sort_rad" value="Older First" onChange={(e)=>changeSortDir('column-reverse')}/> */}
                    <label htmlFor="2" className="dir_sort" id="rev_sort" onClick={(e)=>changeSortDir('column-reverse')}>Older First</label>
                </ShellItem>
            </form>
        </div>
    );
}

export default FilterDropdown;