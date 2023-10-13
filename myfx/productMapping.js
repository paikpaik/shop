function productMapping(items) {
  const content = items.map(
    ({
      category,
      name,
      price,
      discount,
      discountPrice,
      imageUrl,
      description,
    }) => ({
      category,
      name,
      price,
      discount,
      discountPrice,
      imageUrl,
      description,
    })
  );
  return content;
}

module.exports = { productMapping };
