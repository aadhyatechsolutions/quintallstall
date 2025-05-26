import { lazy } from "react";
import { Navigate } from "react-router-dom";

import AuthGuard from "./auth/AuthGuard";
import { authRoles } from "./auth/authRoles";

import Loadable from "./components/Loadable";
import MatxLayout from "./components/MatxLayout/MatxLayout";
import sessionRoutes from "./views/sessions/session-routes";
import materialRoutes from "app/views/material-kit/MaterialRoutes";

import AMPCList from "../features/apmc/ApmcList";
import AMPCCreate from "../features/apmc/ApmcCreate";
import AMPCView from "../features/apmc/ApmcView";
import AMPCEdit from "../features/apmc/ApmcEdit";

import ProductList from "../features/product/ProductList";
import ProductCreate from "../features/product/ProductCreate";
import ProductEdit from "../features/product/ProductEdit";
import ProductView from "../features/product/ProductView";
import ProductReview from "../features/product/ProductReview";
import ProductReviewView from "../features/product/ProductReviewView";

import CategoryCreate from "../features/category/CategoryCreate";
import CategoryList from "../features/category/CategoryList";
import CategoryView from "../features/category/CategoryView";
import CategoryEdit from "../features/category/CategoryEdit";

import WholeSalerCreate from "../features/wholesaler/WholesalerCreate";
import WholeSalerList from "../features/wholesaler/WholesalerList";
import WholeSalerEdit from "../features/wholesaler/WholesalerEdit";
import WholeSalerProductList from "../features/wholesaler/WholesalerProductList";
import WholeSalerKYC from "../features/wholesaler/WholesalerKYC";

// import ProductList from "./components/WholeSeller/ProductList";

import RetailerCreate from "../features/retailer/RetailerCreate";
import RetailerList from "../features/retailer/RetailerList";
import RetailerEdit from "../features/retailer/RetailerEdit";
import RetailerProductList from "../features/retailer/RetailerProductList";
import RetailerKYC from "../features/retailer/RetailerKYC";

import DeliveryCreate from "../features/delivery/DeliveryCreate";
import DeliveryList from "../features/delivery/DeliveryList";
import DeliveryEdit from "../features/delivery/DeliveryEdit";
import DeliveryKYC from "../features/delivery/DeliveryKYC";

import OrderList from "../features/order/OrderList";
import AcceptedOrders from "../features/order/AcceptedOrders";
import DeliveredOrders from "../features/order/DeliveredOrders";
import OrderMap from "../features/order/OrderMap";
import Reviews from "./components/Orders/Reviews";

import WholeSellerReport from "./components/Report/WholeSellerReport";

import VehicleCommissionCreate from "../features/commission/VehicleCommissionCreate";
import VehicleCommissionList from "../features/commission/VehicleCommissionList";
import VehicleCommissionEdit from "../features/commission/VehicleCommissionEdit";

import PlatformComission from "../features/commission/PlatformCommission";
import WageCostCommission from "../features/commission/WageCostCommission";

import VehicleTypeCreate from "../features/vehicleType/VehicleTypeCreate";
import VehicleTypeList from "../features/vehicleType/VehicleTypeList";
import VehicleTypeEdit from "../features/vehicleType/VehicleTypeEdit";

import BlogCreate from "../features/blog/BlogCreate";
import BlogEdit from "../features/blog/BlogEdit";
import BlogList from "../features/blog/BlogList";

import BlogCategoryCreate from "../features/blogCategory/BlogCategoryCreate";
import BlogCategoryList from "../features/blogCategory/BlogCategoryList";
import BlogCategoryEdit from "../features/blogCategory/BlogCategoryEdit";

import SpecialOfferCreate from "../features/specialOffer/SpecialOfferCreate";
import SpecialOfferList from "../features/specialOffer/SpecialOfferList";
import SpecialOfferEdit from "../features/specialOffer/SpecialOfferEdit";

import OfferCreate from "../features/offer/OfferCreate";
import OfferList from "../features/offer/OfferList";

import CoinCreate from "../features/coin/CoinCreate";
import CoinList from "../features/coin/CoinList";
import CoinEdit from "../features/coin/CoinEdit";

import ProfileEdit from "../features/profile/ProfileEdit";

// import CoinTypeCreate from "./components/Settings/CoinType/Create";
// import CoinTypeList from "./components/Settings/CoinType/List";
// import CoinTypeEdit from "./components/Settings/CoinType/Edit";

// import CoinDetails from "./components/Settings/CoinDetails";
import PurchasedCoins from "../features/coin/PurchasedCoins";
import PurchaseCoin from "../features/coin/PurchaseCoin";
import WalletSettings from "../features/wallet/WalletSettings";
// import TaxSlabCreate from "./components/Settings/TaxSlabCreate";
import TaxSlab from "../features/tax/TaxSlab";
import RoleCreate from "../features/role/RoleCreate";
import RoleEdit from "../features/role/RoleEdit";
import RoleList from "../features/role/RoleList";

import StaffCreate from "../features/staff/StaffCreate";
import StaffEdit from "../features/staff/StaffEdit";
// import StaffEdit from "./components/Settings/Staff/Edit";
import StaffList from "../features/staff/StaffList";

import RoleGuard from "./auth/RoleGuard";

const Analytics = Loadable(lazy(() => import("app/views/dashboard/Analytics")));

