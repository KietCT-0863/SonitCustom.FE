/**
 * Hệ thống quản lý bản dịch tập trung cho toàn bộ ứng dụng
 */

// Bản dịch chung cho toàn bộ ứng dụng
export const commonTranslations = {
  en: {
    loadingText: 'Loading...',
    errorText: 'An error occurred',
    backButton: 'Back',
    viewDetails: 'View Details',
    addToCart: 'Add to Cart',
    buyNow: 'Buy Now',
    search: 'Search',
    filter: 'Filter',
    sort: 'Sort',
    price: 'Price',
    color: 'Color',
    quantity: 'Quantity',
    status: {
      inStock: 'In Stock',
      outOfStock: 'Out of Stock',
      preOrder: 'Pre-order',
      limitedEdition: 'Limited Edition'
    },
    notFound: 'Not Found',
    description: 'Description',
    features: 'Features',
    specifications: 'Specifications',
    relatedProducts: 'Related Products'
  },
  vi: {
    loadingText: 'Đang tải...',
    errorText: 'Đã xảy ra lỗi',
    backButton: 'Quay lại',
    viewDetails: 'Xem chi tiết',
    addToCart: 'Thêm vào giỏ hàng',
    buyNow: 'Mua ngay',
    search: 'Tìm kiếm',
    filter: 'Bộ lọc',
    sort: 'Sắp xếp',
    price: 'Giá',
    color: 'Màu sắc',
    quantity: 'Số lượng',
    status: {
      inStock: 'Còn hàng',
      outOfStock: 'Hết hàng',
      preOrder: 'Đặt trước',
      limitedEdition: 'Phiên bản giới hạn'
    },
    notFound: 'Không tìm thấy',
    description: 'Mô tả',
    features: 'Đặc điểm',
    specifications: 'Thông số kỹ thuật',
    relatedProducts: 'Sản phẩm liên quan'
  }
};

// Bản dịch cho trang chủ
export const homeTranslations = {
  en: {
    heroBanner: {
      title: 'EXCEED PRECISION',
      subtitle: 'ELEGANCE MEETS PERFORMANCE',
      description: 'Discover our collection of premium billiard cues and accessories',
      ctaButton: 'Explore Products',
      learnMore: 'Learn More'
    },
    featuredProducts: {
      title: 'FEATURED PRODUCTS',
      subtitle: 'Our most popular selections',
      viewAll: 'View All Products'
    },
    about: {
      title: 'ABOUT EXCEED',
      content: 'Excellence in every detail. EXCEED represents the pinnacle of billiard equipment craftsmanship, combining traditional techniques with cutting-edge technology.',
      learnMore: 'Our Story'
    },
    testimonials: {
      title: 'WHAT PLAYERS SAY',
      subtitle: 'Testimonials from professionals'
    }
  },
  vi: {
    heroBanner: {
      title: 'EXCEED CHÍNH XÁC',
      subtitle: 'SỰ TINH TẾ KẾT HỢP HIỆU SUẤT',
      description: 'Khám phá bộ sưu tập các cơ billiards cao cấp và phụ kiện',
      ctaButton: 'Khám phá sản phẩm',
      learnMore: 'Tìm hiểu thêm'
    },
    featuredProducts: {
      title: 'SẢN PHẨM NỔI BẬT',
      subtitle: 'Các lựa chọn phổ biến nhất',
      viewAll: 'Xem tất cả sản phẩm'
    },
    about: {
      title: 'VỀ EXCEED',
      content: 'Sự xuất sắc trong từng chi tiết. EXCEED đại diện cho đỉnh cao của nghề thủ công thiết bị billiard, kết hợp kỹ thuật truyền thống với công nghệ tiên tiến.',
      learnMore: 'Câu chuyện của chúng tôi'
    },
    testimonials: {
      title: 'NGƯỜI CHƠI NÓI GÌ',
      subtitle: 'Nhận xét từ các chuyên gia'
    }
  }
};

