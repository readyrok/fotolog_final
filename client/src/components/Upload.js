import React, { Fragment, useState } from 'react';
import FileUploader from './FileUploader';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import FileService from '../services/file.service';
import './Upload.css';

const UploadFile = () => {
	const submitForm = (e) => {
		e.preventDefault();
		const formData = new FormData();

		formData.append('file', selectedFile);
		formData.append('uploader', JSON.parse(localStorage.getItem("user"))["username"]);
		formData.append('description', description);
		formData.append('tags', tag);

		FileService.upload(formData)

		window.location.replace("/files"); 
	};

    const [selectedFile, setSelectedFile] = useState(null);
	const [description, setDescription] = useState('');
	const [tag, setTag] = useState('');

	return (
		<Fragment>
			<form id="upload-form" onSubmit={submitForm}>
				<div>					
					<label htmlFor="description">.DESCRIPTION</label>	
					<input id="description" type="text" onChange={(e) => setDescription(e.target.value)}/>

					<label htmlFor="tags">.TAGS</label>	
					<input id="tags" type="text" onChange={(e) => setTag(e.target.value)}/>			
				</div>
				<FileUploader
						onFileSelect={(file) => setSelectedFile(file)}
						onFileSelectError={(error) => {
							alert(error);
						}}
					/>
				<div style={{display: "inline-block"}}>
					<button id="upload-btn">.UPLOAD</button>
				</div>				
			</form>
		</Fragment>
	);
};

export default UploadFile;