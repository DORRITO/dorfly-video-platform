import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useCategoriesStore from '../../../store/categoriesStore'
import MediaCard from '../../UI/MediaCard/MediaCard'
import s from './homegrid.module.scss'
import useVideoStore from '../../../store/videoStore'
import MediaGrid from '../../UI/MediaGrid/MediaGrid'

interface TabItem {
    id: string,
    label: string
}

interface HomeGridProps {
    activeTab: TabItem
}

function HomeGrid(props: HomeGridProps) {
  const navigate = useNavigate()

  const getAllCategories = useCategoriesStore((state) => state.getAllCategories)
  const categories = useCategoriesStore((state) => state.categories)

  const getAllVideos = useVideoStore((state) => state.getAllVideos)
  const videos = useVideoStore((state) => state.videos)

  console.log(videos)

  const isLoading = useCategoriesStore((state) => state.isLoading)

  useEffect(() => {
    getAllCategories()
    getAllVideos()
  }, [])

  return (
    <div className={s.HomeGrid}>
        {props.activeTab.id === "categories" && (
            <>
            <MediaGrid 
                items={categories}
                renderItem={(category) => (
                    <MediaCard 
                        id={category.id}
                        name={category.name}
                        preview={category.preview}
                        onClick={() => navigate(`/category/${category.id}`)}
                    />
                )}
            />
            </>
        )}

        {props.activeTab.id === "videos" && (
            <>
                <MediaGrid 
                    items={videos}
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
            </>
        )}
    </div>
  )
}

export default HomeGrid 