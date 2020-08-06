import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';
const Burger = (props) => {
    let transfromedIngredients = Object.keys(props.ingredients)
    .map(inKey => {
        return [...Array(props.ingredients[inKey])].map((_ ,i ) => {
           // console.log([...Array(props.ingredients[inKey])], inKey,i)
            return <BurgerIngredients key={inKey + i} type={inKey}/>
        });
    }).reduce((arr,el) => {
        return arr.concat(el)
    },[]);
    if((transfromedIngredients).length=== 0){
        transfromedIngredients = <p>Please Add Ingredients</p>
    }
 return (
    <div className = {classes.Burger}>
        <BurgerIngredients type='bread-top'/>
        {transfromedIngredients}
        <BurgerIngredients type='bread-bottom'/>
    </div>
 );
} 
export default Burger;