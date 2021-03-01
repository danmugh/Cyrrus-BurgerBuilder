import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from "../../components/BuildControl/BuildControls";
import Modal from "../../UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
// import axios from "axios";
import Spinner from '../../UI/Spinner/Spinner';
import axios from "../../axios-orders";
import withErrorHandler from '../../hoc/WithErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions/actionTypes';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import burgerBuilderReducer from "../../store/Reducers/burgerBuilder";



export class BurgerBuilder extends Component {

    state = {
        purchasable: false,
        purchasing: false,
    }

    componentDidMount() {

        this.props.onInitIngredients()
    }

    updatePurchasableState (ingredients) {
        const sum = Object.keys(ingredients)
            .map( igKey => {
                // console.log(ingredients)
                return ingredients[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        // this.setState( { purchasable: sum > 0 } );
        return sum > 0
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({purchasing: true});
        } else {
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth')
        }
    }

    removeBackdropHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinue = () => {
        this.props.onInitPurchase()
        this.props.history.push('/checkout')

    }

    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updateIngredients = {
    //         ...this.state.ingredients
    //     };
    //
    //     // console.log(updateIngredients)
    //     updateIngredients[type] = updatedCount;
    //     // console.log(updateIngredients)
    //
    //     const priceAddition = INGREDIENTS_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //
    //     this.setState({
    //         ingredients: updateIngredients,
    //         totalPrice: newPrice
    //     })
    //     this.updatePurchasableState(updateIngredients)
    // }

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     if (oldCount <= 0) {
    //         return;
    //     }
    //     // console.log(oldCount)
    //     const updateCount = oldCount - 1;
    //     const updateIngredients = {
    //         ...this.state.ingredients
    //     };
    //
    //     updateIngredients[type] = updateCount;
    //     // console.log(updateIngredients[type])
    //
    //     const priceDeduction = INGREDIENTS_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDeduction;
    //
    //     this.setState({
    //         ingredients: updateIngredients,
    //         totalPrice: newPrice
    //     })
    //     this.updatePurchasableState(updateIngredients)
    //
    // }

    render() {
        const disabledInfo = {
            ...this.props.ings
        }
        // console.log(disabledInfo)

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
            // console.log(disabledInfo[key])
        }

        let orderSummary = null

        // let burger = this.props.error ? <p style={{textAlign: 'center'}}>Ingredients can't be loaded!</p> : <Spinner />
        let burger =  <Spinner />

        if (this.props.error) {
            burger = <p style={{textAlign: 'center'}}>Ingredients can't be loaded!</p>
        }

        if ( this.props.ings ) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls
                        ingredientRemove={this.props.onIngredientRemoved}
                        ingredientAdded={this.props.onIngredientAdded}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchasableState(this.props.ings)}
                        price={this.props.price}
                        isAuth={this.props.isAuthenticated}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            )

            orderSummary = <OrderSummary ingredients={this.props.ings}
                                         // price={this.props.price.toFixed(2)}
                                         price={this.props.price}
                                         purchaseCanceled={this.removeBackdropHandler}
                                         purchaseContinued={this.purchaseContinue}
            />
        }

        return(
            <Aux>
                <Modal show={this.state.purchasing} removeBackdrop={this.removeBackdropHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}


const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null

    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purshaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( BurgerBuilder, axios ));