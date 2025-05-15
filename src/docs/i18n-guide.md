# Hướng dẫn sử dụng hệ thống đa ngôn ngữ trong Sonit Custom

Hệ thống đa ngôn ngữ được xây dựng để dễ dàng áp dụng vào tất cả các component trong ứng dụng. Tài liệu này sẽ hướng dẫn cách sử dụng hệ thống này.

## Cấu trúc hệ thống

Hệ thống đa ngôn ngữ dựa trên hai file chính:
- `src/contexts/LanguageContext.jsx`: Quản lý ngôn ngữ hiện tại và cung cấp các công cụ dịch
- `src/contexts/translations.js`: Chứa tất cả các bản dịch và hàm đăng ký bản dịch

## Cách sử dụng cơ bản

### 1. Sử dụng hook `useLanguage`

```jsx
import { useLanguage } from '../contexts/LanguageContext';

const MyComponent = () => {
  const { language, t } = useLanguage();
  
  return (
    <div>
      <h1>{t('common.loadingText')}</h1>
      <p>{language === 'en' ? 'English text' : 'Tiếng Việt'}</p>
    </div>
  );
};
```

### 2. Sử dụng hàm tiện ích `t`

```jsx
import { t } from '../contexts/LanguageContext';

const MyComponent = () => {
  return (
    <div>
      <button>{t('common.backButton')}</button>
      <p>{t('products.emptyState.title', 'Default text if key not found')}</p>
    </div>
  );
};
```

### 3. Dịch trạng thái sản phẩm

```jsx
import { useLanguage } from '../contexts/LanguageContext';

const ProductStatus = ({ status }) => {
  const { translateStatus } = useLanguage();
  
  return <span className="status">{translateStatus(status)}</span>;
};
```

## Cách thêm bản dịch mới

### 1. Thêm bản dịch vào file `translations.js`

Bạn có thể mở rộng các namespace hiện có hoặc thêm namespace mới:

```javascript
// Thêm bản dịch cho tính năng giỏ hàng
export const cartTranslations = {
  en: {
    title: 'Shopping Cart',
    empty: 'Your cart is empty',
    checkout: 'Proceed to Checkout',
    // ...
  },
  vi: {
    title: 'Giỏ hàng',
    empty: 'Giỏ hàng của bạn đang trống',
    checkout: 'Tiến hành thanh toán',
    // ...
  }
};

// Thêm vào allTranslations
export const allTranslations = {
  common: commonTranslations,
  // ... các namespace khác
  cart: cartTranslations
};
```

### 2. Đăng ký bản dịch từ component

Nếu bạn muốn tách bản dịch ra khỏi file chính, bạn có thể đăng ký bản dịch từ component:

```jsx
import { useLanguage } from '../contexts/LanguageContext';

// Bản dịch cho component này
const localTranslations = {
  en: {
    heading: 'Product Reviews',
    submitReview: 'Submit Review',
    // ...
  },
  vi: {
    heading: 'Đánh giá sản phẩm',
    submitReview: 'Gửi đánh giá',
    // ...
  }
};

const ReviewsComponent = () => {
  const { registerTranslations, t } = useLanguage();
  
  // Đăng ký bản dịch của component
  useEffect(() => {
    registerTranslations('reviews', localTranslations);
  }, [registerTranslations]);
  
  return (
    <div>
      <h2>{t('reviews.heading')}</h2>
      <button>{t('reviews.submitReview')}</button>
    </div>
  );
};
```

## Quy tắc đặt tên key

Để dễ dàng quản lý, hãy tuân theo các quy tắc sau khi đặt tên cho key:

1. Sử dụng cấu trúc phân cấp: `namespace.section.element`
2. Sử dụng camelCase cho key
3. Namespace nên phản ánh tính năng hoặc trang
4. Ví dụ:
   - `common.buttons.submit`
   - `products.filters.priceRange`
   - `checkout.form.paymentMethod`

## Namespace hiện có

Hiện tại hệ thống có các namespace sau:

- `common`: Các text chung dùng trong toàn bộ ứng dụng
- `home`: Các text cho trang chủ
- `products`: Các text cho trang sản phẩm
- `productDetail`: Các text cho trang chi tiết sản phẩm
- `layout`: Các text cho layout, header và footer

## Các ký tự đặc biệt và định dạng

- **Biến**: Nếu cần đưa biến vào chuỗi, hãy sử dụng các hàm helper:

```jsx
const formatWithVariable = (text, variable) => {
  return text.replace('{0}', variable);
};

// Sử dụng
<p>{formatWithVariable(t('common.itemCount'), count)}</p>
```

- **Định dạng số và ngày**: Sử dụng các hàm định dạng theo từng ngôn ngữ

```jsx
const formatPrice = (price, language) => {
  return language === 'en' 
    ? `$${price.toFixed(2)}` 
    : `${price.toLocaleString('vi-VN')}₫`;
};
```

## Lưu ý

- Không đưa các chuỗi dịch trực tiếp vào code, luôn sử dụng hệ thống đa ngôn ngữ
- Nếu bạn thấy chuỗi chưa được dịch, hãy thêm vào file translations.js
- Kiểm tra hiển thị trên cả hai ngôn ngữ khi phát triển tính năng mới
- Luôn cung cấp giá trị mặc định khi sử dụng hàm `t()` 