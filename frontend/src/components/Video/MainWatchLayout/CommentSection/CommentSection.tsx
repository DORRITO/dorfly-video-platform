import s from '../mainwatchlayout.module.scss'
import CommentHeader from './CommentHeader'
import type { CommentSectionProps } from '../../../../types/components/video'

function CommentSection({ video, comments }: CommentSectionProps) {
  return (
    <div>
        <div className={s.MainWatchLayout__comments}>
            <div className={s.MainWatchLayout__title}>
                Комментарии ({video._count?.comments ?? 0}):
            </div>

            {comments.map((item) => (
                <div key={item.id} className={s.MainWatchLayout__comment}>
                    <CommentHeader item={item} />

                    <div className={s.MainWatchLayout__commentText}>
                        {item.text}
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default CommentSection
