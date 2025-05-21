import { useEffect } from "react";
import Fab from "@mui/material/Fab";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import { lighten, styled, useTheme } from "@mui/material/styles";
import Group from "@mui/icons-material/Group";
import SummarizeIcon from '@mui/icons-material/Summarize';
import ArrowRightAlt from "@mui/icons-material/ArrowRightAlt";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

import { Link } from 'react-router-dom';
import useUserStore from "../../../../store/user/userStore";
import useOrderStore from "../../../../store/order/orderStore";
import useAuth from "app/hooks/useAuth";


// STYLED COMPONENTS
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

const Span = styled("span")(() => ({
  fontSize: "13px",
  marginLeft: "4px"
}));

const IconBox = styled("div")(() => ({
  width: 16,
  height: 16,
  color: "#fff",
  display: "flex",
  overflow: "hidden",
  borderRadius: "300px ",
  justifyContent: "center",
  "& .icon": { fontSize: "14px" }
}));

export default function StatCards2() {
  const { users, isLoading, error, fetchUsers } = useUserStore();
  const { orders, loading: ordersLoading, error: orderError, fetchOrders } = useOrderStore();
  const { user } = useAuth();


  useEffect(() => {
    if (users.length === 0) {
        fetchUsers();
    }
  }, [fetchUsers, users.length]);

  useEffect(() => {
    if (orders.length === 0) {
      fetchOrders();
    }
  }, [fetchOrders, orders.length]); 

  const totalOrders = orders.filter(order => order.order_status === "pending").length
  const acceptedOrders = orders.filter(order => order.order_status === "accepted" && order.delivery_user_id == user.id).length
  const deliveredOrders = orders.filter(order => order.order_status === "completed" && order.delivery_user_id == user.id).length
   const cardList = [
      { name: "All Orders", amount: totalOrders, Icon: Group, url:'/orders/orders' },
      { name: "Accepted Orders", amount: acceptedOrders, Icon: Group, url:'/orders/accepted-orders' },
      { name: "Delivered Orders", amount: deliveredOrders, Icon: Group, url:'/orders/delivered-orders' },
    ];

  const { palette } = useTheme();
  const bgError = lighten(palette.error.main, 0.85);

  return (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      {cardList.map(({ amount, Icon, name, url }) => (
      <Grid size={{ md: 6, xs: 12 }} key={name}>
        <Card elevation={3} sx={{ p: 2 }}>
          <ContentBox>
            <FabIcon size="medium" sx={{ background: "rgba(9, 182, 109, 0.15)" }}>
              {/* <TrendingUp color="success" /> */}
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
