  import { makeApi } from "../api/callApi.tsx";

let cartCountListeners = [];

export const fetchCart = async (setCartItems) => {
  try {
    const response = await makeApi("/api/my-cart", "GET");
    const cartItems = response.data.orderItems.map(item => ({
      productId: item.productId._id,
      quantity: item.quantity
    }));
    setCartItems(cartItems);
    updateCartCount(cartItems);
  } catch (error) {
    console.log(error);
  }
};

export const fetchWishlist = async (setWishlistItems) => {
  try {
    const response = await makeApi("/api/get-my-wishlist", "GET");
    const wishlistIds = response.data.wishlist
      .filter(item => item.products !== null)
      .map(item => item.products._id);
    setWishlistItems(wishlistIds);
  } catch (error) {
    console.log(error);
  }
};

export const addToCart = async (
  productId,
  setIsLogin,
  setShowPopup,
  fetchCart,
  setCartItems,
  setProductLoaders,
) => {
  const token = localStorage.getItem("token");
  if (!token) {
    setIsLogin(false);
    setShowPopup(true);
    return;
  }

  try {
    setProductLoaders((prevState) => ({
      ...prevState,
      [productId]: true,
    }));

    const method = "POST";
    const endpoint = "/api/add-to-cart";
    await makeApi(endpoint, method, {
      productId,
      quantity: 1,
      shippingPrice: 0,
    });

    fetchCart(setCartItems);
  } catch (error) {
    console.log(error.response.data);
  } finally {
    setProductLoaders((prevState) => ({
      ...prevState,
      [productId]: false,
    }));
  }
};

export const removeFromCart = async (
  productId,
  setProductLoaders,
  setCartItems,
  fetchCart
) => {
  try {
    setProductLoaders((prevState) => ({
      ...prevState,
      [productId]: true,
    }));
    const method = "POST";
    const endpoint = "/api/remove-from-cart";
    await makeApi(endpoint, method, { productId });

    fetchCart(setCartItems);
  } catch (error) {
    console.log(error);
  } finally {
    setProductLoaders((prevState) => ({
      ...prevState,
      [productId]: false,
    }));
  }
};

export const submitOrder = async (data, setLoading, setOrderPlaced, navigation) => {
  try {
    setLoading(true);
    const response = await makeApi("/api/create-second-order", "POST", data);
    setOrderPlaced(true);
    updateCartCount([]);
    setTimeout(() => {
      setOrderPlaced(false);
      navigation("/product/all-products");
    }, 5000);
  } catch (error) {
    console.error("Error creating order: ", error);
  } finally {
    setLoading(false);
  }
};



export const cartItemFetchCart = async (setCartItems, setCartProductList, setAllProductLoader, setIsCartEmpty) => {
  try {
    setAllProductLoader(true);
    const response = await makeApi("/api/my-cart", "GET");
    const cartItems = response.data.orderItems;
    setCartItems(response.data);
    setCartProductList(cartItems);  // Set the cart product list here
    if (cartItems.length === 0) {
      setIsCartEmpty(true);
    }
    updateCartCount(cartItems);
  } catch (error) {
    console.log(error);
    if (error.response.data.message === "Cart not found") {
      setIsCartEmpty(true);
    }
  } finally {
    setAllProductLoader(false);
  }
};

export const cartItemAddToCart = async (productId, setProductLoaders, fetchCart) => {
  try {
    setProductLoaders(prevState => ({
      ...prevState,
      [productId]: true
    }));
    const method = "POST";
    const endpoint = "/api/add-to-cart";
    await makeApi(endpoint, method, {
      productId, 
      "quantity": 1,
      "shippingPrice": 0
    });
    fetchCart();
  } catch (error) {
    console.log(error);
  } finally {
    setProductLoaders(prevState => ({
      ...prevState,
      [productId]: false
    }));
  }
};

export const cartItemRemoveFromCart = async (productId, setProductLoaders, fetchCart) => {
  try {
    setProductLoaders(prevState => ({
      ...prevState,
      [productId]: true
    }));
    const method = "POST";
    const endpoint = "/api/remove-from-cart";
    await makeApi(endpoint, method, { productId });
    fetchCart();
  } catch (error) {
    console.log(error);
  } finally {
    setProductLoaders(prevState => ({
      ...prevState,
      [productId]: false
    }));
  }
};

const updateCartCount = (cartItems) => {
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  cartCountListeners.forEach(listener => listener(cartCount));
};

export const subscribeToCartCount = (listener) => {
  cartCountListeners.push(listener);
};

export const unsubscribeFromCartCount = (listener) => {
  cartCountListeners = cartCountListeners.filter(l => l !== listener);
};
