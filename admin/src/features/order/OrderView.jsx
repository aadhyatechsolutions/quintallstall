import { Box, styled, Button } from "@mui/material";
import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumb, SimpleCard } from "app/components";
import useOrderStore from "../../store/order/orderStore";
import { useNavigate } from "react-router-dom";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));

export default function OrderView() {
  const { orders, loading, error, fetchOrders, deleteOrder, updateOrderStatus } = useOrderStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleDelete = (id) => {
    deleteOrder(id);
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "pending" ? "completed" : "pending";
    try {
      await updateOrderStatus(id, newStatus);
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleEdit = (id) => {
    navigate(`/features/order/edit/${id}`);
  };

  const columns = [
    { field: "id", headerName: "Order ID", width: 100 },

    {
      field: "buyer",
      headerName: "Buyer",
      width: 150,
      renderCell: (params) => {
        const buyer = params.row.buyer;
        const name = buyer?.first_name || buyer?.name || "N/A";
        const fullName = buyer?.last_name ? `${name} ${buyer.last_name}` : name;
        return <span>{fullName}</span>;
      }
    },
    {
      field: "seller",
      headerName: "Seller",
      width: 150,
      renderCell: (params) => {
        const seller = params.row.seller;
        const name = seller?.first_name || seller?.name || "N/A";
        const fullName = seller?.last_name ? `${name} ${seller.last_name}` : name;
        return <span>{fullName}</span>;
      }
    },

    {
      field: "total_amount",
      headerName: "Total Amount",
      width: 150,
      renderCell: (params) => (
        <span style={{ fontWeight: 600 }}>
          ₹{Number(params.row.total_amount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
        </span>
      )
    },

    { field: "shipping_address", headerName: "Shipping Address", width: 300 },

    {
      field: "order_status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          size="small"
          // onClick={() => handleToggleStatus(params.row.id, params.row.order_status)}
          style={{
            backgroundColor:
              params.value === "completed" ? "green" :
              params.value === "pending" ? "orange" :
              params.value === "cancelled" ? "red" :
              "gray",
            color: "white",
            textTransform: "capitalize",
          }}
        >
          {params.value}
        </Button>
      )
    },
    { field: "payment_method", headerName: "Payment Method", width: 150 },
    { field: "payment_status", headerName: "Payment Status", width: 150 },
    {
      field: "paid_amount",
      headerName: "Payment Amount",
      width: 150,
      renderCell: (params) => (
        <span style={{ fontWeight: 600 }}>
          ₹{Number(params.row.paid_amount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
        </span>
      )
    },
    { field: "paid_at", headerName: "Payment Date", width: 150 },
    
  ];

  const rows = orders.map((order) => ({
    id: order.id,
    buyer: order.buyer,
    seller: order.order_items.length > 0 ? order.order_items[0].product.seller : null,
    total_amount: order.total_amount,
    shipping_address: order.shipping_address,
    order_status: order.order_status,
    payment_method: order.payment.payment_method,
    payment_status: order.payment.payment_status,
    paid_amount: order.payment.amount,
    paid_at: order.payment.paid_at,
    
  }));

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Order Master", path: "/orders/order-master/view" }, { name: "View" }]} />
      </Box>

      <SimpleCard title="Order Master List">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            checkboxSelection
            autoHeight
          />
        )}
      </SimpleCard>
    </Container>
  );
}
