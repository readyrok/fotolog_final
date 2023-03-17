import React, { Fragment, useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import { motion } from 'framer-motion';

import UserService from "../services/user.service";
import './Timeline.css';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const Timeline = () => {
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [liked, setLiked] = useState(false);
  let [likeCount, setLikeCount] = useState(0)

  useEffect(() => {
    UserService.getTimeline().then(
      (response) => {
        setImages(response.data.reverse());
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        
        setContent(_content);
      }
    );
  }, []);

  const handleLike = (e, id) => {
    e.preventDefault();
    if(liked === false){
        UserService.saveLike(id);
        setLiked(true);
    }else{
        UserService.deleteLike(id);
        setLiked(false);
    }
  }

  return (
    <Fragment>
      <div className="background">
        <div className="mainPhotoContainer">
            <div className="timeline-grid">
                {images.map((photo) => {
                return (<motion.div
                    className="main-img-wrap"
                    key={photo.name}
                    layout
                    whileHover={{ opacity: 1 }}
                >
                    <motion.img
                    src={photo.url}
                    alt="last one"
                    id="mainPhoto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.05 }}
                    />
                    <div className="img-info">
                      {/* <div className="head-info">
                        <Link className='user-link'  to={"/files/" + photo[1].uploader}>
                          @{photo[1].uploader.toUpperCase()}
                        </Link>                        
                      </div>
                      <div className="head-description">
                        .{photo[1].description.toUpperCase()}
                      </div>
                      <div className="head-description">
                        #{photo[1].tags.toUpperCase()}
                      </div> */}
                    </div>
                    </motion.div>);})}
            </div>
        </div>
      </div>
    </Fragment>
    
  );
};

export default Timeline;