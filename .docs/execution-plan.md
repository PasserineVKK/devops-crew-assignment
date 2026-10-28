# KẾ HOẠCH THỰC THI CHI TIẾT (FER202 - LAB 1 ĐẾN LAB 6)
> **Tài liệu tham chiếu chuẩn cho đồ án môn FER202**  
> Mục tiêu: Xây dựng lộ trình bài bản, chuẩn kiến trúc, phân chia component khoa học để các Lab kế thừa nhau mượt mà mà không phải đập đi viết lại.

---

## 🏗️ 1. Cấu Trúc Thư Mục Chuẩn (Project Architecture)

Khi phát triển từ Lab 1 đến Lab 6, dự án sẽ mở rộng dần. Để không bị xáo trộn, ta tổ chức thư mục theo cấu trúc chuẩn công nghiệp (Feature & Layer based):

```text
SE200481/
├── .docs/                          # Chứa tài liệu đề bài và kế hoạch
│   ├── labs-instruction.md
│   └── execution-plan.md
├── public/                         # Tài nguyên tĩnh không cần compile qua Vite
│   └── images/                     # Ảnh hoa lan dự phòng nếu link URL bị hỏng
├── src/
│   ├── assets/                     # Logo, icon, hình nền
│   ├── components/                 # Các UI component tái sử dụng
│   │   ├── common/                 # Header/Navbar, Footer, ThemeToggle, Modal,...
│   │   └── orchids/                # OrchidsContainer, OrchidsList, OrchidCard,...
│   ├── data/                       # Dữ liệu tĩnh (Lab 1 -> Lab 4)
│   │   └── ListOfOrchids.js
│   ├── hooks/                      # Custom React Hooks (Lab 2 -> Lab 6)
│   │   ├── useTheme.js             # Quản lý Dark/Light mode
│   │   └── useFetch.js             # Custom hook gọi API (nếu cần)
│   ├── pages/                      # Các trang theo Route (Lab 3 -> Lab 6)
│   │   ├── HomePage.jsx
│   │   ├── DetailPage.jsx
│   │   ├── AboutPage.jsx
│   │   ├── NaturalPage.jsx
│   │   ├── ContactPage.jsx
│   │   ├── ProfilePage.jsx         # Trang giới thiệu cá nhân (Lab 5)
│   │   └── AdminPage.jsx           # Quản lý CRUD (Lab 6)
│   ├── redux/                      # Quản lý State tập trung (Lab 6)
│   │   ├── store.js
│   │   └── slices/
│   │       ├── orchidSlice.js
│   │       └── authSlice.js
│   ├── services/                   # Cấu hình gọi API (Lab 6)
│   │   └── api.js                  # Axios instance / Fetch base
│   ├── scss/                       # Cấu trúc SCSS chuẩn (Lab 5)
│   │   ├── _variables.scss
│   │   ├── _mixins.scss
│   │   ├── _profile.scss
│   │   └── main.scss
│   ├── App.jsx                     # Component gốc điều phối Route & Theme
│   ├── index.css                   # Global styles & Theme variables
│   └── main.jsx                    # Entry point của React
├── package.json
└── vite.config.js
```

---

## 🎨 2. Bảng Màu Thiết Kế Chuẩn (Color Palette - Light & Dark Themes)

Hệ màu chính thức áp dụng xuyên suốt từ **Lab 1 đến Lab 6** (đặc biệt đồng bộ với **Dark/Light Mode ở Lab 2** và **SCSS Variables ở Lab 5**):

### ☀️ Chế độ Sáng (Light Theme)
| Mã Màu Hex | Vai trò / Ứng dụng | Mô tả trực quan |
| :--- | :--- | :--- |
| **`#050A38`** | **Heading / Text Darkest** | Màu chữ tiêu đề chính, navbar brand, độ tương phản cao nhất trên nền sáng |
| **`#0C145F`** | **Primary Dark / Card Borders** | Viền card, tiêu đề phụ, các nút phụ (secondary buttons) |
| **`#192BCC`** | **Brand Primary** | Màu thương hiệu chủ đạo, nút bấm chính (CTA Buttons), active navigation links |
| **`#4F61FF`** | **Accent / Hover** | Hiệu ứng hover card/nút, badge nổi bật (`isSpecial`), link hover |

