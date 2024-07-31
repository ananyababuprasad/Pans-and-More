import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import {useAuthContext} from '../hooks/useAuthContext'
import {useCommentsContext} from '../hooks/useCommentsContext'
import {toast} from 'react-toastify';

const CommentList=({comment})=>{
    const {user}=useAuthContext()
    const {dispatch}=useCommentsContext();

    const deleteComment=async()=>{
        const response=await fetch('/api/action/'+comment._id+'/deletecomment',{
            method:'DELETE',
            headers:{
                'Authorization':`Bearer ${user.token}`
            }
        })
        const json=await response.json()
        if(response.ok){
            toast.success('Comment deleted successfully')
            dispatch({type:"DELETE_COMMENT",payload:comment._id})
        }else{
            toast.error("Couldn't delete comment")
        }
        
    }
    
    return(
        <div className='comment'>
            <p>{comment.user.username} : {comment.comment}</p>
            <div className="comment-actions">
                <p>{formatDistanceToNow(new Date(comment.createdAt),{addSuffix:true})}</p>
                {user&&user.user._id===comment.user._id &&
                <div>
                    <span className="material-symbols-outlined" onClick={deleteComment}>
                        delete
                    </span>
                </div>
                }
            </div>
        </div>
    )
}

export default CommentList;