// import React, { useEffect, useState } from 'react';
// import "../../../styles/product/sidebar.css";
// import Allproduct from '../allproduct';
// import { makeApi } from '../../../api/callApi.tsx';
// import FilterPopup from './FilterPopup.jsx';
// import { useNavigate } from 'react-router-dom';


// const ProductSidebar = () => {
//     const history = useNavigate();

//     const [minPrice, setMinPrice] = useState(0);
//     const [maxPrice, setMaxPrice] = useState(10000);
//     const [categories, setCategories] = useState([]);
//     const [search, setSearch] = useState("");
//     const [category, setCategory] = useState("");
//     const [showPopup, setShowPopup] = useState(false);

//     useEffect(() => {
//         async function fetchCategories() {
//             try {
//                 const response = await makeApi("/api/get-all-categories", "GET");
//                 if (response.status === 200) {
//                     setCategories(response.data.categories);
//                 }
//             } catch (error) {
//                 console.log("Error fetching categories:", error);
//             }
//         }
//         fetchCategories();
//     }, []);

//     const handleApplyFilter = (filterData) => {
//         setMinPrice(filterData.minPrice);
//         setMaxPrice(filterData.maxPrice);
//         setCategory(filterData.selectedCategory);
//     };
//     const handleLogout = () => {
//         localStorage.removeItem('token');
//         history("/auth/login");
//     }

//     return (
//         <>
//             {showPopup && <FilterPopup onClose={() => setShowPopup(false)} onSubmit={handleApplyFilter} />}
//             <div className='main_product_sidebar_top_parent_div' >
//                 <div className='main_product_sidebar_div' >
//                     {/* search */}
//                     <div className='product_sliderbar_options'>
//                         <div className='proudct_sidebar_heading'>Product Search:</div>
//                         <div>
//                             <input
//                                 type="text"
//                                 placeholder="Search"
//                                 value={search}
//                                 onChange={(e) => setSearch(e.target.value)}
//                                 className='input_for_search_sidebar'
//                             />
//                         </div>
//                     </div>
//                     {/* product category */}
//                     <div className='product_sliderbar_options'>
//                         <div className='proudct_sidebar_heading'> Product Category:</div>
//                         {/* drop down */}
//                         <div>
//                             <select
//                                 name="category"
//                                 id="category"
//                                 value={category}
//                                 onChange={(e) => setCategory(e.target.value)}
//                                 className='input_for_category_sidebar'
//                             >
//                                 <option value="" disabled={true} >Select Category</option>
//                                 <option value="">All</option>
//                                 {categories.map((category) => (
//                                     <option key={category._id} value={category._id}>
//                                         {category.name}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>
//                     </div>
//                     {/* filter by price */}
//                     <div className='product_sliderbar_options price_filter_sidebar_pc_sidebar'>
//                         <div className='proudct_sidebar_heading d-flex flex-column'>Filter By Price:</div>
//                             <div className='d-flex gap-2 w-100 justify-content-center  sidebar_price_max_min_div' >
//                                 <div>₹{minPrice}</div>
//                                 <div>-</div>
//                                 <div> ₹{maxPrice} </div>
//                             </div>
//                         <div className='main_price_range_product_sidebar' >
//                             <div>
//                                 <span>Min Price</span>
//                                 <input type="range" min={0} max={10000} value={minPrice} className='input-ranges input_for_min_price' onChange={(e) => setMinPrice(e.target.value)} />
//                                 {/* <div>₹{minPrice}</div> */}
//                             </div>
//                             <div>
//                                 <span>Max Price</span>
//                                 <input type="range" min={0} max={10000} value={maxPrice} className='input-ranges input_for_max_price' onChange={(e) => setMaxPrice(e.target.value)} />
//                                 {/* <div className='text-end' >₹{maxPrice}</div> */}
//                             </div>
//                         </div>
//                     </div>

//                   {/* more */}
//                     <div className='product_sliderbar_options more_icon_sidebar'>
//                         <div className='proudct_sidebar_heading'> More:</div>
//                         {/* drop down */}
//                         <div className='more_icon_sidebar_div' onClick={() => setShowPopup(true)}>
//                             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
//                                 <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
//                             </svg>
//                         </div>
//                     </div>
                    