### 🌙 Chế độ Tối (Dark Theme - Hệ Xanh Na Uy, Header & Footer Lighter Blue, Không Dùng Đen)
| Mã Màu Hex | Vai trò / Ứng dụng | Mô tả trực quan |
| :--- | :--- | :--- |
| **`#0B192C`** | **Dark Main Background** | Nền chính toàn trang (Xanh Na Uy - Norwegian Navy Blue), thay thế hoàn toàn màu đen |
| **`#1E3A5F`** | **Header & Footer Dark** | Header và Footer ở Dark mode (màu xanh nhạt hơn nền chính, tuyệt đối không dùng đen) |
| **`#13243B`** | **Dark Card Background** | Nền thẻ hoa lan và modal ở chế độ tối |
| **`#F472B6` / `#BE185D`** | **Pink Accent & Active Links** | Điểm nhấn hồng pastel / fuchsia cho nút active, rating, badge, icons |

### 💻 Khai báo biến chuẩn trong CSS (`index.css`):
```css
/* src/index.css */
:root {
  /* Light Theme */
  --bg-main: #FDF2F8;
  --bg-card: #FFFFFF;
  --color-heading: #1a42bb;
  --color-dark: #23395d;
}

[data-theme='dark'] {
  /* Dark Theme - Xanh Na Uy & Header/Footer xanh nhạt hơn, không dùng đen */
  --bg-main: #0B192C;
  --bg-card: #13243B;
  --bg-card-subtle: #192D48;
  --border-light: #244167;
  --border-card: #1F3859;
  /* Header & Footer: #1E3A5F (Lighter Norwegian Blue) */
}
```

```scss
/* src/scss/_variables.scss */
// Light Theme Palette
$light-heading: #050A38;
$light-dark:    #0C145F;
$light-primary: #192BCC;
$light-accent:  #4F61FF;

// Dark Theme Palette
$dark-primary:   #7E88FF;
$dark-secondary: #ABB3FF;
$dark-muted:     #CBD0FF;
$dark-heading:   #E8EAFF;
```

---

## 📋 3. Kế Hoạch Chi Tiết Từng Lab

---

### 🌸 LAB 1: React Components & Container/Presentational Pattern ✅ (Đã hoàn thành)

#### 1. Mục tiêu cốt lõi:
- Khởi tạo data 16 hoa lan đầy đủ thuộc tính trong `ListOfOrchids.js` với ảnh chuẩn loài lưu cục bộ tại `public/images/`.
- Áp dụng triệt để mô hình **Container and Presentational Pattern**:
  - **Container**: Quản lý dữ liệu và logic.
  - **Presentational**: Chỉ nhận props và hiển thị giao diện, không can thiệp logic dữ liệu.

#### 2. Thư viện & Công cụ thực tế sử dụng:
- **UI Framework:** Cài đặt sẵn `react-bootstrap` & `bootstrap` (kèm `lucide-react` cho icons).
- **Thành phần React-Bootstrap sử dụng:** `Navbar`, `Container`, `Nav`, `Navbar.Brand`, `Navbar.Toggle`, `Navbar.Collapse`, `Nav.Link`, `Card`, `Card.Img`, `Card.Body`, `Card.Title`.
- **CSS Grid & Flexbox:** Phân chia lưới hoa lan responsive tự co giãn.

