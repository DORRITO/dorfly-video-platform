import s from './mediagrid.module.scss'
import type { MediaGridProps } from '../../../types/components/ui'

function MediaGrid<T>({ items, renderItem }: MediaGridProps<T>) {
  return (
    <div className={s.MediaGrid}>
      {items.map((item) => renderItem(item))}
    </div>
  )
}

export default MediaGrid
