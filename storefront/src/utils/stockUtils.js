// utils/stockUtils.js
import { CheckCircle, Error as ErrorIcon, Warning } from "@mui/icons-material";

export const getStockConfig = (stockLevel, theme) => {
  const config = {
    in_stock: {
      text: "In Stock",
      color: theme.palette.success.main,
      icon: <CheckCircle fontSize="small" />,
      buttonText: "Add to Cart",
      disabled: false,
      progressValue: 100,
    },
    out_of_stock: {
      text: "Out of Stock",
      color: theme.palette.error.main,
      icon: <ErrorIcon fontSize="small" />,
      buttonText: "Sold Out",
      disabled: true,
      progressValue: 0,
    },
    low_stock: {
      text: "Low Stock - Order Soon!",
      color: theme.palette.warning.main,
      icon: <Warning fontSize="small" />,
      buttonText: "Add to Cart",
      disabled: false,
      progressValue: 30,
    },
  };
  return config[stockLevel] || config.in_stock;
};

export const StockIndicator = ({ stockLevel, theme, size = "medium" }) => {
  const config = getStockConfig(stockLevel, theme);

  return (
    <Chip
      icon={config.icon}
      label={config.text}
      size={size}
      sx={{
        backgroundColor: config.color,
        color: theme.palette.getContrastText(config.color),
        fontWeight: "bold",
      }}
    />
  );
};

export const StockProgressBar = ({ stockLevel, theme }) => {
  const config = getStockConfig(stockLevel, theme);

  return (
    <LinearProgress
      variant="determinate"
      value={config.progressValue}
      sx={{
        height: 6,
        borderRadius: 3,
        "& .MuiLinearProgress-bar": {
          backgroundColor: config.color,
          borderRadius: 3,
        },
      }}
    />
  );
};