#### 3. Bảng Phân Chia Components Thực Tế:
| Tên Component | Loại | Trách nhiệm |
| :--- | :--- | :--- |
| `src/data/ListOfOrchids.js` | Data Source | Mảng 16 objects hoa lan. 16 ảnh thực vật chuẩn loài được lưu tại `public/images/orchid-1.jpg` -> `orchid-16.jpg`. |
| `OrchidsContainer.jsx` | **Container** | Import mảng hoa lan từ `ListOfOrchids.js`. Nắm giữ state danh sách hoa, truyền dữ liệu qua props cho component con. |
| `Orchids.jsx` | **Presentational** | Nhận prop `orchids`. Dùng hàm `.map()` để lặp qua danh sách và render ra lưới card. |
| `OrchidCard.jsx` | **Presentational** | Sử dụng `Card` của React-Bootstrap. Render ảnh, tên, badge (Natural/Special), rating `{rating} <Star />`, màu sắc, số like, nút xem chi tiết. |
| `Navbar.jsx` / `Footer.jsx` | **Presentational** | Navbar chuẩn React-Bootstrap; Footer gọn gàng, định hình layout website. |

#### 4. Các thay đổi và tinh chỉnh theo yêu cầu:
1. **Dữ liệu & Ảnh:** Lưu toàn bộ 16 ảnh hoa lan chuẩn loài thực tế vào thư mục nội bộ `public/images/` để tải tức thì, tránh phụ thuộc link ngoài.
2. **Đơn giản hóa Rating:** Xóa bỏ hàm lặp `renderStars`, hiển thị trực quan dạng `{rating} <Star />`.
3. **Palette màu:** Hệ màu Xanh Navy (`#0B132B`) + Trắng (`#FFFFFF`) + Hồng Pastel (`#FDF2F8`, `#FCE7F3`, `#FBCFE8`, `#EC4899`).
4. **Không Gradient:** 100% sử dụng màu đơn sắc phẳng (flat colors) sắc nét, không dùng bất kỳ hiệu ứng gradient nào.
5. **Clean Code & Comments:** Loại bỏ toàn bộ các comment hiển nhiên thừa thãi, chỉ giữ code tự giải thích; nếu có comment thì luôn viết thường, không quá 5 từ, tập trung vào danh từ/động từ.
6. **Layout Chi tiết Card:** Giữ nguyên thông tin xuất xứ và màu sắc dạng thoáng đãng, không đóng khung viền. Bỏ gạch chân mục active trên Navbar.

---

### 🌓 LAB 2: React Hooks & Custom Hook Theme System ✅ (Đã hoàn thành)

#### 1. Mục tiêu cốt lõi:
- Xây dựng **Modal pop-up** xem thông tin chi tiết hoa lan (kèm clip video) khi click nút "View Details" trên từng card.
- Chuyển đổi giao diện **Dark Mode / Light Mode** mượt mà cho toàn bộ website, lưu trạng thái trong `localStorage`.
- Viết Custom Hook `useTheme` chuyên trách logic đổi theme.

#### 2. Thư viện & Công cụ thực tế sử dụng:
- React Hooks: `useState`, `useEffect`.
- `react-bootstrap`: `Modal`, `Modal.Header`, `Modal.Title`, `Modal.Body`, `Modal.Footer`.
- Icons: `lucide-react` (`Sun`, `Moon`, `MapPin`, `Heart`, `Star`, `Sparkles`, `Leaf`, `Film`, `ArrowRight`).
- CSS Variables & `[data-theme='dark']` trong `index.css`: Flat color 100% (không gradient), palette Navy Blue + White + Pastel Pink.

