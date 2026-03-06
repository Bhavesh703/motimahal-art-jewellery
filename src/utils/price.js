export const getFinalPrice = (product) => {
  if (product.priceSale && product.priceSale < product.priceOriginal) {
    return Number(product.priceSale);
  }
  return Number(product.priceOriginal || 0);
};

export const hasDiscount = (product) => {
  return (
    product.priceSale &&
    product.priceOriginal &&
    product.priceSale < product.priceOriginal
  );
};

export const getDiscountPercent = (product) => {
  if (!hasDiscount(product)) return 0;

  return Math.round(
    ((product.priceOriginal - product.priceSale) / product.priceOriginal) * 100,
  );
};
