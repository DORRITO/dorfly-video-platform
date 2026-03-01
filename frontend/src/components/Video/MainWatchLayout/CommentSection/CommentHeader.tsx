import s from '../mainwatchlayout.module.scss'
import DefaultAvatar from '../../../../assets/defaultAvatar.jpg'

interface ItemProps {
    item: {
        author: {
            nickname: string,
            avatar: string
        }
    }
}

function CommentHeader({item}: ItemProps) {
  return (
    <div className={s.MainWatchLayout__headerComment}>
        <div className={s.MainWatchLayout__headerCommentLeft}>
            <div className={s.MainWatchLayout__headerCommentAvatar}>
                <img src={DefaultAvatar} alt="" />
            </div>

            <div className={s.MainWatchLayout__headerCommentNickname}>
                {item.author.nickname}
            </div>
        </div>
    </div>
  )
}

export default CommentHeader