#### 3. Bảng Phân Chia Components Thực Tế:
| Tên File / Component | Loại | Trách nhiệm |
| :--- | :--- | :--- |
| `src/hooks/useTheme.js` | **Custom Hook** | Quản lý state theme (`'light'` hoặc `'dark'`), tự động đồng bộ `localStorage` và cập nhật thuộc tính `data-theme` trên thẻ `<html>`. |
| `ThemeToggle.jsx` | **Presentational** | Nút chuyển đổi giao diện với icon Mặt trời (`Sun`) / Mặt trăng (`Moon`), gọi hàm `toggleTheme`. |
| `Navbar.jsx` (Nâng cấp) | **Presentational** | Tích hợp nút `ThemeToggle` cạnh toggle menu của Navbar, nhận `theme` và `toggleTheme` qua props. |
| `OrchidModal.jsx` | **Presentational** | Pop-up chi tiết hoa lan dùng React-Bootstrap `Modal`: hiển thị ảnh lớn, badges (Special, Natural), rating, likes, xuất xứ, màu sắc, phân loại (Wild Natural / Cultivated Hybrid) và video clip YouTube nhúng. |
| `OrchidsContainer.jsx` (Nâng cấp) | **Container** | Quản lý state `selectedOrchid`. Truyền hàm `setSelectedOrchid` xuống card qua props `onSelectOrchid`. Khi có hoa được chọn, hiển thị `<OrchidModal>`. |
| `Orchids.jsx` & `OrchidCard.jsx` | **Presentational** | Nút "View Details" kích hoạt sự kiện `onSelect(orchid)` để mở modal. |
| `App.jsx` (Nâng cấp) | **Container** | Gọi hook `useTheme()`, truyền `theme` và `toggleTheme` xuống `Navbar`. |

#### 4. Các thay đổi và kết quả đạt được:
1. **Custom Hook `useTheme`:** Xử lý clean, tự động fallback về `'light'` nếu chưa có dữ liệu trong `localStorage`.
2. **Modal Chi tiết & Video Showcase:** Thiết kế giao diện phẳng 2 cột, hỗ trợ nhúng video YouTube mượt mà từ trường dữ liệu `clip`.
3. **Tuân thủ bảng màu & Không Gradient:** Màu nền Dark mode sử dụng Midnight Navy (`#070C1E`), card `#0F172A`, text `#F8FAFC`, accent hồng pastel `#F472B6` và viền `#4A1530`. Tất cả đều là màu flat nguyên bản.
4. **Clean Code & Build:** Loại bỏ hoàn toàn các comment thừa, kiểm thử `npm run build` thành công 100% không cảnh báo hay lỗi.

---

### 🧭 LAB 3: React Router Navigation & Filtered Routes ✅ (Đã hoàn thành)

#### 1. Mục tiêu cốt lõi:
- Đưa hệ thống điều hướng SPA đa trang vào React App qua URL (`/`, `/natural`, `/special`, `/detail/:id`, `/contact`).
- Đọc tham số URL động (Route Parameters) qua `useParams()` để hiển thị trang chi tiết độc lập `DetailPage`.
- Tích hợp tính năng lọc danh sách theo yêu cầu: Click menu `Natural` hiển thị hoa tự nhiên (`isNatural === true`), click `Special` hiển thị hoa đặc biệt (`isSpecial === true`).
- Sử dụng chuẩn `Nav.Link as={NavLink} to="..."` trên thanh điều hướng React-Bootstrap.

#### 2. Thư viện & Công cụ thực tế sử dụng:
- Package: `react-router-dom` (`BrowserRouter`, `Routes`, `Route`, `NavLink`, `Link`, `useParams`, `Navigate`).
- Icons: `lucide-react` (`ArrowLeft`, `Eye`, `MapPin`, `Star`, `Heart`, `Sparkles`, `Leaf`, `Film`, `Phone`, `Mail`, `Clock`, `Send`, `SunMedium`, `Droplets`).
- Layout & Theme: 100% flat color, không gradient; đồng bộ Dark mode Xanh Na Uy (`#0B192C`), Header & Footer (`#1E3A5F`), tuyệt đối không dùng đen.

