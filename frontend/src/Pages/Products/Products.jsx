import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Pagination from "react-js-pagination";
import "./Products.css";
import Typography from "@material-ui/core/Typography";
import Loading from "../../component/more/loader";
import MetaData from "../../component/more/Metadata";
import Footer from "../../component/Layout/Footer";
import { toast, ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";

import { clearErrors, getProduct } from "../../redux/actions/ProductActions";
import ProductCard from "../../component/Products/ProductCard";
import Header from "../../component/Layout/Header";

const Products = () => {
    const { keyword } = useParams();
    const categories = [
        "Dior",
        "Versace",
        "Lacoste",
        "Chanel",
        "Gucci",
        "Clavin Klein",
    ];
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);

    const [category, setCategory] = useState("");

    const { products, loading, error, productsCount, resultPerPage } =
        useSelector((state) => state.products);

    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    };

    useEffect(() => {
        if (error) {
            toast(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct(keyword, currentPage, category));
    }, [dispatch, keyword, currentPage, category, error]);

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <MetaData title="Products" />
                    <Header />
                    <div
                        className="Product"
                        style={{
                            backgroundColor: "#f6f9fc",
                        }}
                    >
                        <div className="container">
                            {products.length === 0 ? (
                                ""
                            ) : (
                                <h2
                                    style={{
                                        textAlign: "center",
                                        borderBottom:
                                            "1px solid rgba(21,21,21,0.5)",
                                        width: "20vmax",
                                        fontSize: "1.4vmax",
                                        fontFamily: "Poppins,sans-serif",
                                        margin: "3vmax auto",
                                        color: "rgb(0, 0, 0, 0.7)",
                                    }}
                                >
                                    Products
                                </h2>
                            )}
                            <div
                                className="sidebar__product"
                                style={{
                                    display: "flex",
                                    flex: 1,
                                }}
                            >
                                <div
                                    className="sidebar__products"
                                    style={{
                                        backgroundColor: "#fff",
                                        boxShadow:
                                            " rgb(43 52 69 / 10%) 0px 4px 16px",
                                        borderRadius: "5px",
                                        margin: "1vmax",
                                        flex: ".177",
                                    }}
                                >
                                    <ul className="categoryBox">
                                        <li
                                            className="category-link"
                                            key={category}
                                            onClick={() => setCategory("")}
                                            type="checkbox"
                                        >
                                            Home
                                        </li>
                                        {categories.map((category) => (
                                            <li
                                                className="category-link"
                                                key={category}
                                                onClick={() =>
                                                    setCategory(category)
                                                }
                                                type="checkbox"
                                            >
                                                {category}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {products.length === 0 ? (
                                    <span
                                        style={{
                                            display: "block",
                                            padding: "30px 0",
                                            fontSize: "1.5rem",
                                            flex: ".9",
                                            textAlign: "center",
                                        }}
                                    >
                                        No Product Found ....
                                    </span>
                                ) : (
                                    <div
                                        className="products"
                                        style={{
                                            display: "flex",
                                            flexWrap: "wrap",
                                            justifyContent: "center",
                                            flex: ".9",
                                        }}
                                    >
                                        {products &&
                                            products.map((product) => (
                                                <ProductCard
                                                    key={product.id}
                                                    product={product}
                                                />
                                            ))}
                                    </div>
                                )}
                            </div>

                            <div
                                className="pagination__box"
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    margin: "6vmax",
                                }}
                            >
                                <Pagination
                                    activePage={currentPage}
                                    itemsCountPerPage={resultPerPage}
                                    totalItemsCount={productsCount}
                                    onChange={setCurrentPageNo}
                                    nextPageText="Next"
                                    prevPageText="Prev"
                                    firstPageText="First"
                                    lastPageText="Last"
                                    itemClass="page-item"
                                    linkClass="page-link"
                                    activeClass="pageItemActive"
                                    activeLinkClass="pageLinkActive"
                                />
                            </div>
                        </div>
                    </div>
                    <Footer />
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
                </>
            )}
        </>
    );
};

export default Products;