//                 </div>
                
//                 <div className='w-100' >
//                     <Allproduct search={search} category={category} minPrice={minPrice} maxPrice={maxPrice} />
//                 </div>
//             </div>
//         </>
//     );
// };

// export default ProductSidebar;

import React, { useEffect, useState } from 'react';
import "../../../styles/product/sidebar.css";
import Allproduct from '../allproduct';
import { makeApi } from '../../../api/callApi.tsx';
import FilterPopup from './FilterPopup.jsx';
import { useNavigate } from 'react-router-dom';

const ProductSidebar = () => {
    const history = useNavigate();

    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(10000);
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await makeApi("/api/get-all-categories", "GET");
                if (response.status === 200) {
                    setCategories(response.data.categories);
                }
            } catch (error) {
                console.log("Error fetching categories:", error);
            }
        }
        fetchCategories();
    }, []);

    const handleApplyFilter = (filterData) => {
        setMinPrice(filterData.minPrice);
        setMaxPrice(filterData.maxPrice);
        setCategory(filterData.selectedCategory);
    };

    const handleMaxPriceChange = (e) => {
        const newMaxPrice = Math.min(Number(e.target.value), 10000); // Ensure maxPrice does not exceed 10000
        setMaxPrice(newMaxPrice);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        history("/auth/login");
    };

    return (
        <>
            {showPopup && <FilterPopup onClose={() => setShowPopup(false)} onSubmit={handleApplyFilter} />}
            <div className='main_product_sidebar_top_parent_div' >
                <div className='main_product_sidebar_div' >
                    {/* search */}
                    <div className='product_sliderbar_options'>
                        <div className='proudct_sidebar_heading'>Product Search:</div>
                        <div>
                            <input
                                type="text"
                                placeholder="Search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className='input_for_search_sidebar'
                            />
                        </div>
                    </div>
                    {/* product category */}
                    <div className='product_sliderbar_options'>
                        <div className='proudct_sidebar_heading'> Product Category:</div>
                        {/* drop down */}
                        <div>
                            <select
                                name="category"
                                id="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className='input_for_category_sidebar'
                            >
                                <option value="" disabled={true} >Select Category</option>
                                <option value="">All</option>
                                {categories.map((category) => (
                                    <option key={category._id} value={category._id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    {/* filter by price */}
                    <div className='product_sliderbar_options price_filter_sidebar_pc_sidebar'>
                        <div className='proudct_sidebar_heading d-flex flex-column'>Filter By Price:</div>
                            <div className='d-flex gap-2 w-100 justify-content-center  sidebar_price_max_min_div' >
                                <div>₹{minPrice}</div>
                                <div>-</div>
                                <div> ₹{maxPrice} </div>
                            </div>
                        <div className='main_price_range_product_sidebar' >
                            <div>
                                <span>Min Price</span>
                                <input type="range" min={0} max={10000} value={minPrice} className='input-ranges input_for_min_price' onChange={(e) => setMinPrice(Number(e.target.value))} />
                                {/* <div>₹{minPrice}</div> */}
                            </div>
                            <div>
                                <span>Max Price</span>
                                <input type="range" min={0} max={10000} value={maxPrice} className='input-ranges input_for_max_price' onChange={handleMaxPriceChange} />
                                {/* <div className='text-end' >₹{maxPrice}</div> */}
                            </div>
                        </div>
                    </div>

                  {/* more */}
                    <div className='product_sliderbar_options more_icon_sidebar'>
                        <div className='proudct_sidebar_heading'> More:</div>
                        {/* drop down */}
                        <div className='more_icon_sidebar_div' onClick={() => setShowPopup(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                            </svg>
                        </div>
                    </div>
                    
                </div>
                
                <div className='w-100' >
                    <Allproduct search={search} category={category} minPrice={minPrice} maxPrice={maxPrice} />
                </div>
            </div>
        </>
    );
};

export default ProductSidebar;
