import React, { useEffect, useState } from 'react';
// import './ProductCard.css';
import "../../../styles/NewHome/ProductCard.css"
import productImage from '../../../assets/img/NewHome/Mumtaz 1.png'; // Replace with your image path
import offerImage from '../../../assets/img/NewHome/offerImage.png'
import AsAD from '../../../assets/img/NewHome/AsAD.svg'
import RIC from '../../../assets/img/NewHome/RIC.svg'
import { makeApi } from '../../../api/callApi.tsx';
import { Link } from 'react-router-dom';


const ProductList = [
    {
        id: 1,
        name: "Mumtaz Premium Basmati rice",
        weight: "1 kg",
        price: "₹9,750",
        oldPrice: "₹10,835",
        productImage: AsAD
    },
    {
        id: 2,
        name: "Mumtaz Premium Basmati rice",
        weight: "1 kg",
        price: "₹9,750",
        oldPrice: "₹10,835",
        productImage: productImage
    },
    {
        id: 3,
        name: "Mumtaz Premium Basmati rice",
        weight: "1 kg",
        price: "₹9,750",
        oldPrice: "₹10,835",
        productImage: RIC
    },
]


const NewHomeProducts = () => {
    const [products, setProducts] = useState([]);
const [AllProductLoader, setAllProductLoader] = useState(false);
const [productType, setProductType] = useState("");

useEffect(() => {
    const token = localStorage.getItem("token")
    const userLocation = localStorage.getItem("country")
    if (token) {
        setProductType(userLocation)
    }
}, [localStorage.getItem("token")])

// get data
const fetchProduct = async () => {
    try {
        setAllProductLoader(true);
            const response = await makeApi(`/api/get-all-products?&perPage=10&category=665d67c04133e96dad0359a4`, "GET");

        setProducts(response.data.products);
    } catch (error) {
        console.log(error);
    } finally {
        setAllProductLoader(false);
    }
};


useEffect(() => {
    fetchProduct();
}, [productType])

    return (
        <div className="product_card_container_New_home py-5 my-5 ">
            {ProductList.map((product) => (
                <div key={product.id} className="product_card">
                    {/* top */}
                    <div className='d-flex px-2'>
                        <div>
                            <img src={offerImage} alt="offer" className="offerImage" />
                        </div>
                        <div>
                            <img src={product.productImage} alt={product.name} className="product_image" />
                        </div>
                    </div>
                    {/* bottom */}
                    <div className='d-flex flex-column gap-2'>
                        <div className='New_Home_product_name_and_weight' >
                            <div>{product.name}</div>
                            <div>Net weight: {product.weight}</div>
                        </div>
                        <div className='d-flex justify-content-between'>
                            <div className='d-flex align-items-center gap-2'>
                                <div className="new-price">{product.price}</div>
                                <div className="old-price">{product.oldPrice}</div>
                            </div>
                            <Link to={"product/all-products"} className='css-for-link-tag' >
                            <div className='ADD_button_new_home_page'>
                                ADD
                            </div>
                            </Link>
                        </div>
                    </div>
                </div>
                
            ))}


        </div>
    );
};


export default NewHomeProducts;





// import React, { useEffect, useState } from 'react';
// import "../../../styles/NewHome/ProductCard.css";
// import productImage from '../../../assets/img/NewHome/Mumtaz 1.png'; // Replace with your image path
// import offerImage from '../../../assets/img/NewHome/offerImage.png';
// import AsAD from '../../../assets/img/NewHome/AsAD.svg';
// import RIC from '../../../assets/img/NewHome/RIC.svg';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import "swiper/css";
// import "swiper/css/navigation";
// import { makeApi } from '../../../api/callApi.tsx';

// const ProductList = [
//     {
//         id: 1,
//         name: "Mumtaz Premium Basmati rice",
//         weight: "1 kg",
//         price: "₹9,750",
//         oldPrice: "₹10,835",
//         productImage: AsAD
//     },
//     {
//         id: 2,
//         name: "Mumtaz Premium Basmati rice",
//         weight: "1 kg",
//         price: "₹9,750",
//         oldPrice: "₹10,835",
//         productImage: productImage
//     },
//     {
//         id: 3,
//         name: "Mumtaz Premium Basmati rice",
//         weight: "1 kg",
//         price: "₹9,750",
//         oldPrice: "₹10,835",
//         productImage: RIC
//     },
// ];

// const NewHomeProducts = () => {

    
//     const [products, setProducts] = useState([]);
//     const [AllProductLoader, setAllProductLoader] = useState(false);
//     const [productType, setProductType] = useState("");
//     const [swiperRef, setSwiperRef] = useState(null);
//     const [activeIndex, setActiveIndex] = useState(2);

//     const [slidesPerView, setSlidesPerView] = useState(2.2);

//     useEffect(() => {
//         const handleResize = () => {
//             const screenWidth = window.innerWidth;
//             if (screenWidth <= 500) {
//                 setSlidesPerView(1);
//             } else if (screenWidth <= 900) {
//                 setSlidesPerView(2);
//             } else if (screenWidth <= 1039) {
//                 setSlidesPerView(2.2);
//             } else {
//                 setSlidesPerView(5.3);
//             }
//         };
    
//         handleResize();
//         window.addEventListener('resize', handleResize);
//         return () => {
//             window.removeEventListener('resize', handleResize);
//         };
//     }, []);

//     useEffect(() => {
//         const token = localStorage.getItem("token")
//         const userLocation = localStorage.getItem("country")
//         if (token) {
//             setProductType(userLocation)
//         }
//     }, [localStorage.getItem("token")])

//     // get data
//     const fetchProduct = async () => {
//         try {
//             setAllProductLoader(true);
//             const response = await makeApi(`/api/get-all-products?&perPage=10&category=665d67c04133e96dad0359a4`, "GET");
            
//             setProducts(response.data.products);
//         } catch (error) {
//             console.log(error);
//         } finally {
//             setAllProductLoader(false);
//         }
//     };

  
//     useEffect(() => {
//         fetchProduct();
//     }, [productType])

//     return (
//         <div className="product_card_container_New_home py-5 my-5 w-100">
//             <Swiper
//                 spaceBetween={20}
//                 slidesPerView={slidesPerView}
//                 navigation
//                 className=""
//             >
//                 {products.map((product) => {
//        return             <SwiperSlide key={product.id}>
//                         <div className="product_card">
//                             {/* top */}
//                             <div className='d-flex gap-4'>
//                                 <div>
//                                     <img src={offerImage} alt="offer" className="offerImage" />
//                                 </div>
//                                 <div>
//                                     <img src={product.thumbnail} alt={product.name} className="product_image" />
//                                 </div>
//                             </div>
//                             {/* bottom */}
//                             <div className='d-flex flex-column gap-2'>
//                                 <div className='New_Home_product_name_and_weight'>
//                                     <div>{product.name}</div>
//                                     {/* <div>Net weight: {product.weight}</div> */}
//                                 </div>
//                                 <div className='d-flex justify-content-between'>
//                                     <div className='d-flex align-items-center gap-2'>
//                                         <div className="new-price">{product.price}</div>
//                                         {/* <div className="old-price">{product.oldPrice}</div> */}
//                                     </div>
//                                     <div className='ADD_button_new_home_page'>
//                                         ADD
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </SwiperSlide>
// })}
//             </Swiper>
//         </div>
//     );
// };

// export default NewHomeProducts;
