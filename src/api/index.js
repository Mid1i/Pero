import {fetchCartOpenProducts, fetchCatalogProducts, fetchColors, fetchCurrentProduct, fetchFavouriteOpenProducts, fetchProducts, fetchRandomProducts} from "./openAPI";
import {fetchAuthVerify, fetchAuthPasswordReset, fetchAuthSignOut, fetchRegistration, fetchEmail, fetchPasswordReset, fetchLogin, refreshTokens} from "./authAPI";
import {addCartProducts, fetchCartProducts, fetchFavouriteProducts, fetchUserData, removeCartProducts, updateCartProducts, updateUserData, updateFavouriteProducts, substractCartProducts} from "./userAPI";
import {addSizes, createSneaker, fetchSneakers} from "./adminAPI";


export {
    addSizes,
    createSneaker,
    fetchAuthVerify,
    fetchAuthPasswordReset,
    addCartProducts,
    fetchAuthSignOut,
    fetchCartProducts,
    fetchCartOpenProducts,
    fetchCatalogProducts,
    fetchColors,
    fetchCurrentProduct,
    fetchEmail,
    fetchFavouriteProducts,
    fetchFavouriteOpenProducts,
    fetchLogin,
    fetchSneakers,
    fetchPasswordReset,
    fetchProducts,
    fetchUserData,
    fetchRandomProducts,
    fetchRegistration,
    refreshTokens,
    removeCartProducts,
    updateCartProducts,
    updateUserData,
    updateFavouriteProducts,
    substractCartProducts,
};