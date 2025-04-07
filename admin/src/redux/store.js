// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./categorySlice";
import ampcReducer from "./ampcSlice.js";
import productMasterReducer from "./productMasterSlice";
import wholeSellerUserReducer from "./wholeSellerUserSlice";
import productListReducer from './productListSlice';
import wholeSellerKYCListReducer from './wholeSellerKYCListSlice';
import retailerUserReducer from './retailerUserSlice';
import retailerKYCListReducer from './retailerKYCListSlice';
import deliveryUserReducer from './deliveryUserSlice';
import reviewListReducer from './reviewListSlice';
import orderListReducer from './orderListSlice';
import wholeSellerReportReducer from './wholeSellerReportSlice';
import comissionMasterReducer from './comissionMasterSlice';
import platformComissionReducer from './platformComissionSlice';
import wageCostComissionReducer from './wageCostComissionSlice';
import vehicleMasterReducer from './vehicleMasterSlice';
import blogReducer from './blogSlice';
import blogCategoryReducer from './blogCategorySlice';
import specialOfferReducer from './specialOfferSlice';
import coinTypeReducer from './coinTypeSlice';
import coinListReducer from './coinListSlice';
import coinSummaryReducer from './coinSummarySlice';
import walletReducer from './walletSlice';
import taxSlabReducer from './taxSlabSlice';
import roleReducer from './roleSlice';
import staffReducer from './staffSlice';

import authReducer from './auth/authSlice';
import productReducer from './storefront/catalog/productSlice';


const store = configureStore({
  reducer: {
    category: categoryReducer,
    ampc: ampcReducer,
    productMaster:productMasterReducer,
    wholeSellerUser:wholeSellerUserReducer,
    productList:productListReducer,
    wholeSellerKYCList:wholeSellerKYCListReducer,
    retailerUser:retailerUserReducer,
    retailerKYCList:retailerKYCListReducer,
    deliveryUser:deliveryUserReducer,
    reviewList:reviewListReducer,
    wholeSellerReport:wholeSellerReportReducer,
    orderList:orderListReducer,
    comissionMaster:comissionMasterReducer,
    platformComission:platformComissionReducer,
    wageCostComission:wageCostComissionReducer,
    vehicleMaster:vehicleMasterReducer,
    blog:blogReducer,
    blogCategory:blogCategoryReducer,
    specialOffer:specialOfferReducer,
    coinType:coinTypeReducer,
    coinList:coinListReducer,
    coinSummary:coinSummaryReducer,
    wallet:walletReducer,
    taxSlab:taxSlabReducer,
    roles:roleReducer,
    staff:staffReducer,

    auth: authReducer,
    product: productReducer,
  },
});

export default store;