#### 3. Bảng Phân Chia Pages & Components Thực Tế:
| Tên File | Loại | Trách nhiệm |
| :--- | :--- | :--- |
| `src/main.jsx` | Entry Wrapper | Bọc `<App />` bên trong `<BrowserRouter>` để kích hoạt cơ chế định tuyến client-side. |
| `src/App.jsx` (Nâng cấp) | Route Dispatcher | Khai báo `<Routes>` với 5 routes chính: `/`, `/natural`, `/special`, `/detail/:id`, `/contact`, và fallback redirect về `/`. |
| `src/components/common/Navbar.jsx` (Nâng cấp) | Navigation | Sử dụng `<Nav.Link as={NavLink} to="..." end>` cho Home, Natural, Special, Contact; tự động highlight `.active` không gạch chân. |
| `src/pages/HomePage.jsx` | Page | Trang chủ hiển thị toàn bộ 16 hoa lan (`filter="all"`). |
| `src/pages/NaturalPage.jsx` | Page | Trang lọc hiển thị danh sách hoa lan tự nhiên (`isNatural === true`). |
| `src/pages/SpecialPage.jsx` | Page | Trang lọc hiển thị danh sách hoa lan đặc biệt (`isSpecial === true`). |
| `src/pages/DetailPage.jsx` | Page | Lấy `:id` qua hook `useParams()`. Hiển thị thông số chi tiết chuẩn thực vật học, ảnh lớn, video YouTube nhúng (`clip`), hướng dẫn chăm sóc, breadcrumbs và nút quay lại. |
| `src/pages/ContactPage.jsx` | Page | Trang liên hệ gồm 4 thẻ thông tin vườn lan, form gửi thắc mắc tương tác và bản đồ Google Maps nhúng. |
| `src/components/orchids/OrchidCard.jsx` (Nâng cấp) | Presentational | Nút "View Details" chuyển sang dùng `<Link to={`/detail/${id}`}>`; tích hợp thêm nút preview nhanh mở modal pop-up. |
| `src/components/orchids/OrchidsContainer.jsx` | Container | Nhận prop `filter` (`'all'`, `'natural'`, `'special'`) để lọc danh sách hoa lan trước khi truyền xuống `Orchids`. |

#### 4. Các thay đổi và kết quả đạt được:
1. **Lọc hoa lan theo Navigation:** Click `Natural` trên Navbar chuyển sang route `/natural` chỉ render hoa có `isNatural = true`; click `Special` sang `/special` chỉ render hoa có `isSpecial = true`.
2. **Trang chi tiết chuẩn mực:** Route `/detail/:id` tìm hoa theo ID, hiển thị đầy đủ thông số thực vật, ảnh chất lượng cao và video clip YouTube sinh động.
3. **Form Liên hệ & Bản đồ:** Route `/contact` đầy đủ các thông tin thực tế, form gửi inquiry có phản hồi trực quan.
4. **Kiểm thử Build:** `npm run build` hoàn thành với **0 lỗi, 0 cảnh báo**.

---

### 🎨 LAB 4: React UI Library & Video Clips ✅ (Đã hoàn thành)

#### 1. Mục tiêu cốt lõi:
- Tích hợp toàn diện thư viện UI chính thức: **React-Bootstrap & Bootstrap** (kèm `bootstrap-icons`) để chuẩn hóa toàn bộ layout và các components.
- Xây dựng đầy đủ các routes theo đề bài: Trang chủ (`/`), Trang tự nhiên (`/natural`), Trang đặc biệt (`/special`), Trang giới thiệu (`/about`), Trang chi tiết (`/detail/:id` & fallback `/detail`), Trang liên hệ (`/contact`).
- Khai thác tối đa các components từ React-Bootstrap: `Container`, `Row`, `Col`, `Card`, `Modal`, `Tabs`, `Tab`, `Accordion` (FAQ collapsible), `Navbar`, `Nav`, `Badge`, `Button`, `Form`, `Alert`.
- Cập nhật trường `clip` trong `ListOfOrchids.js` và nhúng video YouTube iframe responsive tỉ lệ 16:9 vào cả Modal pop-up lẫn Tab Video trong `DetailPage`.

