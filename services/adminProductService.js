const config = require("../config");

class AdminProductService {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  allReadProduct = async (page) => {
    const limit = 10;
    const startPage = (page - 1) * limit;
    const total = await this.productRepository.totalCountProduct();
    const pagingData = await this.productRepository.getProductByPage(
      limit,
      startPage
    );
    const pageInfo = {
      currentPage: page,
      totalPage: Math.ceil(total / limit),
      prevPage: page > 1 ? page - 1 : null,
      nextPage: startPage + limit < total ? page + 1 : null,
    };

    return { pageInfo, pagingData };
  };

  validateProduct = async ({
    filename,
    category,
    name,
    price,
    description,
  }) => {
    if (!filename || !category || !name || !price || !description) {
      return {
        message: "필수 입력값이 누락되었습니다. 값을 전부 입력해주세요.",
      };
    }
    return "ok";
  };

  createProduct = async ({
    filename,
    category,
    name,
    price,
    discount,
    discountPrice,
    description,
  }) => {
    const imageUrl = `${config.url.devUrl}${filename}`;
    if (discount === undefined || discount === 0) {
      discount = 0;
      discountPrice = price;
    } else {
      discountPrice = Math.floor((price * ((100 - discount) * 0.01)) / 10) * 10;
    }
    const createdProduct = await this.productRepository.createProduct(
      imageUrl,
      category,
      name,
      price,
      discount,
      discountPrice,
      description
    );
    return createdProduct;
  };
}

module.exports = AdminProductService;
