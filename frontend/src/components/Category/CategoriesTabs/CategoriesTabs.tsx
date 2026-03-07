import s from './categroiestabs.module.scss'
import type { CategoriesTabsProps } from '../../../types/components/category'

function CategoriesTabs(props: CategoriesTabsProps) {
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
