import React, { useState, useEffect } from 'react';
import axios from 'axios';
import history from '../../history';
import { BounceLoader } from 'react-spinners';
import { connect } from 'react-redux';
import { selectedResult } from '../../actions/search';
import { addError } from '../../actions/errors';

const SearchResults = ({ query, queryType, queryOptions, selectedResult, addError }) => {
  const [numberOfResults, setNumberOfResults] = useState(0);
 
  const [results, setResults] = useState([]);
  const [isLoaded, setIsLoaded] = useState(null);

  // set axios interceptors for loading spinner
  useEffect(() => {
    axios.interceptors.request.use(
      config => {
        console.log('Start ajax');
        setIsLoaded(false);

        return config;
      },
      err => {
        console.error('interceprot request error');
        return Promise.reject(err);
      }
    );

    axios.interceptors.response.use(
      response => {
        setIsLoaded(true);
        console.log('ajax done');
        return response;
      },
      err => {
        console.error('error fetching data');
        return Promise.reject(err);
      }
    );

    return () => {};
  }, []);

  // make api calls to search using query

  useEffect(() => {
    delete axios.defaults.headers.common['x-auth-token'];
    switch (queryType) {
      case 'movies':
        axios
          .get(`${process.env.REACT_APP_MOVIE_URL}/${queryOptions}/${process.env.REACT_APP_MOVIE_KEY}/${query}`)
          .then(res => {
            setResults(res.data.results);
            setNumberOfResults(res.data.results.length);
          })
          .catch(err => {
            addError({ alert: err, type: 'error' });
          });
        break;
      case 'games':
        axios({
          url: 'https://api-v3.igdb.com/search',
          method: 'POST',
          hearders: {
            Accept: 'application/json',
            'user-key': process.env.REACT_APP_GAME_KEY
          },
          data: `fields *; search "${query}";`
        })
          .then(res => {
            console.table(res.data);
          })
          .catch(err => {
            console.error(err);
            addError({ alert: err, type: 'error' });
          });
        break;
      case 'books':
        axios
          .get(`https://www.googleapis.com/books/v1/volumes?q=${queryOptions === 'all' ? query : queryOptions + ':' + query}&key=${process.env.REACT_APP_BOOK_KEY}`)
          .then(res => {
            console.table(res.data);
          })
          .catch(err => {
            console.error(err);
            addError({ alert: err, type: 'error' });
          });
          break;
      default:
        break;
    }

    return () => {};
  }, [query]);
  return (
    <div className="w-full">
      {isLoaded === false && (
        <div className="flex items-center justify-center" style={{ height: '60vh' }}>
          <BounceLoader size={100} color={'#319795'} />
        </div>
      )}
      {isLoaded && (
        <>
          <div className="flex">
            <div>
              {numberOfResults}: Results for {query} in {queryOptions} of {queryType}
            </div>
          </div>
          <div style={{ height: '60vh', overflowY: 'scroll' }}>
            {results.map(result => (
              <div key={result.id} className="flex rounded shadow m-4 p-4 items-center justify-center">
                <div className="flex-row">
                  <div
                    onClick={() => {
                      selectedResult(queryType, result.id);
                      history.push('/Dashboard/Search/More');
                    }}
                    className="w-full text-xl text-gray-800 hover:text-teal-700 "
                  >
                    {result.title}
                  </div>
                  <div className="w-full text-sm text-gray-900 ">{result.description}</div>
                </div>
                <div className="w-1/2 ml-6 flex items-center justify-center">
                  <img className="lg:w-1/4 w-1/2" src={result.image} alt={result.title} />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default connect(null, { selectedResult, addError })(SearchResults);
