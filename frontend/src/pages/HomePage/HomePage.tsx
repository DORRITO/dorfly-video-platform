import { useState } from "react"
import HomeTabs from "../../components/Home/HomeTabs/HomeTabs"
import HomeGrid from "../../components/Home/HomeGrid/HomeGrid"

function HomePage() {
  const homeTabs = [
    { id: 'categories', label: "Все категории" },
    { id: 'videos', label: "Рекомендации" },
  ]

  const [activeTab, setActiveTab] = useState(homeTabs[0])

  return (
    <div className='HomePage'>
      <div className="HomePage__container">
          <HomeTabs 
            tabs={homeTabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          <HomeGrid 
            activeTab={activeTab}
          />
      </div>
    </div>
  )
}

export default HomePage