import s from './loader.module.scss'

function Loader() {
  return (
    <div className={s.Loader}>
        <div className={s.Loader__spinner}>

        </div>
    </div>
  )
}

export default Loader