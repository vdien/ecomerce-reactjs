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
import Dashboard from "./component/Admin/Dashboard";
import UpdateOrder from "./component/Admin/UpdateOrder";
import CreateProduct from "./component/Admin/CreateProduct";
import AllProducts from "./component/Admin/AllProducts";
import EditProduct from "./component/Admin/EditProduct";
import AllOrder from "./component/Admin/AllOrder";
import AllUsers from "./component/Admin/AllUsers";
import UpdateUser from "./component/Admin/UpdateUser";
import AllReviews from "./component/Admin/AllReviews";

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
        <Route exact path="/" component={Home} />
        <Route exact path="/product/:id" component={ProductDetails} />
        <Route exact path="/login" component={LoginSignup} />
        <Route exact path="/about" component={About} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/products/:keyword" component={Products} />
        <Route exact path="/support" component={Support} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/favourites" component={Favourite} />
        <ProtectedRoute exact path="/shipping" component={Shipping} />
        <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />
        <ProtectedRoute exact path="/me" component={Profile} />
        <ProtectedRoute exact path="/me/update" component={UpdatePassword} />
        <ProtectedRoute exact path="/me/update/info" component={EditProfile} />
        <ProtectedRoute exact path="/success" component={Success} />
        <ProtectedRoute exact path="/orders" component={MyOrder} />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/dashboard"
          component={Dashboard}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/product"
          component={CreateProduct}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/products"
          component={AllProducts}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/edit/product/:id"
          component={EditProduct}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/orders"
          component={AllOrder}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/order/:id"
          component={UpdateOrder}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/users"
          component={AllUsers}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/user/:id"
          component={UpdateUser}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/reviews"
          component={AllReviews}
        />
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
