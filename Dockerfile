# 1. Chọn môi trường Node.js (phiên bản ổn định)
FROM node:18-alpine

# 2. Tạo thư mục làm việc trong Docker
WORKDIR /app

# 3. Copy file package.json vào trước để cài thư viện
COPY package*.json ./

# 4. Cài đặt các thư viện (node_modules)
RUN npm install

# 5. Copy toàn bộ code còn lại vào Docker
COPY . .

# 6. Mở cổng kết nối (Web bạn chạy port nào thì điền port đó, thường là 3000 hoặc 5000)
EXPOSE 3000

# 7. Lệnh chạy web khi Docker bật lên
CMD ["node", "server.js"]