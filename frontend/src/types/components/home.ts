export type HomeTabItem = {
  id: string
  label: string
}

export type HomeTabsProps = {
  tabs: HomeTabItem[]
  activeTab: HomeTabItem
  setActiveTab: (tab: HomeTabItem) => void
}

export type HomeGridProps = {
  activeTab: HomeTabItem
}
