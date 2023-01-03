import React, { useEffect } from "react";
import "./Home.css";
import Carousel from "react-material-ui-carousel";

import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../component/more/loader";
import Footer from "../../component/Layout/Footer";
import Header from "../../component/Layout/Header";
import MetaData from "../../component/more/Metadata";
import BottomTab from "../../component/more/BottomTab";
import { clearErrors, getProduct } from "../../redux/actions/ProductActions";
import ProductCard from "../../component/Products/ProductCard";

const Home = () => {
    const dispatch = useDispatch();
    const { products, error, loading } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(getProduct());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, error]);

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <MetaData title="Home" />
                    <Header />
                    {/* Carousel */}
                    <div className="banner">
                        <Carousel>
                            <img
                                style={{ opacity: 0.8 }}
                                src="https://nuochoangoisao.com/wp-content/uploads/2020/04/banner-nuoc-hoa-nam-bleu-chanel-2.jpg"
                                className="bgImg"
                                alt=""
                            />
                            <img
                                src={
                                    "https://nuochoangoisao.com/wp-content/uploads/2020/04/banner-nuoc-hoa-nam-bleu-chanel-2.jpg"
                                }
                                style={{ opacity: 0.8 }}
                                className="bgImg"
                                alt=""
                            />
                        </Carousel>
                        <div className="home__content">
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <h2
                                    style={{
                                        fontFamily: "Segoe Script",
                                        fontSize: "3em",
                                        fontWeight: "500",
                                    }}
                                >
                                    Buy 2 Get
                                </h2>
                                <span
                                    style={{
                                        padding: "10px",
                                        backgroundColor: "#fff",
                                        margin: "0px 10px",
                                        textAlign: "center",
                                        width: "150px",
                                        height: "40px",
                                        color: "#26c",
                                        fontFamily: "Segoe Script",
                                        fontSize: "2.4em",
                                        display: "flex",
                                        justifyContent: "center",
                                        lineHeight: ".7",
                                        alignItems: "center",
                                    }}
                                >
                                    1 Free
                                </span>
                            </div>
                            <div>
                                <h2
                                    style={{
                                        fontSize: "4.5em",
                                        fontFamily: "Poppins,sans-serif",
                                        color: "#fff",
                                    }}
                                >
                                    Fashionable
                                </h2>
                            </div>
                            <div>
                                <h2
                                    style={{
                                        fontSize: "4.5em",
                                        fontWeight: "400",
                                        fontFamily: "Poppins,sans-serif",
                                        color: "#fff",
                                        lineHeight: ".7",
                                    }}
                                >
                                    Collection
                                </h2>
                            </div>
                            <div>
                                <h2
                                    style={{
                                        fontWeight: "400",
                                        fontFamily: "Poppins,sans-serif",
                                        color: "#fff",
                                        fontSize: "1em",
                                        paddingTop: "10px",
                                    }}
                                >
                                    Get Free Shipping on all orders over $99.00
                                </h2>
                            </div>
                            <div>
                                <a href="#container">
                                    <button
                                        type="submit"
                                        style={{
                                            width: "auto",
                                            height: "50px",
                                            border: "none",
                                            background: "#e94560",
                                            margin: "10px 0",
                                            fontSize: "1.2vmax",
                                            color: "#fff",
                                            cursor: "pointer",
                                        }}
                                        className="Home__button"
                                    >
                                        SHOP NOW
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                    <section className="FeaturedProducts">
                        <h2 className="homeHeading">Featured Products</h2>
                        <div className="container--product" id="container">
                            {products &&
                                products.map((product) => (
                                    <ProductCard
                                        key={product._id}
                                        product={product}
                                    />
                                ))}
                        </div>
                    </section>
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
                    <Footer />
                    <BottomTab />
                </>
            )}
        </>
    );
};

export default Home;
