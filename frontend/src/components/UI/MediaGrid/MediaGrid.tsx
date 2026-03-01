import s from './mediagrid.module.scss'

interface MediaGrid {
    items: any,
    renderItem: any
}

function MediaGrid(props: MediaGrid) {
  return (
    <div className={s.MediaGrid}>
        {props.items.map((item) => props.renderItem(item))}
    </div>
  )
}

export default MediaGrid