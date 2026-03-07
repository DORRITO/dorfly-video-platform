import { useEffect, useMemo } from 'react'
import useCategoriesStore, { ALL_TAB, type TabItem } from '../../store/categoriesStore'
import { useParams, useNavigate } from 'react-router-dom'
import CategoriesTabs from '../../components/Category/CategoriesTabs/CategoriesTabs'
import MediaGrid from '../../components/UI/MediaGrid/MediaGrid'
import useVideoStore from '../../store/videoStore'
import MediaCard from '../../components/UI/MediaCard/MediaCard'
import type { Video } from '../../types/video'
import Loader from '../../components/UI/Loader/Loader'


function CategoryPage() {
  const { categoryId } = useParams()
  const cid = categoryId ?? ''
  const navigate = useNavigate()

  const activeTab = useCategoriesStore((s) => s.activeTab)
  const setActiveTab = useCategoriesStore((s) => s.setActiveTab)
  const getSubCategories = useCategoriesStore((s) => s.getSubCategories)
  const subCategories = useCategoriesStore((s) => s.subCategories)

  const tabs = useMemo(() => [ALL_TAB, ...subCategories], [subCategories])

  const getVideosFromCategory = useVideoStore((s) => s.getVideosFromCategory)
  const getVideosFromSubCategory = useVideoStore((s) => s.getVideosFromSubCategory)
  const videosFromCategory = useVideoStore((s) => s.videosFromCategory)
  const videosFromSubCategory = useVideoStore((s) => s.videosFromSubCategory)

  const currentVideos = activeTab.id === 'all' ? videosFromCategory : videosFromSubCategory

  useEffect(() => {
    if (!categoryId) return
    setActiveTab(ALL_TAB)
    void getSubCategories(categoryId)
    void getVideosFromCategory(categoryId)
  }, [categoryId, getSubCategories, getVideosFromCategory, setActiveTab])

  const handleTabChange = (tab: TabItem) => {
    setActiveTab(tab)

    if (tab.id === 'all') {
      void getVideosFromCategory(cid)
      return
    }

    void getVideosFromSubCategory(tab.id)
  }

  return (
    <div className='CategoryPage'>
        <div className="CategoryPage__container">
            <CategoriesTabs 
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={handleTabChange}
            />

            <MediaGrid 
                items={currentVideos}
                renderItem={(video: Video) => (
                    <MediaCard 
                        id={video.id}
                        name={video.title}
                        preview={video.preview}
                        creator={video.creator}
                        viewsCount={video.views_count}
                        duration={video.duration_sec}
                        onClick={() => navigate(`/video/${video.id}`)}
                    />
                )}
            />
        </div>
    </div>
  )
}

export default CategoryPage
