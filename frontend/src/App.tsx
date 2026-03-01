import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage/HomePage"
import Header from "./components/Header/Header"
import CategoryPage from "./pages/CategoryPage/CategoryPage"
import VideoPage from "./pages/VideoPage/VideoPage"

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />
        <Route path="/video/:videoId" element={<VideoPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
