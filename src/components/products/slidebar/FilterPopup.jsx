
import React, { useState, useEffect } from 'react';
import "../../../styles/product/filterpopup.css";
import { makeApi } from '../../../api/callApi.tsx';

const FilterPopup = ({ onClose, onSubmit }) => {
    const [showPriceRange, setShowPriceRange] = useState(true);
    const [showCategoryMenu, setShowCategoryMenu] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000);

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

    const handleApplyFilter = () => {
        const filterData = {
            minPrice,
            maxPrice,
            selectedCategory
        };
        onSubmit(filterData);
        onClose();
    };

    return (
        <div className="filter-popup">
            <div className="popup-header">
                <h2>Filter</h2>
                <button className="close-btn" onClick={onClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                    </svg>
                </button>
            </div>
            <div className="popup-content">
                <div className="sidebar">
                    <ul>
                        <li onClick={() => { setShowPriceRange(true); setShowCategoryMenu(false); }}>Price Range</li>
                        <li onClick={() => { setShowPriceRange(false); setShowCategoryMenu(true); }}>Category</li>
                    </ul>
                </div>
                <div className="content">
                    <div className={`price-range-form ${showPriceRange ? 'active' : ''}`}>
                        <label htmlFor="minPrice">Min Price:</label>
                        <input type="number" id="minPrice" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                        <label htmlFor="maxPrice">Max Price:</label>
                        <input type="number" id="maxPrice" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
                        <button onClick={handleApplyFilter}>Apply</button>
                    </div>
                    <div className={`category-menu ${showCategoryMenu ? 'active' : ''}`}>
                        <h3>Select Category:</h3>
                        <ul>
                            {categories.map(category => (
                                <li key={category._id}>
                                    <label>
                                        <input type="radio" name="category" value={category._id} onChange={() => setSelectedCategory(category._id)} checked={selectedCategory === category._id} />
                                        {category.name}
                                    </label>
                                </li>
                            ))}
                        </ul>
                        <button onClick={handleApplyFilter}>Apply</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterPopup;
