import React, { useEffect, useState } from 'react';
import "../../../styles/product/sidebar.css";
import Allproduct from '../allproduct';
import { makeApi } from '../../../api/callApi.tsx';

const ProductSidebar = () => {
	const [minPrice, setMinPrice] = useState(0)
	const [minValueforminPrice, setMinValueforminPrice] = useState(0)
	const [maxValueforminPrice, setMaxValueforminPrice] = useState(5000)
	const [maxValueformaxPrice, setMaxValueformaxPrice] = useState(10000)
	const [categories, setCategories] = useState([])
	const [maxPrice, setMaxPrice] = useState(1000)
	const [search, setSearch] = useState("")
	const [category, setCategory] = useState("")

	useEffect(() => {
		async function fetchCategories() {
			try {
				// setLoading(true);
				const response = await makeApi("/api/get-all-categories", "GET");
				if (response.status === 200) {
					setCategories(response.data.categories);
				}
			} catch (error) {
				console.log("Error fetching categories:", error);
			} finally {
				// setLoading(false);
			}
		}
		fetchCategories();
	}, []);

	return (
		<>
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
								value={category.name}
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
					</div >
					{/* filter by price */}
					<div className='product_sliderbar_options'>
						<div className='proudct_sidebar_heading'>Filter By Price:</div>
						<div className='main_price_range_product_sidebar' >
							{/* range for min price */}
							<div>
								<span>Min Price</span>
								<input type="range" min={minValueforminPrice} max={maxValueforminPrice} className='input-ranges input_for_min_price' onChange={(e) => setMinPrice(e.target.value)} />
								<div>₹{minPrice}</div>
							</div>
							<div>
							<span>Max Price</span>

								{/* for max price */}
								<input type="range" min={minPrice} max={maxValueformaxPrice} className='input-ranges input_for_max_price' onChange={(e) => setMaxPrice(e.target.value)} />
								<div className='text-end' >₹{maxPrice}</div>
							</div>


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
