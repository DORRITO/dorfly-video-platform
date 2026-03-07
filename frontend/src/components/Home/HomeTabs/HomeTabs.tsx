import s from './hometabs.module.scss'
import type { HomeTabsProps } from '../../../types/components/home'

function HomeTabs(props: HomeTabsProps) {
  return (
    <div className={s.HomeTabs}>
        {props.tabs.map((item) => (
            <div 
                key={item.id}
                onClick={() => props.setActiveTab(item)}
                className={`${s.tab} ${props.activeTab.id === item.id ? s.active : ''}`}
            >{item.label}
        </div>
        ))}
    </div>
  )
}

export default HomeTabs