#### 2. Thư viện & Công cụ thực tế sử dụng:
- **UI Frameworks:** `react-bootstrap` (v2.10.x), `bootstrap` (v5.3.x), `bootstrap-icons` (v1.13.x).
- **Import CSS:** `bootstrap/dist/css/bootstrap.min.css` và `bootstrap-icons/font/bootstrap-icons.css` tại `src/main.jsx`.
- **Icons:** `lucide-react` kết hợp `bootstrap-icons`.
- **CSS System:** Thiết kế 100% Flat Colors (không dùng gradient), tích hợp đồng bộ Dark Mode Xanh Na Uy (`#0B192C`), Header & Footer xanh nhạt hơn (`#1E3A5F`), Card (`#13243B`), Pink/Blue accents.

#### 3. Bảng Phân Chia Components & Pages Thực Tế:
| Tên File | Loại | Trách nhiệm & React-Bootstrap Components sử dụng |
| :--- | :--- | :--- |
| `src/main.jsx` | Entry point | Import Bootstrap CSS và Bootstrap-Icons CSS để toàn app dùng chung. |
| `src/App.jsx` | Router Dispatcher | Định tuyến đầy đủ 6 routes: `/`, `/natural`, `/special`, `/about`, `/contact`, `/detail/:id`, kèm fallback `/detail` và `*`. |
| `src/components/common/Navbar.jsx` | Navigation | Sử dụng `Navbar`, `Container`, `Nav`, `Nav.Link as={NavLink}` bổ sung liên kết `About` điều hướng mượt mà. |
| `src/pages/AboutPage.jsx` (Mới) | Page | Trang giới thiệu Vườn Lan OrchidHaven:<br>- **`Tabs` & `Tab`**: Chia 3 tab thông tin (Sứ mệnh bảo tồn, Dấu ấn thành tựu, Đội ngũ chuyên gia thực vật).<br>- **`Accordion`**: Danh mục câu hỏi thường gặp FAQ (Collapsible) giải đáp thắc mắc về hoa lan.<br>- **`Card` & Grid (`Row`, `Col`, `Container`)**: Phân bố bố cục responsive chuẩn mực. |
| `src/pages/DetailPage.jsx` (Nâng cấp) | Page | Redesign toàn diện bằng React-Bootstrap `Container`, `Row`, `Col`, `Card`, `Badge`, `Button`, `Tabs`, `Tab`:<br>- **Tab 1 ("Botanical Profile")**: Xuất xứ, màu sắc, phân họ, tình trạng hoang dã.<br>- **Tab 2 ("Care Guidelines")**: Thẻ hướng dẫn ánh sáng, tưới nước, nhiệt độ, giá thể.<br>- **Tab 3 ("Video Showcase")**: Iframe trình chiếu clip YouTube hoa lan tỉ lệ 16:9.<br>- **Tab 4 ("Conservation & Community")**: Tình trạng bảo tồn và lượt yêu thích cộng đồng. |
| `src/pages/ContactPage.jsx` (Nâng cấp) | Page | Sử dụng React-Bootstrap `Container`, `Row`, `Col`, `Card`, `Form` (`Form.Group`, `Form.Label`, `Form.Control`), `Button`, `Alert` hiển thị thông báo thành công khi gửi inquiry. |
| `src/components/orchids/OrchidModal.jsx` | Presentational | Dùng `Modal`, `Modal.Header`, `Modal.Title`, `Modal.Body`, `Modal.Footer` nhúng video clip và thông số nhanh. |
| `src/data/ListOfOrchids.js` | Data Source | Đảm bảo 100% 16 hoa lan đều có trường `clip: "https://www.youtube.com/embed/..."`. |
| `src/index.css` | Styling | Định nghĩa styling chuẩn cho `.nav-tabs`, `.accordion`, cards, badges, buttons ở cả Light Mode và Dark Mode (Xanh Na Uy, không gradient). |

