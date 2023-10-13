function productMapping(items) {
  const content = items.map(
    ({
      productName,
      price,
      discount,
      discountPrice,
      startDate,
      endDate,
      imageUrl,
      productId,
      _id,
    }) => ({
      productName,
      price,
      discount,
      discountPrice,
      startDate,
      endDate,
      imageUrl,
      productId,
      _id,
    })
  );
  return content;
}