const routes = [

  { path: "/", element: <Navigate to="/dashboard/default" /> },
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [
      ...materialRoutes,
      { path: "/dashboard/default", element:  <Analytics />, auth: authRoles.admin, },

      { path: "/features/apmc/list", element: <AMPCList /> },
      { path: "/features/apmc/create", element: <AMPCCreate /> },
      { path: "/features/apmc/view/:id", element: <AMPCView /> },
      { path: "/features/apmc/edit/:id", element: <AMPCEdit /> },

      { path: "/features/product/list", element: <ProductList /> },
      { path: "/features/product/create", element: <ProductCreate />, },
      { path: "/features/product/view/:id", element: <ProductView />,},
      { path: "/features/product/edit/:id", element: <ProductEdit />,},
      { path: "/features/product/reviews", element: <ProductReview />,},
      { path: "/features/product/reviewsView/:id", element: <ProductReviewView />,},
      { path: "/features/category/list", element: <CategoryList /> },
      { path: "/features/category/create", element: <CategoryCreate /> },
      { path: "/features/category/view/:id", element: <CategoryView /> },
      { path: "/features/category/edit/:id", element: <CategoryEdit /> },

      { path: "/features/wholesaler/create", element: <WholeSalerCreate />, },
      { path: "/features/wholesaler/list", element: <WholeSalerList />, },
      { path: "/features/wholesaler/edit/:id", element: <WholeSalerEdit />, },

      { path: "/wholesaler/view-products", element: <WholeSalerProductList /> },
      { path: "/wholesaler/wholesaler-kyc", element: <WholeSalerKYC /> },

      { path: "/features/retailer/create", element: <RetailerCreate /> },
      { path: "/features/retailer/list", element: <RetailerList /> },
      { path: "/features/retailer/edit/:id", element: <RetailerEdit /> },

      { path: "/retailer/view-products", element: <RetailerProductList /> },
      { path: "/retailer/retailer-kyc", element: <RetailerKYC /> },

      { path: "/features/delivery/create", element: <DeliveryCreate /> },
      { path: "/features/delivery/list", element: <DeliveryList /> },
      { path: "/features/delivery/edit/:id", element: <DeliveryEdit /> },

      { path: "/delivery/delivery-kyc", element: <DeliveryKYC /> },

      { path: "/orders/orders", element: <OrderList /> },
      { path: "/orders/accepted-orders", element: <AcceptedOrders /> },
      { path: "/orders/delivered-orders", element: <DeliveredOrders /> },
      { path: "/orders/order-map", element: <OrderMap /> },

      { path: "/report/wholeseller-report", element: <WholeSellerReport /> },

      { path: "/commissions/vehicle-commission/create", element: <VehicleCommissionCreate />, },
      { path: "/commissions/vehicle-commission/list", element: <VehicleCommissionList />, },
      { path: "/commissions/vehicle-commission/edit/:id", element: <VehicleCommissionEdit />, },

      { path: "/commissions/platform-commission", element: <PlatformComission />, },
      { path: "/commissions/wage-cost-commission", element: <WageCostCommission />, },

      { path: "/comissions/vehicle-type/create", element: <VehicleTypeCreate />, },
      { path: "/comissions/vehicle-type/list", element: <VehicleTypeList />, },
      { path: "/comissions/vehicle-type/edit/:id", element: <VehicleTypeEdit />, },

      { path: "/frontend/blogs/create", element: <BlogCreate /> },
       { path: "/frontend/blogs/edit/:id", element: <BlogEdit /> },
      { path: "/frontend/blogs/list", element: <BlogList /> },

      { path: "/frontend/blog-category/create", element: <BlogCategoryCreate />, },
      { path: "/frontend/blog-category/list", element: <BlogCategoryList /> },
      { path: "/frontend/blog-category/edit/:id", element: <BlogCategoryEdit />, },

      { path: "/frontend/special-offer/create", element: <SpecialOfferCreate />, },
      { path: "/frontend/special-offer/list", element: <SpecialOfferList /> },
      { path: "/frontend/special-offer/edit/:id", element: <SpecialOfferEdit />, },

      { path: "/settings/offer/create", element: <OfferCreate />, },
      { path: "/settings/offer/list", element: <OfferList />, },
      { path: "/settings/coin-settings/create", element: <CoinCreate />, },
      { path: "/settings/coin-settings/list", element: <CoinList /> },
      { path: "/settings/coin-settings/edit/:id", element: <CoinEdit />, },

      // { path: "/settings/coin-type/create", element: <CoinTypeCreate /> },
      // { path: "/settings/coin-type/list", element: <CoinTypeList /> },
      // { path: "/settings/coin-type/edit/:id", element: <CoinTypeEdit /> },

      { path: "/settings/purchased-coins", element: <PurchasedCoins /> },
      { path: "/settings/purchase-coin", element: <PurchaseCoin /> },
      
      
      { path: "/settings/wallet-settings", element: <WalletSettings /> },
      { path: "/settings/tax-slab", element: <TaxSlab /> },

      { path: "/settings/role/create", element: <RoleCreate /> },
      { path: "/settings/role/list", element: <RoleList /> },
      { path: "/settings/role/edit/:id", element: <RoleEdit /> },

      { path: "/settings/staff/create", element: <StaffCreate /> },
      { path: "/settings/staff/list", element: <StaffList /> },
      { path: "/settings/staff/edit/:id", element: <StaffEdit /> },

      { path: "/page-layouts/user-profile", element: <ProfileEdit /> },
      
    ],
  },
  ...sessionRoutes,
];

export default routes;