#### 4. Các thay đổi và kết quả đạt được:
1. **Hoàn thiện đầy đủ các Routes theo yêu cầu:** `/`, `/detail/:id` (kèm `/detail`), `/about`, `/natural`, `/special`, `/contact`.
2. **Khai thác đầy đủ các UI Library Components:** Đầy đủ `Modal`, `Tab` / `Tabs`, `Collapsible` (`Accordion`), `Navbar`, `Nav`, `Card`, `Badge`, `Button`, `Form`, `Alert`.
3. **Trình chiếu Video Clips:** Cả Modal preview và Trang chi tiết đều nhúng video YouTube iframe mượt mà.
4. **Kiểm thử Kiểm tra Chất lượng Code:**
   - Lệnh `npm run build`: Hoàn thành thành công 100%, 0 lỗi.
   - Lệnh `npm run lint`: ESLint kiểm tra toàn bộ mã nguồn đạt 0 lỗi, 0 cảnh báo.

---

### 💎 LAB 5: CSS Preprocessors (SCSS) ⏭️ (Bỏ qua theo yêu cầu)

> *Ghi chú: Bước này được bỏ qua theo yêu cầu của người dùng để ưu tiên thực hiện trực tiếp LAB 6.*

---

### ⚡ LAB 6: Fetch API, MockAPI.io, Redux Toolkit, Formik & Yup, Google Auth ✅ (Đã hoàn thành)

#### 1. Mục tiêu cốt lõi:
- Chuyển giao toàn bộ dữ liệu tĩnh sang mô hình **RESTful API** tương tác với dịch vụ `mockapi.io` qua `axios`.
- Quản lý trạng thái ứng dụng tập trung bằng **Redux Toolkit (RTK)**: `orchidSlice` (CRUD hoa lan) và `authSlice` (phân quyền quản trị).
- Xây dựng form Thêm/Sửa hoa lan với cơ chế kiểm duyệt dữ liệu nghiêm ngặt bằng **Formik** và **Yup schema validation**.
- Tích hợp **Google Authentication** (`@react-oauth/google`) kèm cơ chế Instant 1-Click Demo Login để cấp quyền Curator Admin thực hiện các thao tác quản trị POST, PUT, DELETE.
- Thiết kế giao diện quản trị **Admin Dashboard** (`/admin`) trực quan với bảng dữ liệu responsive, tìm kiếm, lọc theo danh mục, nút sửa và modal xác nhận xóa an toàn.

#### 2. Thư viện & Công cụ thực tế sử dụng:
- **State Management:** `@reduxjs/toolkit` (v2.x), `react-redux` (v9.x).
- **HTTP Client:** `axios` (v1.x).
- **Form & Validation:** `formik` (v2.x), `yup` (v1.x).
- **Authentication:** `@react-oauth/google` (v0.12.x).
- **UI & Grid:** React-Bootstrap (`Table`, `Modal`, `Form`, `Button`, `Badge`, `Card`, `Alert`, `InputGroup`, `Row`, `Col`).

