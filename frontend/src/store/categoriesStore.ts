import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { api } from '../api'
import { categoryRoutes } from '../api/routes/routes'
import useVideoStore from './videoStore'

export type TabItem = { id: string; name: string }
export const ALL_TAB: TabItem = { id: 'all', name: 'All' }

interface CategoriesState {
  categories: any[],
  subCategories: any[],
  isLoading: boolean,

  activeTab: TabItem

  getAllCategories: () => Promise<void>,
  getSubCategories: (categoryId: string) => Promise<void>

  initCategoryPage: (categoryId: string) => Promise<void>
  setActiveTab: (tab: TabItem, categoryId: string) => Promise<void>
}

const useCategoriesStore = create<CategoriesState>()(
  devtools((set, get) => ({
    categories: [],
    subCategories: [],
    isLoading: false,

    activeTab: ALL_TAB,
    tabs: () => [ALL_TAB, ...get().subCategories],

    getAllCategories: async () => {
      try {
        set({ isLoading: true })

        const res = await api.get(categoryRoutes.getAllCategories)

        const categories = res.data?.data?.categories ?? []
        set({ categories: categories })
        console.log(categories)
      } catch (e) {
        console.error(e)
      } finally {
        set({ isLoading: false })
      }
    },

    getSubCategories: async (categoryId: string) => {
      try{
        set({ isLoading: true })

        const res = await api.get(categoryRoutes.getSubCategories(categoryId))
        const subCategoriesData = res.data?.data?.subcategories?.subcategories

        console.log(res.data)
        
        set({ subCategories: subCategoriesData })

      } catch(e){
        console.log(e)
      } finally {
        set({ isLoading: false })
      }
    },

    initCategoryPage: async(categoryId: string) => {
      set({ activeTab: ALL_TAB })

      await get().getSubCategories(categoryId)
      await useVideoStore.getState().getVideosFromCategory(categoryId)
    },

    setActiveTab: async(tab: TabItem, categoryId: string) => {
      set({ activeTab: tab })

      if(tab.id === 'all'){
        await useVideoStore.getState().getVideosFromCategory(categoryId)
      } else {
        await useVideoStore.getState().getVideosFromSubCategory(tab.id)
      }
    }
  }))
)

export default useCategoriesStore