import React, { Fragment, useEffect } from "react";

import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import "./OrderDetail.css";
import { ToastContainer, toast } from "react-toastify";
import { getOrderDetails } from "../../redux/actions/OrderAction";
import Loading from "../more/loader";
import MetaData from "../more/Metadata";
import { clearErrors } from "../../redux/actions/ProductActions";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import BottomTab from "../more/BottomTab";

const OrderDetail = ({ match }) => {
    const { order, error, loading } = useSelector(
        (state) => state.myOrderDetails
    );

    const dispatch = useDispatch();

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        dispatch(getOrderDetails(match.params.id));
    }, [dispatch, error, match.params.id]);

    return (
        <Fragment>
            <MetaData title="Process Order" />
            <Header />
            {loading ? (
                <Loading />
            ) : (
                <div
                    className="confirmOrderPage"
                    style={{
                        display:
                            order.orderStatus === "Delivered"
                                ? "block"
                                : "grid",
                    }}
                >
                    <div>
                        <div className="confirmshippingArea">
                            <Typography>Shipping Info</Typography>
                            <div className="orderDetailsContainerBox">
                                <div>
                                    <span>
                                        Name: {order.user && order.user.name}
                                    </span>
                                </div>
                                <div>
                                    <span>
                                        Phone: 0
                                        {order.shippingInfo &&
                                            order.shippingInfo.phoneNo}
                                    </span>
                                </div>
                                <div>
                                    <span>
                                        Address:{" "}
                                        {order.shippingInfo &&
                                            `${order.shippingInfo.address}, ${order.shippingInfo.state}`}
                                    </span>
                                </div>
                            </div>

                            <Typography>Payment</Typography>
                            <div className="orderDetailsContainerBox">
                                <div>
                                    <p
                                        style={{
                                            color: "green",
                                        }}
                                    >
                                        PAID
                                    </p>
                                </div>

                                <div>
                                    <span>
                                        Amount: $
                                        {order.totalPrice && order.totalPrice}
                                    </span>
                                </div>
                            </div>

                            <Typography>Order Status</Typography>
                            <div className="orderDetailsContainerBox">
                                <div>
                                    <p
                                        className={
                                            order.orderStatus &&
                                            order.orderStatus === "Delivered"
                                                ? "greenColor"
                                                : "redColor"
                                        }
                                    >
                                        {order.orderStatus && order.orderStatus}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="confirmCartItems">
                            <Typography>Your Cart Items:</Typography>
                            <div className="confirmCartItemsContainer">
                                {order.orderItems &&
                                    order.orderItems.map((item) => (
                                        <div key={item.product}>
                                            <img
                                                src={item.image}
                                                alt="Product"
                                            />
                                            <Link
                                                to={`/product/${item.product}`}
                                            >
                                                {item.name}
                                            </Link>{" "}
                                            <span>
                                                {item.quantity} X ${item.price}{" "}
                                                ={" "}
                                                <b>
                                                    $
                                                    {item.price * item.quantity}
                                                </b>
                                            </span>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <Footer />
            <BottomTab />
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </Fragment>
    );
};

export default OrderDetail;
