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

  validatePatch = async ({ name, price, discount, description }) => {
    if (!name && !price && !discount && !description) {
      return { message: "업데이트할 내용이 존재하지 않습니다." };
    }
    const updatedFields = {};
    if (name) updatedFields.name = name;
    if (price) updatedFields.price = price;
    if (discount) {
      updatedFields.discount = discount;
      const discountPrice =
        Math.floor((price * ((100 - discount) * 0.01)) / 10) * 10;
      updatedFields.discountPrice = discountPrice;
    }
    if (description) updatedFields.description = description;
    return updatedFields;
  };

  patchProductImage = async (productId, filename) => {
    const productImage = `${config.url.devUrl}${filename}`;
    const result = await this.productRepository.updateImageUrlById(
      productId,
      productImage
    );
    return result;
  };

  patchProductById = async (productId, updatedFields) => {
    const updatedProduct = await this.productRepository.updateProduct(
      productId,
      updatedFields
    );
    return updatedProduct;
  };

  allPickReadProduct = async () => {
    const isMDPick = 1;
    const pickedProducts = await this.productRepository.getProductByPick(
      isMDPick
    );
    if (pickedProducts.length > 6) {
      return pickedProducts.slice(0, 6);
    }
    return pickedProducts;
  };

  pickedProduct = async (productId) => {
    let newIsMDPick = "";
    const product = await this.productRepository.findById(productId);
    if (product.isMDPick === 0) {
      newIsMDPick = 1;
    } else {
      newIsMDPick = 0;
    }
    const pickedProduct = await this.productRepository.updateIsMDPickById(
      productId,
      newIsMDPick
    );
    return pickedProduct;
  };
}

module.exports = AdminProductService;
