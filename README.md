# Kurosawa Website

<p align="center">
  <a href="https://lxvvckzqcevbnrokfnxw.supabase.co/storage/v1/object/sign/kurosawa-bucket/media/kcv-logo?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5Xzc1MzI5ZTViLWY1MWQtNDMyYi1hMmYxLTNjZTViMWI2ZGE0ZCJ9.eyJ1cmwiOiJrdXJvc2F3YS1idWNrZXQvbWVkaWEva2N2LWxvZ28iLCJpYXQiOjE3NDg1MjMyMTIsImV4cCI6MTc0ODU2NjQxMn0.QReLBs7-HTFxvJkzJeszJAbNPYvTKk9AVSuW_Q-NAvU" target="_blank">
    <img src="https://lxvvckzqcevbnrokfnxw.supabase.co/storage/v1/object/sign/kurosawa-bucket/media/kcv-logo?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5Xzc1MzI5ZTViLWY1MWQtNDMyYi1hMmYxLTNjZTViMWI2ZGE0ZCJ9.eyJ1cmwiOiJrdXJvc2F3YS1idWNrZXQvbWVkaWEva2N2LWxvZ28iLCJpYXQiOjE3NDg1MjMyMTIsImV4cCI6MTc0ODU2NjQxMn0.QReLBs7-HTFxvJkzJeszJAbNPYvTKk9AVSuW_Q-NAvU" alt="Kurosawa Vietnam Logo" width="150"/>
  </a>
</p>

Trang web của Kurosawa Vietnam Group, một công ty dịch vụ tư vấn kế toán và thuế.

## Mục Lục

