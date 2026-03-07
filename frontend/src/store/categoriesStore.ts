import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { api } from '../api'
import { categoryRoutes } from '../api/routes/routes'
import type { VideoCategory, VideoSubCategory } from '../types/video'
import useUIStore from './useUIStore'
import { sendError } from '../utils/sendDecree'

export type TabItem = { id: string; name: string }
export const ALL_TAB: TabItem = { id: 'all', name: 'All' }

interface CategoriesState {
  categories: VideoCategory[]
  subCategories: VideoSubCategory[]
  activeTab: TabItem
  getAllCategories: () => Promise<void>
  getSubCategories: (categoryId: string) => Promise<void>
  setActiveTab: (tab: TabItem) => void
}

const useCategoriesStore = create<CategoriesState>()(
  devtools((set) => ({
    categories: [],
    subCategories: [],

    activeTab: ALL_TAB,
    getAllCategories: async () => {
      try {
        useUIStore.getState().startLoading()

        const res = await api.get(categoryRoutes.getAllCategories)
        const categories = res.data?.data?.categories ?? []
        set({ categories })
      } catch (e) {
        sendError(e)
      } finally {
        useUIStore.getState().stopLoading()
      }
    },

    getSubCategories: async (categoryId: string) => {
      try{
        useUIStore.getState().startLoading()

        const res = await api.get(categoryRoutes.getSubCategories(categoryId))
        const subCategories = res.data?.data?.subcategories?.subcategories ?? []
        set({ subCategories })

      } catch(e){
        sendError(e)
      } finally {
        useUIStore.getState().stopLoading()
      }
    },

    setActiveTab: (tab: TabItem) => {
      set({ activeTab: tab })
    },
  }))
)

export default useCategoriesStore
