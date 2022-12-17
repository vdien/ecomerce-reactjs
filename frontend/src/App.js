import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Products/ProductDetails";
import LoginSignup from "./component/Authentication/LoginSignup";

function App() {
  return (
    <Router>
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
      </Switch>
    </Router>
  );
}

export default App;
