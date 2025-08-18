# cấu trúc thư mục 
/src
├── payload.config.ts  # Tệp cấu hình trung tâm của Payload
│
├── collections/       # Nơi định nghĩa các Collections
│   ├── Users.ts
│   ├── Posts.ts
│   └── ...
│
├── globals/           # Nơi định nghĩa các Globals (dữ liệu toàn cục)
│   ├── Header.ts
│   └── Footer.ts
│
├── blocks/            # Các khối (Blocks) có thể tái sử dụng cho trình tạo layout
│   ├── ContentBlock.ts
│   └── ImageBlock.ts
│
├── fields/            # Các trường (Fields) tùy chỉnh có thể tái sử dụng
│   └── link.ts
│
├── hooks/             # Các hooks cho Collections và Fields
│   └── populatePublishedAt.ts
│
├── access/            # Các hàm kiểm soát truy cập (Access Control)
│   └── isAdmin.ts
│
├── components/        # Các React component tùy chỉnh cho giao diện Admin
│   └── BeforeDashboard.tsx
│
├── endpoints/         # Các API endpoint tùy chỉnh
│   └── seed.ts
│
└── utilities/         # Các hàm tiện ích chung
    └── get-url.ts