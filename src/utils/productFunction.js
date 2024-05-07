
import { makeApi } from "../api/callApi.tsx";

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

    fetchCart();
    setCartItems((prevState) => {
      const existingItem = prevState.find(
        (item) => item.productId === productId
      );
      if (existingItem) {
        return prevState.map((item) => {
          if (item.productId === productId) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      } else {
        return [...prevState, { productId, quantity: 1 }];
      }
    });
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
    // setAddTocartLoader(true);
    setProductLoaders((prevState) => ({
      ...prevState,
      [productId]: true,
    }));
    const method = "POST";
    const endpoint = "/api/remove-from-cart";
    const data = await makeApi(endpoint, method, { productId });
    setCartItems((prevState) =>
      prevState.filter((item) => item.productId !== productId)
    );
    fetchCart();
  } catch (error) {
    console.log(error);
  } finally {
    setProductLoaders((prevState) => ({
      ...prevState,
      [productId]: false,
    }));
    // setAddTocartLoader(false);
  }
};
