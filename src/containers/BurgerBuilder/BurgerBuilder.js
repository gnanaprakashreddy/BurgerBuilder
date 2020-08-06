import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Aux from '../../hoc/Auxi/Auxi';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
const INGREDIENTS_PRICE = {
    salad : 0.5,
    meat : 1.5,
    bacon : 0.7,
    cheese : 0.8
}
class BurgerBuilder extends Component {
    state = {
        ingredients : null,
        totalPrice  :  4,
        purchasable : false,
        purchasing : false,
        loading: false,
        error : false
    }
    componentDidMount(){
        axios.get('/ingredients.json')
        .then(response=>{
            this.setState({ingredients : response.data})
        })
        .catch(err => {
            this.setState({error : err})
        });
    }
    updatePurchaseable (ingredients) {
        const sum = Object.keys(ingredients).map( Inkey =>{
                return ingredients[Inkey]
            }).reduce((sum,el) => {
                return sum+el
            },0);
        this.setState({purchasable : sum > 0})
    }
    purchaseHandler = () => {
        this.setState({purchasing:true})
    }
    addIngredients = (type) => {
        const oldCount = this.state.ingredients[type]
        const newCount = oldCount + 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = newCount;
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + INGREDIENTS_PRICE[type];
        //console.log(newPrice)
        this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
        //console.log(this.state.totalPrice)
        this.updatePurchaseable(updatedIngredients);
      
    }
    deletebackdrop = () => {
        this.setState({purchasing:false})
    }

    continueCheckOut = () =>  {
        this.setState({loading: true})
        const orders ={
            ingredients : this.state.ingredients,
            Price:this.state.totalPrice,
            Name:"Gnana Prakash Reddy",
            address : {
                street:'Texas',
                country:"INDIA"
            },
            Email: "breddyprakash@gmail.com",
            PhoneNo: "1234567890"
        }
        axios.post('/orders.json', orders).then(response => {
            this.setState({loading:false})
            this.setState({purchasing : false})
        }).catch(error =>{
            this.setState({loading:false})   
            this.setState({purchasing : false})
        })
    }
    removeIngredients = (type) => {
        const oldCount = this.state.ingredients[type]
        const newCount = oldCount > 0 ? oldCount - 1: 0;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = newCount;
        const oldPrice = this.state.totalPrice;
        const newPrice = oldCount > 0? oldPrice - INGREDIENTS_PRICE[type]: oldPrice;
        this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
        this.updatePurchaseable(updatedIngredients);
    }
   
    render() {
        let orderSummary = null;
       
        const disabled = {...this.state.ingredients}
        for(let key in disabled)
        {
            disabled[key] = disabled[key]<=0;
            //console.log(disabled[key])
        }   
        let burgerIngerdients= this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;
        if(this.state.ingredients){
            burgerIngerdients = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BurgerControls 
                        ingredientsAdded={this.addIngredients} 
                        ingredientsRemoved={this.removeIngredients}
                        disabledInfo = {disabled}
                        price={this.state.totalPrice}
                        purchaseHandler = {this.purchaseHandler}
                        purchasable = {this.state.purchasable}/>
                </Aux>
            );
            orderSummary = 
            <OrderSummary price = {this.state.totalPrice} ingredients={this.state.ingredients} 
                deletebackdrop = {this.deletebackdrop} 
                continueCheckOut = {this.continueCheckOut}/>
        }
        if(this.state.loading)
            orderSummary= <Spinner />
        return (
             <Aux>
                 <Modal show={this.state.purchasing} deletebackdrop = {this.deletebackdrop}>
                   {orderSummary}
                 </Modal> 
                    {burgerIngerdients}    
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder,axios) ;