import './Comments.css';
import { useState, Fragment } from 'react';
import UserService from '../services/user.service';

const Comments = ({id, commentList, setCommentList}) => {
    const submitForm = (e) => {
		const formData = new FormData();
		formData.append('text', text);
		formData.append('userId', JSON.parse(localStorage.getItem("user"))["id"]);

        UserService.saveComment(id, formData);
	};

    const [text, setText] = useState('');

    return (
        <Fragment>
            <h3 className='comments-header'>.COMMENTS</h3>
            <div className='commentList'>
                {commentList.map((comment) => {
                    return(<div className='comment' key={comment.id}>{comment.text}</div>);
                })}
            </div>
            <form id="comment-form" onSubmit={submitForm}>
                <input id="text" type="text" onChange={(e) => setText(e.target.value)}/>
                <button type="submit" className="submit-comment">
                    .SUBMIT
                </button>
            </form>
        </Fragment>
    )
}

export default Comments;