* [Giới Thiệu](#giới-thiệu)
* [Công Nghệ Sử Dụng](#công-nghệ-sử-dụng)
* [Tính Năng Nổi Bật](#tính-năng-nổi-bật)
* [Yêu Cầu Tiên Quyết](#yêu-cầu-tiên-quyết)
* [Cài Đặt Và Khởi Chạy](#cài-đặt-và-khởi-chạy)
    * [Các Bước Cài Đặt](#các-bước-cài-đặt)
    * [Khởi Chạy Dự Án](#khởi-chạy-dự-án)
* [Sử Dụng](#sử-dụng)
* [Cấu Trúc Thư Mục Quan Trọng](#cấu-trúc-thư-mục-quan-trọng)
* [Đóng Góp](#đóng-góp)
* [Giấy Phép](#giấy-phép)
* [Liên Hệ](#liên-hệ)

## Giới Thiệu

Dự án này xây dựng trang web chính thức cho Kurosawa Vietnam Group, cung cấp thông tin về các dịch vụ tư vấn kế toán và thuế của công ty. Trang web được quản lý nội dung một cách linh hoạt thông qua Admin Dashboard được xây dựng bằng PayloadCMS.

## Công Nghệ Sử Dụng

* **Frontend:** Next.js, TailwindCSS
* **Backend & CMS:** PayloadCMS
* **Database:** PostgreSQL (thường được tích hợp với PayloadCMS hoặc Supabase)
* **Storage:** Supabase Storage (cho lưu trữ file, media)
* **Package Manager:** pnpm

## Tính Năng Nổi Bật

* Giao diện website hiện đại, thân thiện với người dùng.
* Trang Admin Dashboard mạnh mẽ được xây dựng bằng PayloadCMS để quản lý toàn bộ nội dung website (bài viết, dịch vụ, thông tin công ty, v.v.).
* Tích hợp Supabase Storage để lưu trữ và quản lý media.

## Yêu Cầu Tiên Quyết

Trước khi bắt đầu, hãy đảm bảo bạn đã có:

* Node.js (phiên bản tương thích với Next.js và PayloadCMS)
* pnpm (Package manager)
* Tài khoản Supabase và đã tạo một **Supabase Storage Bucket**.

## Cài Đặt Và Khởi Chạy

### Các Bước Cài Đặt

1.  **Clone repository (nếu chưa có):**
    ```bash
    git clone https://github.com/k1enttt/kurosawa-agency.git kurosawa-website
    cd kurosawa-website
    ```

2.  **Thiết lập Supabase Storage:**
    * Truy cập vào tài khoản Supabase của bạn.
    * Tạo một Storage Bucket mới nếu chưa có. Ghi lại thông tin cần thiết (URL, public/private keys) để cấu hình trong tệp `.env`.

3.  **Cấu hình biến môi trường:**
    * Tạo một tệp `.env` trong thư mục gốc của dự án bằng cách sao chép từ tệp `.env.example`.
        ```bash
        cp .env.example .env
        ```
    * Mở tệp `.env` và điền các giá trị cần thiết cho các biến môi trường, đặc biệt là các thông tin kết nối đến Supabase (URL, service key, etc.) và các cấu hình khác cho PayloadCMS.

4.  **Cài đặt dependencies:**
    ```bash
    pnpm install
    ```

### Khởi Chạy Dự Án

* **Chế độ phát triển (Development):**
    ```bash
    pnpm run dev
    ```
    Mở trình duyệt và truy cập `http://localhost:3000` (hoặc port được cấu hình trong dự án).

* **Chế độ production:**
    ```bash
    pnpm run build
    pnpm start
    ```

## Sử Dụng

* **Trang web người dùng (Frontend):**
    * Truy cập route `/` (ví dụ: `http://localhost:3000/`) để xem trang web chính.

* **Trang quản trị (Admin Dashboard - PayloadCMS):**
    * Truy cập route `/admin` (ví dụ: `http://localhost:3000/admin`).
    * Nếu cơ sở dữ liệu (database) mới hoàn toàn và chưa có người dùng quản trị, PayloadCMS thường sẽ cho phép bạn đăng ký tài khoản quản trị viên đầu tiên trực tiếp từ trang này.

## Cấu Trúc Thư Mục Quan Trọng

Dưới đây là một số tệp và thư mục quan trọng trong cấu trúc dự án, đặc biệt liên quan đến PayloadCMS:

* `payload.config.ts`: Đây là tệp cấu hình trung tâm và quan trọng nhất của dự án PayloadCMS. Nó là nơi bạn định nghĩa toàn bộ "bộ não" của CMS, bao gồm các Collections, Globals, hooks, và các cài đặt khác.
* `src/collections/`: Thư mục này chứa các tệp định nghĩa cho từng "Collection" (loại nội dung). Mỗi tệp trong thư mục này (ví dụ: `Users.ts`, `Posts.ts`, `Services.ts`) mô tả cấu trúc (các trường dữ liệu - fields), hành vi (hooks), và quyền truy cập (access control) cho một loại nội dung cụ thể.
* `src/payload-types.ts`: Tệp này được PayloadCMS tự động tạo ra (generate) dựa trên các định nghĩa Collection và Global trong `payload.config.ts`. Nó chứa các kiểu TypeScript (TypeScript types) cho tất cả các dữ liệu mà bạn quản lý, giúp đảm bảo type safety trong quá trình phát triển.

## Đóng Góp

Chúng tôi rất hoan nghênh mọi ý kiến đóng góp để cải thiện dự án!
Nếu bạn muốn đóng góp, bạn có thể:

* Sử dụng website và cho chúng tôi biết cảm nhận cũng như trải nghiệm sử dụng của bạn.
* Gửi phản hồi, báo lỗi, hoặc đề xuất tính năng qua:
    * **Email:** [kientathuc@gmail.com](mailto:kientathuc@gmail.com)
    * **Facebook:** [Tạ Thúc Trung Kiên](https://www.facebook.com/tathuc.trungkien/)

## Giấy Phép

Dự án này được cấp phép theo **GNU Affero General Public License version 3**. Xem chi tiết trong tệp `LICENSE`

## Liên Hệ

* **Tạ Thúc Trung Kiên**
    * Facebook: [https://www.facebook.com/tathuc.trungkien/](https://www.facebook.com/tathuc.trungkien/)
    * Email: [kientathuc@gmail.com](mailto:kientathuc@gmail.com)
