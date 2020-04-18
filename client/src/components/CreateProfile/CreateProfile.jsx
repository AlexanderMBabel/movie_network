import React, { useState } from 'react';
import ImageUpload from '../utils/ImageUpload';
import axios from 'axios';
import history from '../../history';

const CreateProfile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [country, setCountry] = useState('');
  const [intrests, setIntrests] = useState('');
  const [bio, setBio] = useState('');

  const changeHandler = e => {
    if (e.target.name === 'firstName') {
      setFirstName(e.target.value);
    }
    if (e.target.name === 'lastName') {
      setLastName(e.target.value);
    }
    if (e.target.name === 'birthDate') {
      setBirthDate(e.target.value);
    }

    if (e.target.name === 'country') {
      setCountry(e.target.value);
    }
    if (e.target.name === 'intrests') {
      setIntrests(e.target.value);
    }
    if (e.target.name === 'bio') {
      setBio(e.target.value);
    }
  };

  const submitHandler = () => {
    const profileData = {
      firstName,
      lastName,
      birthDate,
      country,
      intrests,
      bio
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.token
      }
    };

    axios.post('http://localhost:4000/users/profile', profileData, config).then(res => {
      console.log(res.data);
      history.push('/Dashboard');
    });
  };

  return (
    <div style={{}} className="flex items-center justify-center my-6">
      <div className="flex-row w-1/2 rounded shadow-md p-4">
        <div className="lexend-font text-3xl text-center font-semibold mt-4 p-2">Welcome Media Lover</div>
        <div className="baloo-font p2 my-10 text-center text-lg">Complete your profile</div>

        <ImageUpload />

        <div className="flex mt-6">
          <div className="mr-1 p-4 rounded-sm bg-pink-500 shadow-inner w-1/2">
            <label htmlFor="firstName" className="font-semibold text-gray-800 text-sm">
              First Name
            </label>
            <input onChange={changeHandler} type="text" id="firstName" name="firstName" value={firstName} className="form-input" />
          </div>
          <div className="rounded-sm bg-pink-500 p-4 shadow-sm w-1/2">
            <label htmlFor="lastName" className="font-semibold text-gray-800 text-sm">
              Last Name
            </label>
            <input onChange={changeHandler} type="text" id="lastName" name="lastName" value={lastName} className="form-input" />
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <div className=" mr-1 rounded-sm bg-pink-400 p-4 shadow-sm w-1/2">
            <label htmlFor="birthDate" className="font-semibold text-gray-800 text-sm">
              Date of birth
            </label>

            <input type="date" name="birthDate" id="birthDate" value={birthDate} onChange={changeHandler} className="rounded w-full bg-orange-100 p-2 shadow-inner w-full" />
          </div>
          <div className="rounded-sm bg-pink-400 p-4 shadow-sm w-1/2">
            <label htmlFor="country" className="font-semibold text-gray-800 text-sm">
              Country
            </label>
            <input value={country} name="country" onChange={changeHandler} type="text" className="form-input" />
          </div>
        </div>
        <div className="mt-4 rounded-sm bg-pink-300 p-4 shadow-sm">
          <label htmlFor="interests" className="font-semibold text-gray-800 text-sm">
            Interests
          </label>
          <input value={intrests} name="intrests" onChange={changeHandler} type="text" className="form-input" />
        </div>
        <div className="mt-4 rounded-sm bg-pink-200 p-4 shadow-sm">
          <label className="font-semibold text-gray-800 text-sm" htmlFor="bio">
            Bio
          </label>
          <textarea value={bio} onChange={changeHandler} className="form-input" name="bio" id="bio" cols="30" rows="10"></textarea>
        </div>
        <div className="flex items-center justify-center w-full">
          <button onClick={submitHandler} className="p-2 m-4 rounded bg-teal-500 text-white font-semibold shadow hover:bg-teal-700">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProfile;
