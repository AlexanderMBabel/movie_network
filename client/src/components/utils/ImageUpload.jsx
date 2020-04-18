import React, { useState } from 'react';
import { FiUploadCloud } from 'react-icons/fi';
import Axios from 'axios';

const ImageUpload = () => {
  const [imageLocation, setImageLocation] = useState(null);
  const [image, setImage] = useState('');
  const [imageName, setImageName] = useState('');
  const [errors, setErrors] = useState([]);

  let imageStyle = {
    backgroundImage: `url(${imageLocation})`
  };

  const imageValidate = image => {
    let isValid = true;
    if (image.type === 'image/png' || image.type === 'image/jpg' || image.type === 'image/jpeg') {
      isValid = true;
    } else {
      isValid = false;
    }
    if (image.size > 5242880) {
      console.error('image too big');
      //   setErrors([...errors, 'Image must be less than 5MB']);
      isValid = false;
    }
    return isValid;
  };

  const changeHandler = async e => {
    // setImage(e.target.files[0]);
    // setImageName(e.target.files[0].name);
    console.log(e.target.files[0]);
    let formData = new FormData();
    formData.append('image', e.target.files[0]);

    try {
      const res = await Axios.post(`http://localhost:4000/users/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': localStorage.token
        }
      });

      const { fileName, filePath } = res.data;
      console.log(fileName, filePath);
      setImageLocation(filePath);
      console.log(imageStyle);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex items-center justify-center">
      <div className="circle flex items-center justify-center" style={imageStyle}>
        <div>
          <input className="image-upload" type="file" id="imageUpload" onChange={changeHandler} />
          <label htmlFor="imageUpload" className="flex justify-center items-center">
            <FiUploadCloud className=" text-center" style={{ fontSize: '5rem' }} />
            <span className="w-full">Upload a photo</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