#### 3. Bảng Phân Chia Kiến Trúc Redux & Logic Thực Tế:
| Tên File | Vai trò | Trách nhiệm |
| :--- | :--- | :--- |
| `src/services/api.js` | HTTP Service | Khởi tạo Axios client kết nối MockAPI endpoint (có hỗ trợ cache localStorage & fallback nếu mất mạng hoặc API rate limit). |
| `src/redux/store.js` | Central Store | Kết hợp `orchidReducer` và `authReducer` vào Redux store duy nhất. |
| `src/redux/slices/orchidSlice.js` | Redux Slice | Quản lý state danh sách hoa lan với 4 Async Thunks: <br>- `fetchOrchids`: GET danh sách hoa lan từ API.<br>- `createOrchid`: POST tạo hoa lan mới.<br>- `updateOrchid`: PUT cập nhật hoa lan theo ID.<br>- `deleteOrchid`: DELETE xóa hoa lan khỏi database.<br>- Quản lý trạng thái `loading`, `error`, `successMessage`. |
| `src/redux/slices/authSlice.js` | Redux Slice | Quản lý trạng thái phiên đăng nhập: `user`, `isAuthenticated`, `isAdmin`; lưu trữ phiên vào `localStorage`. |
| `src/components/common/GoogleLoginBtn.jsx` | Auth UI | Nút đăng nhập Google tích hợp `@react-oauth/google` (giải mã JWT) + nút Demo Google Login 1-click; menu Dropdown hiển thị thông tin Curator và nút Sign Out. |
| `src/components/orchids/OrchidFormModal.jsx` | Form Modal | Modal Thêm/Sửa hoa lan dùng **Formik** + **Yup** validate 10 trường: `name` (min 3 ký tự), `rating` (1-5), `image` (bắt buộc), `origin`, `category`, `color`, `numberOfLike`, `clip` (URL), `isSpecial`, `isNatural`. |
| `src/pages/AdminPage.jsx` | Admin Dashboard | Trang quản lý danh sách dạng bảng (`/admin`):<br>- Bảo vệ phiên (Auth Guard: yêu cầu đăng nhập Google để truy cập).<br>- Tìm kiếm theo tên/chi/nước xuất xứ, lọc theo phân loại.<br>- Nút Thêm mới mở modal Formik.<br>- Thao tác Sửa (chỉnh sửa thông tin) và Xóa (kèm pop-up xác nhận an toàn). |
| `src/components/common/Navbar.jsx` | Navigation | Bổ sung link điều hướng `Manage` (`/admin`) và tích hợp component `GoogleLoginBtn`. |
| `src/components/orchids/OrchidsContainer.jsx` | Container | Đọc dữ liệu hoa lan từ Redux store qua `useSelector` để đồng bộ real-time khi có thay đổi từ Admin. |
| `src/pages/DetailPage.jsx` | Page | Đọc chi tiết hoa lan từ Redux store qua `useSelector`. |
| `src/main.jsx` | App Wrapper | Bọc `<Provider store={store}>` và `<GoogleOAuthProvider>`. |

#### 4. Các thay đổi và kết quả đạt được:
1. **CRUD hoàn thiện 100%:** Người dùng có thể thêm hoa lan mới, chỉnh sửa thông tin, và xóa hoa lan. Dữ liệu được cập nhật tức thì vào Redux Store và phản ánh ngay lập tức trên Trang chủ, Trang Natural, Trang Special, Trang Chi tiết và Trang Admin.
2. **Kiểm tra form bằng Formik + Yup:** Báo lỗi trực tiếp dưới từng input nếu người dùng nhập sai định dạng hoặc thiếu trường bắt buộc.
3. **Phân quyền Google Login:** Đăng nhập hiển thị avatar/tên người dùng, cấp quyền truy cập tính năng quản trị CRUD.
4. **Kiểm thử Kiểm tra Chất lượng Code:**
   - Lệnh `npm run lint`: **0 lỗi, 0 cảnh báo** (100% clean).
   - Lệnh `npm run build`: **Build thành công 100%**, mã nguồn tối ưu chuẩn production.

---

## 🎯 3. Thứ Tự Triển Khai Khuyến Nghị & Checkpoints

Để quá trình làm bài đạt điểm tuyệt đối và không bị quá tải:

1. **Giai đoạn 1**: Hoàn thành **Lab 1** thật chỉn chu. Dữ liệu chuẩn, UI đẹp mắt là chìa khóa để các Lab sau kế thừa nhẹ nhàng.
2. **Giai đoạn 2**: Thêm **Lab 2** (Theme Dark/Light + Modal detail) ngay trên nền Lab 1.
3. **Giai đoạn 3**: Chuyển đổi sang **Lab 3** (React Router) chia trang Home, Detail, Contact.
4. **Giai đoạn 4**: Trang hoàng lại bằng UI Library ở **Lab 4** và bổ sung video clips.
5. **Giai đoạn 5**: Viết riêng trang Profile bằng SCSS ở **Lab 5** (đáp ứng đúng yêu cầu SCSS).
6. **Giai đoạn 6**: Hoàn thiện toàn bộ hệ thống API + Redux + Formik + Google Login ở **Lab 6**.
