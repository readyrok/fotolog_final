import React, {useEffect, useState} from 'react';
import './Modal.css';
import {motion} from 'framer-motion';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {Link} from 'react-router-dom';
import UserService from '../services/user.service';
import FileService from '../services/file.service';
import Comments from './Comments';

const Modal = ({selected, setSelected, id, setId}) => {
    const [liked, setLiked] = useState(false);
    let [likeCount, setLikeCount] = useState(0)
    const [comments, setComments] = useState(false);
    const [commentList, setCommentList] = useState([])
    const LIKE_URL = "/files/likes/" + id;
    const COMMENT_URL = "/comments/" + id;
    const FILE_URL = "/photo/" + id;

    useEffect(() => {
        UserService.countLikes(id).then(
            (response) => {
                setLikeCount(response.data);
            }
        )
    }, [id]);


    useEffect(()=>{
        UserService.isPostLiked(id).then(
            (response) => {
                setLiked(response.data);
            }
        )
    }, [id])

    useEffect(()=>{
        UserService.getComments(id).then(
            (response) => {
                setCommentList(response.data);
            }
        )
    }, [id])

    const handleClick = (e) => {
        if(e.target.classList.contains('backdrop')){
            setSelected(null);
            setId(null);
        }        
    }

    const handleLike = (e) => {
        e.preventDefault();
        if(liked === false){
            UserService.saveLike(id);
            setLiked(true);
            let newLikeCount = likeCount++;
            setLikeCount(newLikeCount);
        }else{
            UserService.deleteLike(id);
            setLiked(false);
            let newLikeCount = likeCount--;
            setLikeCount(newLikeCount);
        }
    }

    const handleComment = (e) => {
        e.preventDefault();
        setComments(!comments);
    }

    const handleDeleteFile = (e) => {
        e.preventDefault();
        FileService.deleteFile(id);
        setSelected(null);
        setId(null);
    }

    return (
        <motion.div className="backdrop" onClick={handleClick}
            initial={{opacity: 0}}
            animate={{opacity: 1}}>
            {comments===false && (
                <motion.img src={selected} alt="zoomed"
                initial={{y: "-100vh"}}
                animate={{y: 0}}/>
            )}
            {comments===true && (
                <motion.div className='comments'
                initial={{y: "-100vh"}}
                animate={{y: 0}}>
                    <Comments
                        id={id}
                        commentList={commentList}
                        setCommentList={setCommentList}
                        />
                </motion.div>
            )}            
            <motion.div className="img-modal-info"
                initial={{y: "-100vh"}}
                animate={{y: 0}}>
                    {comments===false && (
                        <Link to={LIKE_URL} onClick={handleLike}>
                            <button className="modal-btn" id="like-post">
                                {liked === false && (
                                    <FavoriteBorderIcon className="like-heart"/>
                                )}
                                {liked === true && (
                                    <FavoriteIcon className="like-heart"/>
                                )}
                            </button>
                        </Link>
                    )}
                    {comments===false && (
                        <Link to={COMMENT_URL} onClick={handleComment}>
                            <button className="modal-btn" id="comments-post">
                                .COMMENTS
                            </button>
                        </Link>
                    )}
                    {comments===false && (
                        <Link to={FILE_URL} onClick={handleDeleteFile}>
                            <button className="modal-btn" id="delete-post">
                                .DELETE
                            </button>
                        </Link>
                    )}
                    {comments===true && (
                        <button className='modal-btn' id="back" onClick={handleComment}>.BACK</button>
                    )}
                
                
            </motion.div>
        </motion.div>
    )
}

export default Modal;