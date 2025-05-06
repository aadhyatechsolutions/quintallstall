import { useEffect } from "react";
import { useTheme, lighten, styled } from "@mui/material/styles";
import { Card, Fab, Grid, IconButton, Tooltip } from "@mui/material";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import GroupIcon from "@mui/icons-material/Group";
import SummarizeIcon from "@mui/icons-material/Summarize";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ArrowRightAlt from "@mui/icons-material/ArrowRightAlt";
import { Link } from "react-router-dom";

import useProductStore from "../../../../store/product/productStore";
import useOrderStore from "../../../../store/order/orderStore";
import useAuth from "app/hooks/useAuth";

// Reusing same styled components from StatCards2
const ContentBox = styled("div")(() => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center"
}));

const FabIcon = styled(Fab)(() => ({
  width: "44px !important",
  height: "44px !important",
  boxShadow: "none !important"
}));

const H3 = styled("h3")(() => ({
  margin: 0,
  fontWeight: "500",
  marginLeft: "12px"
}));

const H1 = styled("h1")(({ theme }) => ({
  margin: 0,
  flexGrow: 1,
  color: theme.palette.text.secondary
}));

export default function RetailerStatCard() {
  const theme = useTheme();
  const { user } = useAuth();
  const { orders, fetchOrders } = useOrderStore();
  const { products, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, []);

  const userOrders = orders.filter(order =>
    order.order_items.some(item => item.product.seller_id === user.id)
  );
  const userProducts = products.filter(product => product.seller_id === user.id);
  const totalOrders = userOrders.length;
  const totalProducts = userProducts.length;
  const totalEarnings = userOrders.reduce((sum, order) => sum + Number(order.total_amount || 0), 0);
  const customerIds = new Set(userOrders.map(order => order.customer_id));
  const totalCustomers = customerIds.size;

  const cardList = [
    { name: "Total Products", amount: totalProducts, Icon: Inventory2Icon, url: "/products/my-products" },
    { name: "Total Customers", amount: totalCustomers, Icon: GroupIcon, url: "/customers" },
    { name: "Total Orders", amount: totalOrders, Icon: SummarizeIcon, url: "/orders/my-orders" },
    { name: "Total Earnings", amount: `₹${totalEarnings.toFixed(2)}`, Icon: MonetizationOnIcon, url: "/orders/earnings" }
  ];

  return (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      {cardList.map(({ name, amount, Icon, url }) => (
        <Grid item md={6} xs={12} key={name}>
          <Card elevation={3} sx={{ p: 2 }}>
            <ContentBox>
              <FabIcon size="medium" sx={{ background: "rgba(9, 182, 109, 0.15)" }}>
                <Icon className="icon" />
              </FabIcon>
              <H3 color="#08ad6c">{name}</H3>
            </ContentBox>

            <ContentBox sx={{ pt: 2 }}>
              <H1>{amount}</H1>
              <Tooltip title="View Details" placement="top">
                <IconButton component={Link} to={url}>
                  <ArrowRightAlt />
                </IconButton>
              </Tooltip>
            </ContentBox>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
