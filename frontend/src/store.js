import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
    allUsersReducer,
    forgotPasswordReducer,
    profileReducer,
    userDetailsReducer,
    userReducer,
} from "./redux/reducers/userReducer";
import {
    productsReducer,
    productDetailsReducer,
    newReviewReducer,
    newProductReducer,
    deleteProductReducer,
    deleteReviewReducer,
    productReviewsReducer,
} from "./redux/reducers/ProductReducer";
import { cartReducer } from "./redux/reducers/CartReducer";
import { favouriteReducer } from "./redux/reducers/FavouriteReducer";
import {
    allOrdersReducer,
    myOrdersReducer,
    newOrderReducer,
    orderDetailsReducer,
    orderReducer,
} from "./redux/reducers/OrderReducer";
const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    cart: cartReducer,
    favourite: favouriteReducer,
    order: newOrderReducer,
    myOrder: myOrdersReducer,
    myOrderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
    createProduct: newProductReducer,
    deleteProduct: deleteProductReducer,
    AllOrders: allOrdersReducer,
    deleteOrder: orderReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    deleteReview: deleteReviewReducer,
    productReviews: productReviewsReducer,
    forgotPassword: forgotPasswordReducer,
});

let initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems") ?
            JSON.parse(localStorage.getItem("cartItems")) :
            [],

        shippingInfo: localStorage.getItem("shippingInfo") ?
            JSON.parse(localStorage.getItem("shippingInfo")) :
            {},
    },
    favourite: {
        favouriteItems: localStorage.getItem("favouriteItems") ?
            JSON.parse(localStorage.getItem("favouriteItems")) :
            [],
    },
};

const middleWare = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;