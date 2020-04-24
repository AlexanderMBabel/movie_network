import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Axios from 'axios';
import Sidenav from '../Dashboard/Sidenav';
import { AiTwotoneHeart } from 'react-icons/ai';
import { MdRateReview } from 'react-icons/md';
import { FaRegStar } from 'react-icons/fa';
import { addFavorite } from '../../actions/favorite';

const ResultInfo = ({ type, id, addFavorite }) => {
  const [resultData, setResultData] = useState(null);
  const [starList, setStarlist] = useState(null);
  const [starArr, setStarArr] = useState([]);
  useEffect(() => {
    switch (type) {
      case 'movies':
        Axios.get(`${process.env.REACT_APP_MOVIE_URL}/Title/${process.env.REACT_APP_MOVIE_KEY}/${id}/`)
          .then(res => {
            setResultData(res.data);
            console.table(res.data);
            // let tempStarList = [];
            // res.data.starList.forEach(star => {
            //   Axios.get(`${process.env.REACT_APP_MOVIE_URL}/Name/${process.env.REACT_APP_MOVIE_KEY}/${star.id}`).then(res => {
            //     console.log(res.data);
            //     setStarArr([...starArr, res.data]);
            //   });
            // });

            // console.log(starArr);
          })
          .catch(err => {
            console.error(err);
          });
        break;

      default:
        break;
    }
  }, []);

  //   useEffect(() => {
  //     if (starList) {
  //       let tempStarList = [];
  //   starList.forEach(star => {
  //     Axios.get(`${process.env.REACT_APP_MOVIE_URL}/Name/${process.env.REACT_APP_MOVIE_KEY}/${star.id}`)
  //       .then(res => {
  //         tempStarList.push(res.data);
  //       })
  //       .catch(err => console.error(err));
  //   });

  //       setStarArr(tempStarList);
  //       console.log(starArr);
  //     }
  //   }, [starList]);

  return (
    <div style={{ height: '92vh', width: '100%' }} className="flex">
      <Sidenav />
      {resultData && (
        <div className="flex flex-wrap justify-center items-center" style={{ overflowY: 'scroll' }}>
          <div className="w-full flex justify-center mt-6">
            <img className="w-1/4" src={resultData.image} alt="resultData.title" />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex justify-center flex-wrap">
              <div className="w-full">
                <AiTwotoneHeart
                  onClick={() => addFavorite(resultData.id, type, resultData.image, resultData.title, resultData.plot)}
                  className="text-gray-800 hover:text-red-600 text-xl"
                />
              </div>
              <div className="text-xs text-center w-full font-light">Favorite</div>
            </div>
            <div className="">
              <MdRateReview className="fav-star" />
              <p>Reviews</p>
            </div>
            <div className="flex-row">
              <div className="w-full flex">
                <FaRegStar className="fav-star" />
                <FaRegStar className="fav-star" />
                <FaRegStar className="fav-star" />
                <FaRegStar className="fav-star" />
                <FaRegStar className="fav-star" />
              </div>
              <div className="text-xs w-full ">Ratings</div>
            </div>
          </div>
          <div className="w-full flex justify-center m-6">
            <p className="text-gray-800 text-lg font-semibold w-full text-center">{resultData.fullTitle}</p>
          </div>
          <div className="flex flex-wrap justify-center items-center p-4 w-3/4">
            <p className="w-full">{resultData.plot}</p>

            <p className="w-full">director: {resultData.directors} </p>
            {/* <div>
              {starArr.map(star => (
                <div className="flex items-center justify-center">
                  <img src="star.image" alt="star.name" key={star.id} />
                  <p>{star.name}</p>
                </div>
              ))}
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

ResultInfo.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  addFavorite: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  id: state.search.id,
  type: state.search.type
});
export default connect(mapStateToProps, { addFavorite })(ResultInfo);