// Bản dịch cho các trang sản phẩm
export const productsTranslations = {
  en: {
    filters: {
      title: 'Filters',
      categories: 'Categories',
      priceRange: 'Price Range',
      colors: 'Colors',
      availability: 'Availability',
      apply: 'Apply Filters',
      clear: 'Clear All'
    },
    sorting: {
      title: 'Sort By',
      newest: 'Newest',
      priceAsc: 'Price: Low to High',
      priceDesc: 'Price: High to Low',
      popularity: 'Popularity'
    },
    pagination: {
      prev: 'Previous',
      next: 'Next',
      of: 'of'
    },
    emptyState: {
      title: 'No Products Found',
      description: 'Try adjusting your filters or search terms',
      button: 'Clear Filters'
    }
  },
  vi: {
    filters: {
      title: 'Bộ lọc',
      categories: 'Danh mục',
      priceRange: 'Khoảng giá',
      colors: 'Màu sắc',
      availability: 'Tình trạng',
      apply: 'Áp dụng bộ lọc',
      clear: 'Xóa tất cả'
    },
    sorting: {
      title: 'Sắp xếp theo',
      newest: 'Mới nhất',
      priceAsc: 'Giá: Thấp đến cao',
      priceDesc: 'Giá: Cao đến thấp',
      popularity: 'Phổ biến'
    },
    pagination: {
      prev: 'Trước',
      next: 'Sau',
      of: 'của'
    },
    emptyState: {
      title: 'Không tìm thấy sản phẩm',
      description: 'Hãy điều chỉnh bộ lọc hoặc từ khóa tìm kiếm',
      button: 'Xóa bộ lọc'
    }
  }
};

// Bản dịch cho trang chi tiết sản phẩm
export const productDetailTranslations = {
  en: {
    addToCart: 'Add to Cart',
    buyNow: 'Buy Now',
    inStock: 'In Stock',
    outOfStock: 'Out of Stock',
    description: 'Description',
    features: 'Features',
    specifications: 'Specifications',
    relatedProducts: 'Related Products',
    reviews: 'Reviews',
    writeReview: 'Write a Review',
    shareProduct: 'Share This Product',
    productCode: 'Product Code',
    madeIn: 'Made in',
    warranty: 'Warranty'
  },
  vi: {
    addToCart: 'Thêm vào giỏ hàng',
    buyNow: 'Mua ngay',
    inStock: 'Còn hàng',
    outOfStock: 'Hết hàng',
    description: 'Mô tả',
    features: 'Tính năng',
    specifications: 'Thông số kỹ thuật',
    relatedProducts: 'Sản phẩm liên quan',
    reviews: 'Đánh giá',
    writeReview: 'Viết đánh giá',
    shareProduct: 'Chia sẻ sản phẩm',
    productCode: 'Mã sản phẩm',
    madeIn: 'Sản xuất tại',
    warranty: 'Bảo hành'
  }
};

// Bản dịch cho layout chung và header/footer
export const layoutTranslations = {
  en: {
    header: {
      CUES: 'CUES',
      SHAFTS: 'SHAFTS',
      ACCESSORIES: 'ACCESSORIES',
      CASES: 'CASES',
      TECHNOLOGY: 'TECHNOLOGY',
      DEALER: 'FIND A DEALER',
      search: 'Search products...',
      account: 'Account',
      cart: 'Cart',
      wishlist: 'Wishlist',
      menu: 'Menu'
    },
    footer: {
      company: 'Company',
      aboutUs: 'About Us',
      contact: 'Contact',
      dealers: 'Dealers',
      support: 'Support',
      faq: 'FAQ',
      shipping: 'Shipping',
      returns: 'Returns',
      warranty: 'Warranty',
      legal: 'Legal',
      terms: 'Terms of Service',
      privacy: 'Privacy Policy',
      copyright: '© 2023 EXCEED. All rights reserved.',
      newsletter: 'Subscribe to our newsletter',
      subscribe: 'Subscribe',
      socialFollow: 'Follow us'
    }
  },
  vi: {
    header: {
      CUES: 'CƠ',
      SHAFTS: 'THÂN CƠ',
      ACCESSORIES: 'PHỤ KIỆN',
      CASES: 'TÚI ĐỰNG',
      TECHNOLOGY: 'CÔNG NGHỆ',
      DEALER: 'ĐẠI LÝ',
      search: 'Tìm kiếm sản phẩm...',
      account: 'Tài khoản',
      cart: 'Giỏ hàng',
      wishlist: 'Yêu thích',
      menu: 'Menu'
    },
    footer: {
      company: 'Công ty',
      aboutUs: 'Về chúng tôi',
      contact: 'Liên hệ',
      dealers: 'Đại lý',
      support: 'Hỗ trợ',
      faq: 'Câu hỏi thường gặp',
      shipping: 'Vận chuyển',
      returns: 'Đổi trả',
      warranty: 'Bảo hành',
      legal: 'Pháp lý',
      terms: 'Điều khoản dịch vụ',
      privacy: 'Chính sách bảo mật',
      copyright: '© 2023 EXCEED. Tất cả quyền được bảo lưu.',
      newsletter: 'Đăng ký nhận tin',
      subscribe: 'Đăng ký',
      socialFollow: 'Theo dõi chúng tôi'
    }
  }
};

