class ProductService {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  readAllProduct = async (sort, page) => {
    const allProducts = await this.productRepository.getAllProducts(sort, page);
    return allProducts;
  };
}

module.exports = ProductService;
