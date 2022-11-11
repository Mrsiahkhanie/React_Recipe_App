import React from 'react';
import style from './recipe.module.css';

const Recipes = (props) => {
  const {title, calories, image, ingredients} = props;
  return (
    <div className={style.recipe}>
      <h1>{title}</h1>
      <ol>
        {ingredients.map((ingredient, index)=> (
          <li key={index} className={style.list}>{ingredient.text}</li>
        ))}
      </ol>
      <p>The Calories: {calories}</p>
      <img src={image} className={style.image}/>
    </div>
  );
}

export default Recipes;
