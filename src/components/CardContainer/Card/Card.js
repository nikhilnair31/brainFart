import React from 'react';
import './Card.scss';

const Card = (props) => {
    return props.full_data.map(function(post) {
        return (
            <div className="card" key={post.utc}>
                <h2 className="idea_text" >{post.idea}</h2>
                <p className="user_id_text" >user_id: {post.user_id}</p>
                <p className="upvotes_text" >upvotes: {post.upvotes}</p>
            </div>
        );
    });
}

export default Card;