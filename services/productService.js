const { productMapping } = require("../myfx/productMapping");

class ProductService {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  readAllProduct = async (sort, page) => {
    const allProducts = await this.productRepository.getAllProducts(sort, page);
    const content = await productMapping(allProducts);
    if (content.length === 0) {
      return { message: "등록된 상품이 없습니다." };
    }
    return content;
  };

  readSearchProduct = async (keyword, sort, page) => {
    if (!keyword) {
      return { message: "검색어를 입력해주세요." };
    }
    const searchProducts = await this.productRepository.getSearchProducts(
      keyword,
      sort,
      page
    );
    const content = await productMapping(searchProducts);
    if (content.length === 0) {
      return { message: "검색된 상품이 없습니다." };
    }
    return content;
  };

  readCategoryProduct = async (category, sort, page) => {
    if (!category) {
      return { message: "해당 카테고리가 존재하지 않습니다." };
    }
    const categoryProducts = await this.productRepository.getCategoryProducts(
      category,
      sort,
      page
    );
    const content = await productMapping(categoryProducts);
    if (content.length === 0) {
      return { message: "현재 해당 카테고리에는 상품이 없습니다." };
    }
    return content;
  };
}

module.exports = ProductService;
