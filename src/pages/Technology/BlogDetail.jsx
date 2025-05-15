import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useLanguage, t } from '../../contexts/LanguageContext';
import './blogDetail.css';

// Bản dịch cho component BlogDetail
const blogDetailTranslations = {
  en: {
    loading: 'Loading...',
    backButton: 'Back',
    relatedArticles: 'Related Articles',
    description: 'Article Content',
    features: 'Key Takeaways',
    specifications: 'Technical Details',
    notFound: 'Blog post not found',
    backToTech: 'Back to Technology page',
    category: 'Category: ',
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
    category: 'Danh mục: ',
  }
};

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language, registerTranslations } = useLanguage();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('description');

  // Đăng ký bản dịch
  useEffect(() => {
    registerTranslations('blogDetail', blogDetailTranslations);
  }, [registerTranslations]);

  // Dữ liệu mẫu cho các bài viết blog chi tiết
  const blogPostsDetails = [
    {
      id: 1,
      title: {
        en: 'Advanced EX Pro Shaft Technology',
        vi: 'Công nghệ tiên tiến của thân cơ EX Pro'
      },
      category: 'shaft',
      date: '2023-12-15',
      image: '/assets/shaft-tech.jpg',
      author: {
        name: 'Nguyễn Văn A',
        avatar: '/assets/author1.jpg',
        role: {
          en: 'Technical Director',
          vi: 'Giám đốc kỹ thuật'
        }
      },
      content: {
        en: `<p>The EX Pro shaft represents the pinnacle of our technological advancement in cue engineering. After years of research and development, we've created a shaft that combines traditional craftsmanship with cutting-edge materials science.</p>
            
            <h2>Carbon Fiber Reinforcement</h2>
            <p>At the core of the EX Pro is our proprietary carbon fiber reinforcement system. Unlike conventional shafts that rely solely on wood properties, we've integrated a precision-engineered carbon fiber core that provides exceptional stability without compromising feel.</p>
            
            <p>The carbon fiber elements are strategically positioned to minimize deflection while maintaining the natural feedback that players expect from high-quality equipment. This structural innovation results in a shaft that stays straight even under the most demanding playing conditions.</p>
            
            <h2>Multi-Layer Construction</h2>
            <p>The EX Pro features our revolutionary multi-layer construction technique, where each layer serves a specific purpose:</p>
            
            <ul>
              <li><strong>Core layer:</strong> Carbon fiber reinforced spine for stability and consistent performance</li>
              <li><strong>Middle layer:</strong> Specially treated maple wood for traditional feel and vibration dampening</li>
              <li><strong>Outer layer:</strong> Premium-grade North American hard maple, hand-selected for grain quality and density</li>
            </ul>
            
            <p>This combination creates a shaft that offers the best of both worlds: modern performance advantages with the familiar feel that professionals demand.</p>
            
            <h2>Precision Manufacturing</h2>
            <img src="/assets/ex-pro-manufacturing.jpg" alt="EX Pro Manufacturing Process" class="content-image" />
            <p>Each EX Pro shaft undergoes a 23-step manufacturing process, including multiple stages of curing and conditioning. Our proprietary vacuum-pressing technology ensures perfect adhesion between layers, eliminating air pockets and inconsistencies that plague lesser quality shafts.</p>
            
            <p>The final product undergoes rigorous testing on our custom-built deflection measurement system, with only shafts meeting our strict specifications making it to market. This attention to detail is why professional players worldwide trust the EX Pro for tournament play.</p>
            
            <h2>Performance Benefits</h2>
            <p>Players using the EX Pro shaft report significant improvements in several key areas:</p>
            
            <ul>
              <li>Reduced deflection on off-center hits</li>
              <li>More consistent power transfer</li>
              <li>Improved accuracy on draw shots</li>
              <li>Enhanced feel for precise speed control</li>
              <li>Superior durability under tournament conditions</li>
            </ul>
            
            <p>The EX Pro shaft technology continues to evolve as we refine our manufacturing processes and incorporate feedback from top players around the world. This commitment to continuous improvement ensures that Sonit Custom remains at the forefront of cue technology innovation.</p>`,
        
        vi: `<p>Thân cơ EX Pro đại diện cho đỉnh cao của sự tiến bộ công nghệ trong kỹ thuật thiết kế cơ bi-a của chúng tôi. Sau nhiều năm nghiên cứu và phát triển, chúng tôi đã tạo ra một thân cơ kết hợp giữa kỹ thuật thủ công truyền thống với khoa học vật liệu hiện đại.</p>
            
            <h2>Gia cố bằng sợi carbon</h2>
            <p>Phần cốt lõi của EX Pro là hệ thống gia cố sợi carbon độc quyền của chúng tôi. Khác với các thân cơ thông thường chỉ dựa vào tính chất của gỗ, chúng tôi đã tích hợp lõi sợi carbon được thiết kế chính xác, mang lại độ ổn định đặc biệt mà không làm giảm cảm giác.</p>
            
            <p>Các thành phần sợi carbon được đặt ở vị trí chiến lược để giảm thiểu độ lệch trong khi vẫn duy trì phản hồi tự nhiên mà người chơi mong đợi từ thiết bị chất lượng cao. Sự đổi mới cấu trúc này tạo ra một thân cơ luôn thẳng ngay cả trong điều kiện chơi khắc nghiệt nhất.</p>
            
            <h2>Cấu trúc đa lớp</h2>
            <p>EX Pro có kỹ thuật cấu tạo đa lớp cách mạng, mỗi lớp đều phục vụ một mục đích cụ thể:</p>
            
            <ul>
              <li><strong>Lớp lõi:</strong> Cột sống được gia cố bằng sợi carbon để ổn định và hiệu suất nhất quán</li>
              <li><strong>Lớp giữa:</strong> Gỗ phong đã được xử lý đặc biệt để tạo cảm giác truyền thống và giảm rung</li>
              <li><strong>Lớp ngoài:</strong> Gỗ phong cứng Bắc Mỹ cao cấp, được chọn lọc thủ công về chất lượng vân và mật độ</li>
            </ul>
            
            <p>Sự kết hợp này tạo ra thân cơ mang lại những ưu điểm tốt nhất của cả hai thế giới: lợi thế hiệu suất hiện đại với cảm giác quen thuộc mà các chuyên gia đòi hỏi.</p>
            
            <h2>Sản xuất chính xác</h2>
            <img src="/assets/ex-pro-manufacturing.jpg" alt="Quy trình sản xuất EX Pro" class="content-image" />
            <p>Mỗi thân cơ EX Pro trải qua quy trình sản xuất 23 bước, bao gồm nhiều giai đoạn xử lý và điều hòa. Công nghệ ép chân không độc quyền của chúng tôi đảm bảo sự kết dính hoàn hảo giữa các lớp, loại bỏ các túi khí và sự không đồng đều thường gặp ở các thân cơ chất lượng thấp hơn.</p>
            
            <p>Sản phẩm cuối cùng trải qua kiểm tra nghiêm ngặt trên hệ thống đo lường độ lệch tùy chỉnh của chúng tôi, chỉ những thân cơ đáp ứng các thông số kỹ thuật nghiêm ngặt của chúng tôi mới được đưa ra thị trường. Sự chú ý đến từng chi tiết này là lý do tại sao các cầu thủ chuyên nghiệp trên toàn thế giới tin tưởng EX Pro cho các giải đấu.</p>
            
            <h2>Lợi ích hiệu suất</h2>
            <p>Người chơi sử dụng thân cơ EX Pro báo cáo những cải tiến đáng kể trong một số lĩnh vực chính:</p>
            
            <ul>
              <li>Giảm độ lệch khi đánh không chính tâm</li>
              <li>Truyền lực nhất quán hơn</li>
              <li>Độ chính xác cao hơn khi đánh lườn</li>
              <li>Cảm giác tinh tế hơn để kiểm soát tốc độ chính xác</li>
              <li>Độ bền vượt trội trong điều kiện thi đấu</li>
            </ul>
            
            <p>Công nghệ thân cơ EX Pro tiếp tục phát triển khi chúng tôi cải tiến quy trình sản xuất và kết hợp phản hồi từ các cầu thủ hàng đầu trên thế giới. Cam kết cải tiến liên tục này đảm bảo rằng Sonit Custom luôn đi đầu trong đổi mới công nghệ cơ bi-a.</p>`
      },
      keyTakeaways: {
        en: [
          'Carbon fiber core technology for optimal performance',
          'Three-layer construction balances stability and feel',
          '23-step precision manufacturing process',
          'Reduced deflection for improved accuracy',
          'Continuously evolving based on professional player feedback'
        ],
        vi: [
          'Công nghệ lõi sợi carbon cho hiệu suất tối ưu',
          'Cấu trúc ba lớp cân bằng độ ổn định và cảm giác',
          'Quy trình sản xuất chính xác 23 bước',
          'Giảm độ lệch để tăng độ chính xác',
          'Liên tục phát triển dựa trên phản hồi từ các cầu thủ chuyên nghiệp'
        ]
      },
      specs: {
        en: {
          manufacturer: 'Sonit Custom',
          material: 'Carbon Fiber & North American Maple',
          diameterRange: '11.75mm - 13mm',
          weight: '90-120g',
          taper: 'Pro Taper'
        },
        vi: {
          manufacturer: 'Sonit Custom',
          material: 'Sợi Carbon & Gỗ Phong Bắc Mỹ',
          diameterRange: '11.75mm - 13mm',
          weight: '90-120g',
          taper: 'Pro Taper'
        }
      },
      relatedPosts: [2, 3, 6]
    },
    {
      id: 2,
      title: {
        en: 'G-Core System: Perfect Balance and Control',
        vi: 'Hệ thống G-Core: Cân bằng và kiểm soát hoàn hảo'
      },
      category: 'shaft',
      date: '2023-11-20',
      image: '/assets/g-core.jpg',
      author: {
        name: 'Trần Thị B',
        avatar: '/assets/author2.jpg',
        role: {
          en: 'Engineering Lead',
          vi: 'Trưởng nhóm kỹ thuật'
        }
      },
      content: {
        en: `<p>Our G-Core system represents a breakthrough in shaft technology, combining graphite reinforcement with traditional wood craftsmanship. This article explores the technical aspects and playing benefits of this innovative design.</p>`,
        vi: `<p>Hệ thống G-Core của chúng tôi đại diện cho một bước đột phá trong công nghệ thân cơ, kết hợp gia cố graphite với kỹ thuật chế tác gỗ truyền thống. Bài viết này khám phá các khía cạnh kỹ thuật và lợi ích chơi của thiết kế sáng tạo này.</p>`
      },
      keyTakeaways: {
        en: ['Graphite reinforcement for increased stability', 'Traditional wood feel maintained'],
        vi: ['Gia cố graphite để tăng độ ổn định', 'Duy trì cảm giác gỗ truyền thống']
      },
      specs: {
        en: {
          manufacturer: 'Sonit Custom',
          material: 'Graphite & Maple',
          diameterRange: '12mm - 13mm',
          weight: '95-115g'
        },
        vi: {
          manufacturer: 'Sonit Custom',
          material: 'Graphite & Gỗ Phong',
          diameterRange: '12mm - 13mm',
          weight: '95-115g'
        }
      },
      relatedPosts: [1, 3, 5]
    },
    {
      id: 3,
      title: {
        en: 'Exceed Butt Technology Innovation',
        vi: 'Đổi mới công nghệ đuôi cơ Exceed'
      },
      category: 'butt',
      date: '2023-10-05',
      image: '/assets/butt-tech.jpg',
      author: {
        name: 'Lê Văn C',
        avatar: '/assets/author3.jpg',
        role: {
          en: 'Product Designer',
          vi: 'Nhà thiết kế sản phẩm'
        }
      },
      content: {
        en: `<p>The butt section of a cue is often overlooked, but at Sonit Custom, we've revolutionized butt technology to enhance overall performance. Learn about our weight distribution system and vibration dampening techniques.</p>`,
        vi: `<p>Phần đuôi của cơ thường bị bỏ qua, nhưng tại Sonit Custom, chúng tôi đã cách mạng hóa công nghệ đuôi cơ để nâng cao hiệu suất tổng thể. Tìm hiểu về hệ thống phân phối trọng lượng và kỹ thuật giảm rung của chúng tôi.</p>`
      },
      keyTakeaways: {
        en: ['Advanced weight distribution system', 'Vibration dampening technology'],
        vi: ['Hệ thống phân phối trọng lượng tiên tiến', 'Công nghệ giảm rung']
      },
      specs: {
        en: {
          manufacturer: 'Sonit Custom',
          material: 'Premium Maple & Composite Materials',
          weight: '350-450g'
        },
        vi: {
          manufacturer: 'Sonit Custom',
          material: 'Gỗ Phong Cao Cấp & Vật Liệu Tổng Hợp',
          weight: '350-450g'
        }
      },
      relatedPosts: [1, 5, 6]
    },
    {
      id: 4,
      title: {
        en: 'Manufacturing Excellence: Inside Our Factory',
        vi: 'Sự xuất sắc trong sản xuất: Bên trong nhà máy của chúng tôi'
      },
      category: 'manufacturing',
      date: '2023-09-12',
      image: '/assets/cue-factory.jpg',
      author: {
        name: 'Phạm Văn D',
        avatar: '/assets/author4.jpg',
        role: {
          en: 'Factory Manager',
          vi: 'Quản lý nhà máy'
        }
      },
      content: {
        en: `<p>Take a virtual tour of our state-of-the-art manufacturing facility where traditional craftsmanship meets modern technology. This behind-the-scenes look reveals our commitment to quality control and precision.</p>`,
        vi: `<p>Tham quan ảo cơ sở sản xuất hiện đại của chúng tôi, nơi kỹ năng thủ công truyền thống kết hợp với công nghệ hiện đại. Cái nhìn hậu trường này cho thấy cam kết của chúng tôi đối với kiểm soát chất lượng và độ chính xác.</p>`
      },
      keyTakeaways: {
        en: ['Blend of traditional craftsmanship and modern technology', 'Strict quality control standards'],
        vi: ['Kết hợp giữa kỹ năng thủ công truyền thống và công nghệ hiện đại', 'Tiêu chuẩn kiểm soát chất lượng nghiêm ngặt']
      },
      specs: {
        en: {
          facility: 'State-of-the-art 50,000 sq ft facility',
          equipment: 'CNC machines & traditional hand tools',
          capacity: '1000 cues per month'
        },
        vi: {
          facility: 'Cơ sở hiện đại rộng 4,500 m²',
          equipment: 'Máy CNC và dụng cụ thủ công truyền thống',
          capacity: '1000 cây cơ mỗi tháng'
        }
      },
      relatedPosts: [5, 6, 1]
    },
    {
      id: 5,
      title: {
        en: 'Material Science: Wood Selection Secrets',
        vi: 'Khoa học vật liệu: Bí mật lựa chọn gỗ'
      },
      category: 'materials',
      date: '2023-08-28',
      image: '/assets/wood-selection.jpg',
      author: {
        name: 'Nguyễn Thị E',
        avatar: '/assets/author5.jpg',
        role: {
          en: 'Materials Specialist',
          vi: 'Chuyên gia vật liệu'
        }
      },
      content: {
        en: `<p>The selection of wood is crucial to creating high-performance cues. This detailed guide explains our wood sourcing, aging process, and the scientific testing we conduct to ensure only the finest materials make it into our products.</p>`,
        vi: `<p>Việc lựa chọn gỗ là yếu tố quan trọng để tạo ra những cây cơ hiệu suất cao. Hướng dẫn chi tiết này giải thích quá trình tìm kiếm nguồn gỗ, quá trình lão hóa và các thử nghiệm khoa học chúng tôi tiến hành để đảm bảo chỉ những vật liệu tốt nhất được đưa vào sản phẩm của chúng tôi.</p>`
      },
      keyTakeaways: {
        en: ['Rigorous wood selection process', 'Scientific density and moisture testing', 'Proprietary aging methods'],
        vi: ['Quy trình lựa chọn gỗ nghiêm ngặt', 'Kiểm tra khoa học về mật độ và độ ẩm', 'Phương pháp lão hóa độc quyền']
      },
      specs: {
        en: {
          woodTypes: 'North American Hard Maple, Cocobolo, Purpleheart, Bocote',
          agingPeriod: '3-5 years minimum',
          grading: 'Proprietary 10-point system'
        },
        vi: {
          woodTypes: 'Gỗ phong cứng Bắc Mỹ, Cocobolo, Purpleheart, Bocote',
          agingPeriod: 'Tối thiểu 3-5 năm',
          grading: 'Hệ thống đánh giá độc quyền 10 điểm'
        }
      },
      relatedPosts: [3, 4, 6]
    },
    {
      id: 6,
      title: {
        en: 'Innovation in Joint Systems',
        vi: 'Đổi mới trong hệ thống khớp nối'
      },
      category: 'joints',
      date: '2023-07-15',
      image: '/assets/joint-systems.jpg',
      author: {
        name: 'Đỗ Văn F',
        avatar: '/assets/author6.jpg',
        role: {
          en: 'R&D Manager',
          vi: 'Quản lý R&D'
        }
      },
      content: {
        en: `<p>The joint is where science meets art in cue design. Our proprietary joint systems provide perfect alignment and energy transfer while maintaining the feel players demand. Discover the engineering behind our revolutionary joint designs.</p>`,
        vi: `<p>Khớp nối là nơi khoa học gặp gỡ nghệ thuật trong thiết kế cơ bi-a. Hệ thống khớp nối độc quyền của chúng tôi cung cấp sự căn chỉnh hoàn hảo và chuyển giao năng lượng hiệu quả trong khi vẫn duy trì cảm giác mà người chơi yêu cầu. Khám phá kỹ thuật đằng sau thiết kế khớp nối cách mạng của chúng tôi.</p>`
      },
      keyTakeaways: {
        en: ['Perfect alignment technology', 'Enhanced energy transfer', 'Multiple joint options for different play styles'],
        vi: ['Công nghệ căn chỉnh hoàn hảo', 'Tăng cường chuyển giao năng lượng', 'Nhiều tùy chọn khớp nối cho các phong cách chơi khác nhau']
      },
      specs: {
        en: {
          types: 'Stainless Steel, Titanium, Wood-to-Wood',
          threadPitch: 'Precision 5/16 x 18',
          alignmentSystem: 'Radial Perfection™ Technology'
        },
        vi: {
          types: 'Thép không gỉ, Titan, Gỗ-với-Gỗ',
          threadPitch: 'Độ chính xác 5/16 x 18',
          alignmentSystem: 'Công nghệ Radial Perfection™'
        }
      },
      relatedPosts: [1, 2, 3]
    }
  ];

  useEffect(() => {
    // Giả lập việc tải dữ liệu từ API
    setLoading(true);
    setTimeout(() => {
      const foundPost = blogPostsDetails.find(post => post.id === parseInt(id));
      setPost(foundPost);
      setLoading(false);
    }, 500);
  }, [id]);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'vi' ? 'vi-VN' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Lấy các bài viết liên quan
  const getRelatedPosts = () => {
    if (!post) return [];
    return post.relatedPosts.map(relatedId => 
      blogPostsDetails.find(p => p.id === relatedId)
    );
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleRelatedPostClick = (postId) => {
    navigate(`/technology/blog/${postId}`);
  };

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const getCategoryName = (category) => {
    switch (category) {
      case 'shaft': return language === 'vi' ? 'Công nghệ thân cơ' : 'Shaft Technology';
      case 'butt': return language === 'vi' ? 'Công nghệ đuôi cơ' : 'Butt Technology';
      case 'manufacturing': return language === 'vi' ? 'Sản xuất' : 'Manufacturing';
      case 'materials': return language === 'vi' ? 'Vật liệu' : 'Materials';
      case 'joints': return language === 'vi' ? 'Hệ thống khớp nối' : 'Joint Systems';
      default: return category;
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="not-found">
        <h2>{t('blogDetail.notFound')}</h2>
        <Link to="/technology" className="back-link">
          {t('blogDetail.backToTech')}
        </Link>
      </div>
    );
  }

  return (
    <div className="product-detail-page blog-detail-page">
      <div className="back-button-container">
        <button className="back-button" onClick={handleBack}>
          <i className="fas fa-arrow-left"></i> {t('blogDetail.backButton')}
        </button>
      </div>
      
      <div className="product-detail-container blog-detail-container">
        <div className="product-detail-left blog-detail-left">
          <div className="product-main-image blog-featured-image">
            <img src={post.image} alt={post.title[language]} />
          </div>
        </div>
        
        <div className="product-detail-right blog-detail-right">
          <h1 className="product-title blog-title">{post.title[language]}</h1>
          
          <div className="blog-meta">
            <div className="author-info">
              <img src={post.author.avatar} alt={post.author.name} className="author-avatar" />
              <div className="author-details">
                <span className="author-name">{post.author.name}</span>
                <span className="author-role">{post.author.role[language]}</span>
              </div>
            </div>
            <div className="post-info">
              <span className="post-date">{formatDate(post.date)}</span>
              <span className="post-category">{t('blogDetail.category')} {getCategoryName(post.category)}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="product-details-tabs blog-details-tabs">
        <div className="tabs-header">
          <div 
            className={`tab ${selectedTab === 'description' ? 'active' : ''}`}
            onClick={() => handleTabClick('description')}
          >
            {t('blogDetail.description')}
          </div>
          {post.keyTakeaways && (
            <div 
              className={`tab ${selectedTab === 'features' ? 'active' : ''}`}
              onClick={() => handleTabClick('features')}
            >
              {t('blogDetail.features')}
            </div>
          )}
          {post.specs && (
            <div 
              className={`tab ${selectedTab === 'specifications' ? 'active' : ''}`}
              onClick={() => handleTabClick('specifications')}
            >
              {t('blogDetail.specifications')}
            </div>
          )}
        </div>
        
        <div className="tab-content">
          {selectedTab === 'description' && (
            <div className="description-tab blog-content" dangerouslySetInnerHTML={{ __html: post.content[language] }}></div>
          )}
          
          {selectedTab === 'features' && post.keyTakeaways && (
            <div className="features-tab">
              <ul className="key-takeaways-list">
                {post.keyTakeaways[language].map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          
          {selectedTab === 'specifications' && post.specs && (
            <div className="specifications-tab">
              <table className="specs-table">
                <tbody>
                  {Object.entries(post.specs[language]).map(([key, value], index) => (
                    <tr key={index}>
                      <th>{key.charAt(0).toUpperCase() + key.slice(1)}</th>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      
      <div className="related-products-section related-posts-section">
        <h2>{t('blogDetail.relatedArticles')}</h2>
        <div className="related-products-grid related-posts-grid">
          {getRelatedPosts().map(relatedPost => (
            <div 
              key={relatedPost.id} 
              className="related-card"
              onClick={() => handleRelatedPostClick(relatedPost.id)}
            >
              <div className="related-image">
                <img src={relatedPost.image} alt={relatedPost.title[language]} />
              </div>
              <div className="related-content">
                <h4>{relatedPost.title[language]}</h4>
                <span className="related-date">{formatDate(relatedPost.date)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail; 