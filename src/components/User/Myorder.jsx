import React, { useEffect, useState } from "react";
import "../../styles/User/myorder.css";
import { useNavigate } from "react-router";
import { makeApi } from "../../api/callApi.tsx";
import { Link } from "react-router-dom";
import UserProfileSidebar from "./sidebar.jsx";
import Primaryloader from "../loaders/primaryloader.jsx";
import BackButton from "../backButton.jsx";

const MyOrders = () => {
    const navigate = useNavigate();
    const [orderStatus, setOrderStatus] = useState([]);
    const [AllProductLoader, setAllProductLoader] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setAllProductLoader(true);

                const response = await makeApi("/api/get-my-second-order", "GET");
                setOrderStatus(response.data.secondorders);
            } catch (error) {
                console.log(error);
            } finally {
                setAllProductLoader(false);
            }
        };
        fetchOrders();
    }, []);

    return (
        <>
            <div className="hide_for_pc_screen" >
                <BackButton pageLocation="/user/user-profile" />
            </div>
            <div className="d-flex">
                <div className="my_wishlist_mobile_view">
                    <UserProfileSidebar />
                </div>

                <div className="myorders w-100">
                    <div className="userprofile-heading my_wishlist_mobile_view">
                        <h1>MY ORDERS</h1>
                    </div>
                    <div className="order-history">
                        <div className="order-summary order-summary1">
                            <div>
                                <p className="myproduct-name-heading">Items</p>
                            </div>
                            <div className="myproduct-name-heading1">Name</div>
                            <div className="myprice-product">Price</div>
                            <div className="myprice-product"> Date </div>
                            <div className="mystatus-product">Status</div>
                            <div style={{ textAlign: "center", fontSize: "20px" }}></div>
                        </div>
                        <hr />
                        {/* <br /> */}
                    </div>
                    <div>
                        <div className='top_parent_div_all_product' >
                            {AllProductLoader ? <div className="All_Product_loader">
                                <div className='' >
                                    <Primaryloader />
                                </div>
                            </div> :
                                <div>

                                    {orderStatus.map((order) => {
                                        return order.CartId.orderItems.map((item) => {
                                            return (
                                                <div className="order-summary order-summary2" key={item._id}>
                                                    <div>
                                                        <img className="myorder-img-product" loading="lazy" src={item.productId.thumbnail} alt={item.productId.name} />
                                                    </div>
                                                    <div className="myproduct-name">{item.productId.name}</div>
                                                    <div>₹{item.totalPrice}</div>
                                                    {/* date */}
                                                    <div> {new Date(order.createdAt).toLocaleString()} </div>
                                                    <div>{order.status}</div>
                                                    <Link to={`/user/my-orders/order-details/${order._id}`}>
                                                        <button>View</button>
                                                    </Link>
                                                </div>
                                            );
                                        });
                                    })}
                                </div>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MyOrders;
