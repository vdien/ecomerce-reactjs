import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import WebFont from "webfontloader";
import Home from "./component/Pages/Home/Home";
import ProductDetails from "./component/Pages/ProductDetail/ProductDetails";
import LoginSignup from "./component/Pages/LoginSignup/LoginSignup";
import { loadUser } from "./redux/actions/userAction";
import store from "./store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import About from "./component/Pages/About/About";
import ProtectedRoute from "./route/ProtectedRoute";
import Profile from "./component/user/Profile";
import UpdatePassword from "./component/user/UpdatePassword";
import EditProfile from "./component/user/EditProfile";
import Products from "./component/Pages/Products/Products";
import Search from "./component/Products/Search";
import UserData from "./component/more/UserData";
import Support from "./component/more/Support";
import Cart from "./component/Pages/Cart/Cart";
import Favourite from "./component/Cart/Favourites";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOder";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Payment from "./component/Cart/Payment";
import Success from "./component/Cart/Success";
import MyOrder from "./component/user/MyOrder";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v2/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  return (
    <Router>
      {isAuthenticated && <UserData user={user} />}
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute exact path="/process/payment">
            <Payment />
          </ProtectedRoute>
        </Elements>
      )}
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/product/:id">
          <ProductDetails />
        </Route>
        <Route exact path="/login">
          <LoginSignup />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/products">
          <Products />
        </Route>
        <Route exact path="/search">
          <Search />
        </Route>
        <Route exact path="/products/:keyword">
          <Products />
        </Route>
        <Route exact path="/support">
          <Support />
        </Route>
        <Route exact path="/cart">
          <Cart />
        </Route>
        <Route exact path="/favourites">
          <Favourite />
        </Route>
        <Route exact path="/shipping">
          <Shipping />
        </Route>
        <ProtectedRoute exact path="/order/confirm">
          <ConfirmOrder />
        </ProtectedRoute>
        <ProtectedRoute exact path="/success">
          <Success />
        </ProtectedRoute>
        <ProtectedRoute exact path="/orders">
          <MyOrder />
        </ProtectedRoute>
        <ProtectedRoute exact path="/me">
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute exact path="/me/update">
          <UpdatePassword />
        </ProtectedRoute>
        <ProtectedRoute exact path="/me/update/info">
          <EditProfile />
        </ProtectedRoute>
        <ProtectedRoute exact path="/me/update/info">
          <EditProfile />
        </ProtectedRoute>
        <Route
          exact
          path={
            window.location.pathname === "/process/payment" ? null : "/home"
          }
        ></Route>
      </Switch>
    </Router>
  );
}

export default App;
