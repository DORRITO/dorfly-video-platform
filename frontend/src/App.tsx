import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage/HomePage"
import Header from "./components/Header/Header"
import CategoryPage from "./pages/CategoryPage/CategoryPage"
import VideoPage from "./pages/VideoPage/VideoPage"
import LoginPage from "./pages/AuthPages/LoginPage"
import SignUpPage from "./pages/AuthPages/SignUpPage"
import useAuthStore from "./store/authStore"
import { useEffect } from "react"
import ProfilePage from "./pages/ProfilePage/ProfilePage"
import ProfileSettings from "./pages/ProfileSettings/ProfileSettings"

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import useUIStore from "./store/useUIStore"
import Loader from "./components/UI/Loader/Loader"

function App() {
  const initAuth = useAuthStore((state) => state.initAuth)
  const isInitializing = useAuthStore((state) => state.isInitializing)
  const isLoading = useUIStore((state) => state.isLoading)

  useEffect(() => {
    initAuth()
  }, [initAuth])

  if (isInitializing) return null

  return (
    <BrowserRouter>
      {isLoading && <Loader />}
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />
        <Route path="/video/:videoId" element={<VideoPage />} />
        <Route path="/profile/:nickname" element={<ProfilePage />} />
        <Route path="/profile/settings" element={<ProfileSettings />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>

      <ToastContainer 
        position="top-right"
        autoClose={3000}
      />
    </BrowserRouter>
  )
}

export default App
