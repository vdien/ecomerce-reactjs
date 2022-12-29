import React from "react";
import "./Favourites.css";
import { useSelector, useDispatch } from "react-redux";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@mui/icons-material//FavoriteBorder";
import { Link } from "react-router-dom";

import { deleteFavouriteItemsToCart } from "../../redux/actions/FavouriteAction";
import MetaData from "../more/Metadata";
import Loading from "../more/loader";
import BottomTab from "../more/BottomTab";
import FavouriteItemsCard from "./FavouriteItemCard";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";

const Favourite = () => {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.productDetails);
  const { favouriteItems } = useSelector((state) => state.favourite);

  const deleteFavouriteItems = (id) => {
    dispatch(deleteFavouriteItemsToCart(id));
  };

  return (
    <>
      <Header />
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title="Favourites Items" />
          {favouriteItems.length === 0 ? (
            <div className="emptyCart">
              <RemoveShoppingCartIcon />
              <Typography>No Items In Favourites</Typography>
              <Link to="/products">View Products</Link>
              <BottomTab />
            </div>
          ) : (
            <>
              <div className="favouritesPage">
                {favouriteItems &&
                  favouriteItems.map((item) => (
                    <div className="favouritesContainer" key={item.product}>
                      <FavouriteItemsCard
                        item={item}
                        deleteFavouriteItems={deleteFavouriteItems}
                      />
                    </div>
                  ))}
              </div>
              <Footer />
              <BottomTab />
            </>
          )}
        </>
      )}
    </>
  );
};

export default Favourite;
