import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface UIStates {
    isLoading: boolean,
    loadingCount: number,
    loadingStartedAt: number | null,
    startLoading: () => void,
    stopLoading: () => void
}

const MIN_LOADING_TIME = 400

const useUIStore = create<UIStates>()(
    devtools((set, get) => ({
        isLoading: false,
        loadingCount: 0,

        startLoading: () => {
            const now = Date.now()
            
            set((state) => ({
                isLoading: true,
                loadingCount: state.loadingCount + 1,
                loadingStartedAt: state.loadingStartedAt ?? now
            }))
        },

        stopLoading: () => {
            const state = get()
            const elapsed = Date.now() - (state.loadingStartedAt ?? 0)

            const finish = () => {
                set((state) => {
                    const newCount = Math.max(0, state.loadingCount - 1)

                    return {
                        loadingCount: newCount,
                        isLoading: newCount > 0,
                        loadingStartedAt: newCount === 0 ? null : state.loadingStartedAt
                    }
                })
            }

            if (elapsed < MIN_LOADING_TIME) {
                setTimeout(finish, MIN_LOADING_TIME - elapsed)
            } else {
                finish()
            }
        }
    }))
)

export default useUIStore