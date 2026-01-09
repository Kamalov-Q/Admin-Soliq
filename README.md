# Blog & News Admin Dashboard

A modern, full-featured admin dashboard built with React, TypeScript, Vite, shadcn/ui, Zustand, and TanStack Query.

## ✨ Features

- 🎨 **Modern UI** - Beautiful interface with shadcn/ui components
- 📱 **Responsive Design** - Works perfectly on all devices
- 🎬 **Blog Management** - Create, edit, and delete blogs with video uploads
- 📰 **News Management** - Manage news articles with image uploads
- 🌍 **Multi-language** - Support for Uzbek, Russian, and English
- 📤 **File Upload** - Upload images and videos with preview
- 🔄 **Real-time Updates** - Automatic data synchronization with TanStack Query
- 🎯 **State Management** - Global state with Zustand
- 🚀 **Fast & Optimized** - Built with Vite for lightning-fast development

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Running backend API (NestJS)

### Installation

1. **Clone and install:**

```bash
npm install
```

2. **Create `.env` file:**

```bash
cp .env.example .env
```

Edit `.env` and set your API URL:

```env
VITE_API_URL=http://localhost:3000
```

3. **Install Tailwind CSS Animate plugin:**

```bash
npm install -D tailwindcss-animate
```

4. **Start development server:**

```bash
npm run dev
```

5. **Build for production:**

```bash
npm run build
```

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── tabs.tsx
│   │   ├── badge.tsx
│   │   ├── alert-dialog.tsx
│   │   ├── textarea.tsx
│   │   ├── toast.tsx
│   │   ├── toaster.tsx
│   │   └── use-toast.ts
│   ├── layout/
│   │   └── Layout.tsx   # Main layout with navigation
│   └── FileUpload.tsx   # File upload component
├── hooks/
│   ├── useBlogs.ts      # Blog queries and mutations
│   └── useNews.ts       # News queries and mutations
├── lib/
│   ├── api.ts           # Axios API client
│   └── utils.ts         # Utility functions
├── pages/
│   ├── BlogsPage.tsx    # Blogs management
│   └── NewsPage.tsx     # News management
├── store/
│   └── useStore.ts      # Zustand global store
├── types/
│   └── index.ts         # TypeScript types
├── App.tsx              # Main app component
├── main.tsx             # Entry point
└── index.css            # Global styles with Tailwind
```

## 🎨 UI Components

This project uses **shadcn/ui** - a collection of beautifully designed, accessible components built with Radix UI and Tailwind CSS.

### Key Components Used:

- **Button** - Various button styles and sizes
- **Card** - Content containers with header, content, and footer
- **Dialog** - Modal dialogs for forms
- **Alert Dialog** - Confirmation dialogs
- **Input** - Text input fields
- **Textarea** - Multi-line text input
- **Label** - Form labels
- **Tabs** - Tabbed content for multi-language support
- **Badge** - Status indicators
- **Toast** - Notification system

## 🔌 API Integration

The dashboard connects to your NestJS backend. Ensure your backend is running on the configured API URL.

### API Endpoints:

- `GET /blogs` - Get all blogs
- `POST /blogs` - Create blog
- `PATCH /blogs/:id` - Update blog
- `DELETE /blogs/:id` - Delete blog
- `GET /news` - Get all news
- `POST /news` - Create news
- `PATCH /news/:id` - Update news
- `DELETE /news/:id` - Delete news
- `POST /upload/image` - Upload image
- `POST /upload/video` - Upload video

## 🛠️ Technologies

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **TanStack Query** - Server state management
- **Zustand** - Client state management
- **shadcn/ui** - UI components
- **Tailwind CSS** - Styling
- **Radix UI** - Headless UI primitives
- **React Router** - Routing
- **Axios** - HTTP client
- **Lucide React** - Icons

## 📸 Screenshots

### Blogs Page

- Grid layout with video previews
- Multi-language editing with tabs
- File upload with progress indicators
- Confirmation dialogs for deletion

### News Page

- Card-based layout with images
- Author information
- Rich text descriptions in 3 languages
- Responsive design

## 🔧 Configuration

### Environment Variables

Create a `.env` file:

```env
VITE_API_URL=http://localhost:3000
```

### Customization

You can customize the theme colors in `src/index.css`:

```css
:root {
  --primary: 221.2 83.2% 53.3%;
  --secondary: 210 40% 96.1%;
  /* ... other colors */
}
```

## 📝 Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🐛 Troubleshooting

### API Connection Issues

- Ensure backend is running on the configured URL
- Check CORS settings in your backend
- Verify API_URL in .env file

### File Upload Issues

- Check file size limits (5MB for images, 100MB for videos)
- Ensure backend upload endpoints are working
- Verify file permissions in backend public folder

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For support, email kamolovquvomiddin9@gmail.com or open an issue on GitHub.
