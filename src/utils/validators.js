export const isValidEmail = (value) =>
  /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(String(value).toLowerCase());

export const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
