export const formatPrice = (price) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export const dateFormat = (date) => {
  return new Date(date).toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const getBadgeStatus = (status) => {
  switch (status) {
    case "Pending":
      return "orange";
    case "Processing":
      return "blue";
    case "Completed":
      return "green";
    case "Cancelled":
      return "red";
    default:
      return "grey";
  }
};
