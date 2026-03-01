import { useEffect, useMemo } from 'react'
import useCategoriesStore, { ALL_TAB } from '../../store/categoriesStore'
import { useParams, useNavigate } from 'react-router-dom'
import CategoriesTabs from '../../components/Category/CategoriesTabs/CategoriesTabs'
import MediaGrid from '../../components/UI/MediaGrid/MediaGrid'
import useVideoStore from '../../store/videoStore'
import MediaCard from '../../components/UI/MediaCard/MediaCard'


function CategoryPage() {
  const { categoryId } = useParams()
  const cid = categoryId ?? ''
  const navigate = useNavigate()

  const initCategoryPage = useCategoriesStore((s) => s.initCategoryPage)
  const activeTab = useCategoriesStore((s) => s.activeTab)
  const setActiveTab = useCategoriesStore((s) => s.setActiveTab)
  const subCategories = useCategoriesStore((s) => s.subCategories)

  const tabs = useMemo(() => [ALL_TAB, ...subCategories], [subCategories])

  const videosFromCategory = useVideoStore((s) => s.videosFromCategory)
  const videosFromSubCategory = useVideoStore((s) => s.videosFromSubCategory)

  const currentVideos = activeTab.id === 'all' ? videosFromCategory : videosFromSubCategory

  useEffect(() => {
    if (!categoryId) return
    initCategoryPage(categoryId)
  }, [categoryId, initCategoryPage])

  return (
    <div className='CategoryPage'>
        <div className="CategoryPage__container">
            <CategoriesTabs 
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={(tab) => setActiveTab(tab, cid)}
            />

            <MediaGrid 
                items={currentVideos}
                renderItem={(video) => (
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