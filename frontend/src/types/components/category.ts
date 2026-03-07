export type CategoryTabItem = {
  id: string
  name: string
}

export type CategoriesTabsProps = {
  tabs: CategoryTabItem[]
  activeTab: CategoryTabItem
  setActiveTab: (tab: CategoryTabItem) => void
}
