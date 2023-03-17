import React, { Fragment, useState, useEffect } from "react";
import {Link} from 'react-router-dom'

import { motion } from 'framer-motion';
import './Page.css';

import UserService from "../services/user.service";
import Modal from './Modal'

const Page = () => {
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState("");
  const [username, setUsername] = useState("");
  const [selected, setSelected] = useState("");

  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        if(response.data.length!==0){
          const LAST_PHOTO_INDEX = response.data.length - 1;

          setImages(Object.entries(response.data));
          setUrl(response.data[LAST_PHOTO_INDEX]["url"]);
          setDescription(response.data[LAST_PHOTO_INDEX]["description"]);
          setUsername(JSON.parse(localStorage.getItem("user"))["username"]);
          setId(response.data[LAST_PHOTO_INDEX]["id"]);
        }else{
          setUsername(JSON.parse(localStorage.getItem("user"))["username"]);
        }        
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

  return (
    <Fragment>
      <div className="page-header">
        <span>@{username.toUpperCase()}</span>
        {/* <Link className="header-link">
            <button className="page-header-btn">
                +FOLLOW
            </button>
        </Link> */}
      </div>
      <div className="img-grid">
      {images.map((photo) => {
          
					return (
						<motion.div
							className="img-grid-wrap"
							key={photo[1].id}
							layout
							whileHover={{ opacity: 1 }}
							onClick={() => {
                setSelected(photo[1].url);
                setId(photo[1].id);}}
						>
							<motion.img
								src={photo[1].url}
								alt="parking"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 0.05 }}
							/>
						</motion.div>
					);
				})}
      </div>
      {selected && (
				<Modal
					selected={selected}
					setSelected={setSelected}
          id={id}
          setId={setId}
				/>
			)}
    </Fragment>
    
  );
};

export default Page;