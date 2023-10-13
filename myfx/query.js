function productSortAndPaging(keyword, category, sort, page) {
  const pageSize = 12;
  const currentPage = page || 1;
  const skip = (currentPage - 1) * pageSize;

  let whereClause = "";
  if (keyword) {
    whereClause = `WHERE p.name LIKE ?`;
  } else if (category) {
    whereClause = `WHERE p.categoryId = '${category}'`;
  }

  const orderBy =
    sort === "new"
      ? "ORDER BY p.createAt DESC"
      : sort === "max_price"
      ? "ORDER BY p.discountPrice DESC, p.name ASC"
      : sort === "min_price"
      ? "ORDER BY p.discountPrice ASC, p.name ASC"
      : "ORDER BY p.discount DESC, p.name ASC";

  const limitClause = `LIMIT ? OFFSET ?`;

  const query = `
    SELECT p.*, c.category
    FROM product p
    JOIN category c ON p.categoryId = c.categoryId
    ${whereClause}
    ${orderBy}
    ${limitClause};
  `;

  return { query, pageSize, skip };
}

module.exports = { productSortAndPaging };
