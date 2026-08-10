# React Query + JSON Server Mock Project

Một mock project sử dụng **React + TypeScript + React Query + JSON Server** để thực hành xây dựng giao diện quản lý dữ liệu và xử lý API phía frontend.

## Tech Stack

* React
* TypeScript
* Vite
* TanStack React Query
* Axios
* React Router
* Tailwind CSS
* JSON Server

## Features

Project tập trung vào các chức năng và kỹ thuật frontend cơ bản:

* Hiển thị danh sách dữ liệu
* CRUD cơ bản
  * Create
  * Read
  * Update
  * Delete
* Pagination
* Sorting
* Search
* Filter
* Các chức năng khác
  * URL Parameters
  * Loading state
  * Error handling
  * React Query caching
  * Query invalidation
  * Optimistic update
  * Rollback khi mutation thất bại
  * React Query Devtools
  * Responsive UI cơ bản

## Architecture

Luồng xử lý dữ liệu chính:

React Component
      ↓
Custom Hook
      ↓
TanStack React Query
      ↓
Service / Axios
      ↓
JSON Server
      ↓
db.json


React Query chịu trách nhiệm quản lý server state, cache, refetch và mutation.

JSON Server được sử dụng làm mock API trong quá trình phát triển.

## Run Project

### 1. Install dependencies

npm install

### 2. Start JSON Server

Mở terminal thứ nhất:

npx json-server db.json

JSON Server mặc định chạy tại:

http://localhost:3000

### 3. Start React application

Mở terminal thứ hai:
npm run dev
Frontend mặc định chạy tại:
http://localhost:5173
hoặc port tương ứng do terminal trả về

## Development

Project sử dụng `db.json` làm dữ liệu mock.

Frontend gọi API thông qua Axios và quản lý dữ liệu server bằng TanStack React Query.

## Limitations
JSON Server chỉ được sử dụng làm mock API nên không phản ánh đầy đủ backend production.
Không hỗ trợ upload và lưu trữ file thực tế; ví dụ avatar/image chỉ có thể sử dụng URL có sẵn.
Móc nối dữ liệu bằng front end do json server không hỗ trợ relationship

## Project Purpose

Đây là **mock project**, mục đích chính là thực hành React Query và các kỹ thuật xử lý dữ liệu thường gặp trong ứng dụng web thực tế, thay vì xây dựng một sản phẩm production hoàn chỉnh.
