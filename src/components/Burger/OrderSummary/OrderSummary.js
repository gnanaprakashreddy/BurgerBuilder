import React, {Component}from 'react';

import Button from '../../UI/Button/Button'
import Aux from '../../../hoc/Auxi/Auxi'
class OrderSummary  extends Component{
    componentWillUpdate(){
        console.log('[Order Summary] will update');
    };
    render() {
        const ingredients = Object.keys(this.props.ingredients)
        .map(igkey  => {
        return (
                <li key = {igkey}>
                    <span style = {{textTransform:'capitalize'}}>{igkey}</span>: 
                    {this.props.ingredients[igkey]}
                </li>
            )
        })
        return (
            <Aux>
                <h5>Your OrderSummary</h5>
                <p>The delicious Burger with ingredients :</p>
                <ul>
                    {ingredients}
                </ul>
            <p><strong>Total Price : {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to CheckOut?</p>
                <Button btnType = "Danger" clicked = {this.props.deletebackdrop}>CANCEL</Button>
                <Button btnType = "Success" clicked = {this.props.continueCheckOut}>CONTINUE</Button>
            </Aux>
        )}
}
export default OrderSummary;