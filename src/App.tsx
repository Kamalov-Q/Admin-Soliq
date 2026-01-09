import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import BlogsPage from '@/pages/BlogsPage'
import NewsPage from '@/pages/NewsPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/blogs" replace />} />
          <Route path="blogs" element={<BlogsPage />} />
          <Route path="news" element={<NewsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App