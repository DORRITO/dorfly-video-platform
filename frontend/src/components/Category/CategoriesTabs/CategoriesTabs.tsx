import s from './categroiestabs.module.scss'

interface TabItem {
  id: string,
  name: string
}

interface CategoriesTabs {
  tabs: TabItem[],
  activeTab: TabItem,
  setActiveTab: (tab: TabItem) => void
}

function CategoriesTabs(props: CategoriesTabs) {
  return (
    <div className={s.CategoriesTabs}>
      {props.tabs.map((tab, index) => (
        <div 
          className={`${s.tab} ${props.activeTab.id === tab.id ? s.active : ''}`}
          key={index}
          onClick={() => props.setActiveTab(tab)}
        >
          {tab.name}
        </div>
      ))}
    </div>
  )
}

export default CategoriesTabs