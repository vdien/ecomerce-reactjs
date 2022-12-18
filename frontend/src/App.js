import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import WebFont from "webfontloader";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Products/ProductDetails";
import LoginSignup from "./component/Authentication/LoginSignup";
import { loadUser } from "./actions/userAction";
import store from "./store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import UserData from "./more/UserData";
import About from "./component/Pages/About";
import ProtectedRoute from "./route/ProtectedRoute";
import Profile from "./component/user/Profile";
import UpdatePassword from "./component/user/UpdatePassword";
import EditProfile from "./component/user/EditProfile";
import Products from "./component/Products/Products";
import Search from "./component/Products/Search";
function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      {isAuthenticated && <UserData user={user} />}
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>{" "}
        <Route exact path="/product/:id">
          <ProductDetails />
        </Route>{" "}
        <Route exact path="/login">
          <LoginSignup />
        </Route>{" "}
        <Route exact path="/about">
          <About />
        </Route>{" "}
        <Route exact path="/products">
          <Products />
        </Route>{" "}
        <Route exact path="/search">
          <Search />
        </Route>
        <Route exact path="/products/:keyword">
          <Products />
        </Route>
        <ProtectedRoute exact path="/me">
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute exact path="/me/update">
          <UpdatePassword />
        </ProtectedRoute>
        <ProtectedRoute exact path="/me/update/info">
          <EditProfile />
        </ProtectedRoute>
      </Switch>{" "}
    </Router>
  );
}

export default App;
