import React from 'react';

const FileUploader = ({ onFileSelect, onFileSelectError }) => {
	const handleFileInput = (e) => {
		const file = e.target.files[0];
		console.log("File: " + file);
		if (file.size > 5000000)
			onFileSelectError('Filesize can not excede 5 mb !');
		else onFileSelect(file);
	};

	return (
		<div className="file-uploader" style={{display: "inline-block"}}>
			<button id="select-photo-btn">.SELECT PHOTO
				<input type="file" onChange={handleFileInput} accept="image/*" id="upload-input"/>
			</button>
			
		</div>
	);
};

export default FileUploader;