// Hợp nhất tất cả bản dịch
export const allTranslations = {
  common: commonTranslations,
  home: homeTranslations,
  products: productsTranslations,
  productDetail: productDetailTranslations,
  layout: layoutTranslations,
  header: {
    en: {
      VIETNAMESE: 'Tiếng Việt',
      ENGLISH: 'English'
    },
    vi: {
      VIETNAMESE: 'Tiếng Việt',
      ENGLISH: 'English'
    }
  },
  footer: {
    en: {
      copyright: '© 2023 Sonit Custom. All rights reserved.'
    },
    vi: {
      copyright: '© 2023 Sonit Custom. Tất cả quyền được bảo lưu.'
    }
  },
  searchBar: {
    en: {
      placeholder: 'Search...'
    },
    vi: {
      placeholder: 'Tìm kiếm...'
    }
  },
  productFilter: {
    en: {
      title: 'Filter',
      reset: 'Reset'
    },
    vi: {
      title: 'Lọc',
      reset: 'Đặt lại'
    }
  },
  productCard: {
    en: {
      viewDetails: 'View Details'
    },
    vi: {
      viewDetails: 'Xem chi tiết'
    }
  },
  shafts: {
    en: {
      title: 'Shafts',
      description: 'Discover our premium shafts'
    },
    vi: {
      title: 'Thân Cơ',
      description: 'Khám phá các thân cơ cao cấp của chúng tôi'
    }
  },
  shaftDetail: {
    en: {
      title: 'Shaft Details',
      description: 'Specifications and details',
      features: 'Features',
      specs: 'Specifications',
      materials: 'Materials',
      related: 'Related Products',
      back: 'Back to Shafts'
    },
    vi: {
      title: 'Chi tiết thân cơ',
      description: 'Thông số kỹ thuật và chi tiết',
      features: 'Đặc điểm',
      specs: 'Thông số kỹ thuật',
      materials: 'Vật liệu',
      related: 'Sản phẩm liên quan',
      back: 'Quay lại trang Thân cơ'
    }
  },
  cues: {
    en: {
      title: 'Cues',
      description: 'Explore our premium billiard cues',
      filter: 'Filter',
      sort: 'Sort By'
    },
    vi: {
      title: 'Cơ Bi-a',
      description: 'Khám phá bộ sưu tập cơ bi-a cao cấp',
      filter: 'Lọc',
      sort: 'Sắp xếp theo'
    }
  },
  cueDetail: {
    en: {
      loading: 'Loading...',
      backButton: 'Back',
      color: 'Color:',
      quantity: 'Quantity:',
      addToCart: 'ADD TO CART',
      buyNow: 'BUY NOW',
      description: 'Description',
      features: 'Features',
      specifications: 'Specifications',
      relatedProducts: 'Related Cues',
      notFound: 'Cue not found',
      backToCues: 'Back to Cues'
    },
    vi: {
      loading: 'Đang tải...',
      backButton: 'Quay lại',
      color: 'Màu sắc:',
      quantity: 'Số lượng:',
      addToCart: 'THÊM VÀO GIỎ HÀNG',
      buyNow: 'MUA NGAY',
      description: 'Mô tả',
      features: 'Đặc điểm',
      specifications: 'Thông số kỹ thuật',
      relatedProducts: 'Cơ liên quan',
      notFound: 'Không tìm thấy cơ',
      backToCues: 'Quay lại trang Cơ'
    }
  },
  accessories: {
    en: {
      title: 'Accessories',
      description: 'Premium billiard accessories for enhanced play',
      filter: 'Filter',
      sort: 'Sort By'
    },
    vi: {
      title: 'Phụ Kiện',
      description: 'Phụ kiện bi-a cao cấp nâng cao trải nghiệm chơi',
      filter: 'Lọc',
      sort: 'Sắp xếp theo'
    }
  },
  accessoryDetail: {
    en: {
      loading: 'Loading...',
      backButton: 'Back',
      color: 'Color:',
      quantity: 'Quantity:',
      addToCart: 'ADD TO CART',
      buyNow: 'BUY NOW',
      description: 'Description',
      features: 'Features',
      specifications: 'Specifications',
      relatedProducts: 'Related Accessories',
      notFound: 'Accessory not found',
      backToAccessories: 'Back to Accessories'
    },
    vi: {
      loading: 'Đang tải...',
      backButton: 'Quay lại',
      color: 'Màu sắc:',
      quantity: 'Số lượng:',
      addToCart: 'THÊM VÀO GIỎ HÀNG',
      buyNow: 'MUA NGAY',
      description: 'Mô tả',
      features: 'Đặc điểm',
      specifications: 'Thông số kỹ thuật',
      relatedProducts: 'Phụ kiện liên quan',
      notFound: 'Không tìm thấy phụ kiện',
      backToAccessories: 'Quay lại trang Phụ kiện'
    }
  },
  cases: {
    en: {
      bannerTitle: 'EXCEED CASES',
      bannerDesc: 'Protect your equipment with our premium cases',
      searchPlaceholder: 'Search cases...',
      filter: 'Filter',
      sort: 'Sort By'
    },
    vi: {
      bannerTitle: 'TÚI ĐỰNG EXCEED',
      bannerDesc: 'Bảo vệ thiết bị của bạn với túi đựng cao cấp',
      searchPlaceholder: 'Tìm kiếm túi đựng...',
      filter: 'Lọc',
      sort: 'Sắp xếp theo'
    }
  },
  caseDetail: {
    en: {
      loading: 'Loading...',
      backButton: 'Back',
      color: 'Color:',
      quantity: 'Quantity:',
      addToCart: 'ADD TO CART',
      buyNow: 'BUY NOW',
      description: 'Description',
      features: 'Features',
      specifications: 'Specifications',
      relatedProducts: 'Related Cases',
      notFound: 'Case not found',
      backToCases: 'Back to Cases'
    },
    vi: {
      loading: 'Đang tải...',
      backButton: 'Quay lại',
      color: 'Màu sắc:',
      quantity: 'Số lượng:',
      addToCart: 'THÊM VÀO GIỎ HÀNG',
      buyNow: 'MUA NGAY',
      description: 'Mô tả',
      features: 'Đặc điểm',
      specifications: 'Thông số kỹ thuật',
      relatedProducts: 'Túi đựng liên quan',
      notFound: 'Không tìm thấy túi đựng',
      backToCases: 'Quay lại trang Túi đựng'
    }
  },
  technology: {
    en: {
      bannerTitle: 'OUR TECHNOLOGY',
      bannerDesc: 'Explore the innovations and advanced techniques behind Sonit Custom products',
      searchPlaceholder: 'Search articles...',
      filter: 'Filter',
      sort: 'Sort By',
      readMore: 'Read more',
      minRead: 'min read'
    },
    vi: {
      bannerTitle: 'CÔNG NGHỆ CỦA CHÚNG TÔI',
      bannerDesc: 'Khám phá những đổi mới và kỹ thuật tiên tiến đằng sau sản phẩm của Sonit Custom',
      searchPlaceholder: 'Tìm kiếm bài viết...',
      filter: 'Lọc',
      sort: 'Sắp xếp theo',
      readMore: 'Đọc tiếp',
      minRead: 'phút đọc'
    }
  },
  blogDetail: {
    en: {
      loading: 'Loading...',
      backButton: 'Back',
      relatedArticles: 'Related Articles',
      description: 'Article Content',
      features: 'Key Takeaways',
      specifications: 'Technical Details',
      notFound: 'Blog post not found',
      backToTech: 'Back to Technology page',
      category: 'Category: '
    },
    vi: {
      loading: 'Đang tải...',
      backButton: 'Quay lại',
      relatedArticles: 'Bài viết liên quan',
      description: 'Nội dung bài viết',
      features: 'Điểm chính',
      specifications: 'Chi tiết kỹ thuật',
      notFound: 'Không tìm thấy bài viết',
      backToTech: 'Quay lại trang công nghệ',
      category: 'Danh mục: '
    }
  }
};

/**
 * Hàm tiện ích để đăng ký bản dịch từ một component
 * @param {string} namespace - Tên namespace cho bản dịch
 * @param {object} translations - Đối tượng bản dịch với các khóa 'en' và 'vi'
 */
export function registerTranslations(namespace, translations) {
  if (!allTranslations[namespace]) {
    allTranslations[namespace] = translations;
  } else {
    // Merge với bản dịch hiện tại nếu đã tồn tại
    allTranslations[namespace] = {
      en: { ...allTranslations[namespace].en, ...translations.en },
      vi: { ...allTranslations[namespace].vi, ...translations.vi }
    };
  }
}

export default allTranslations; 