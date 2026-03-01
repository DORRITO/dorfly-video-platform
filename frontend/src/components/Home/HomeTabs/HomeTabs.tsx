import React from 'react'
import s from './hometabs.module.scss'

interface TabItem {
    id: string,
    label: string
}

interface HomeTabsProps {
    tabs: TabItem[],
    activeTab: TabItem,
    setActiveTab: (tab: TabItem) => void
}

function HomeTabs(props: HomeTabsProps) {
  return (
    <div className={s.HomeTabs}>
        {props.tabs.map((item, index) => (
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