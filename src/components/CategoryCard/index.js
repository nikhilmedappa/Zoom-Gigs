import React from 'react';
import './style.css'




export default function CategoryCard(props) {

    return (
            
        <div className="category">
            <div className="category__image">
                <button onClick={(e) => props.categoryHandler(props.category._id, e)} style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer', outline: 'none'}}>
                    <img src={"https://super1233456.herokuapp.com/" + props.category.imagePath} alt={props.category.title} />
                </button>
            </div>
        </div>
    )
}

