import React, { useState } from 'react';
import Sidenav from '../Dashboard/Sidenav';
import Select from 'react-select';
import SearchResults from './SearchResults';

const searchTypeOptions = [
  { value: 'movies', label: 'Movies & Series' },
  { value: 'music', label: 'Music' },
  { value: 'games', label: 'Video Games' },
  { value: 'books', label: 'Books' }
];

const searchMovieOptions = [
  { value: 'SearchAll', label: 'All' },
  { value: 'SearchTitle', label: 'Title' },
  { value: 'SearchMovie', label: 'Movie' },
  { value: 'SearchSeries', label: 'Series' },
  { value: 'SearchName', label: 'People' },
  { value: 'SearchEpisode', label: 'Episode' },
  { value: 'SearchCompany', label: 'Company' },
  { value: 'SearchKeyword', label: 'Keyword' }
];

const searchMusicOptions = [
  { value: 'all', label: 'All' },
  { value: 'artist', label: 'Artist' },
  { value: 'album', label: 'Album' },
  { value: 'song', label: 'Song' }
];

const searchGameOptions = [
  { value: 'all', label: 'All' },
  { value: 'title', label: 'Title' },
  { value: 'studio', label: 'Studio' }
];

const searchBookOptions = [
  { value: 'all', label: 'All' },
  { value: 'inauthor', label: 'Author' },
  { value: 'intitle', label: 'Title' },
  { value: 'inpublisher', label: 'Publisher' },
  { value: 'isbn', label: 'ISBN' }
];
const Search = () => {
  const [query, setQuery] = useState('');
  const [searchOption, setSearchOption] = useState('');
  const [searchType, setSearchType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const searchHandler = () => {
    setQuery(searchTerm);
  };

  return (
    <div style={{ height: '95vh', width: '100%' }} className="flex">
      <Sidenav />
      <div className="w-full flex justify-center items-center">
        <div className=" w-3/4 justify-center items-center">
          <div className="w-full text-center lexend-font text-2xl ">Search</div>
          <div className="flex justify-between">
            <button onClick={() => setSearchType('movies')} className={`search-link ${searchType === 'movies' && 'search-link-selected'}`}>
              Movies & Series
            </button>
            <button onClick={() => setSearchType('music')} className={`search-link ${searchType === 'music' && 'search-link-selected'}`}>
              Music
            </button>
            <button onClick={() => setSearchType('games')} className={`search-link ${searchType === 'games' && 'search-link-selected'}`}>
              Video Games
            </button>
            <button onClick={() => setSearchType('books')} className={`search-link ${searchType === 'books' && 'search-link-selected'}`}>
              Books
            </button>
          </div>
          <div className="bg-pink-400 w-full rounded shadow flex">
            <input onChange={e => setSearchTerm(e.target.value)} value={searchTerm} className="bg-pink-100 p-2 m-2 rounded shadow-inner w-4/6" type="text" />
            {searchType === '' && (
              <Select
                onChange={val => {
                  setSearchType(val.value);
                }}
                className="m-2 w-2/6 font-semibold"
                placeholder="Choose media type"
                options={searchTypeOptions}
              />
            )}
            {searchType === 'movies' && (
              <Select
                onChange={val => {
                  setSearchOption(val.value);
                }}
                className="m-2 w-2/6"
                defaultValue={searchMovieOptions[0]}
                options={searchMovieOptions}
              />
            )}
            {searchType === 'music' && (
              <Select
                onChange={val => {
                  setSearchOption(val.value);
                }}
                className="m-2 w-2/6"
                defaultValue={searchMusicOptions[0]}
                options={searchMusicOptions}
              />
            )}
            {searchType === 'games' && (
              <Select
                onChange={val => {
                  setSearchOption(val.value);
                }}
                className="m-2 w-2/6"
                defaultValue={searchGameOptions[0]}
                options={searchGameOptions}
              />
            )}
            {searchType === 'books' && (
              <Select
                onChange={val => {
                  setSearchOption(val.value);
                }}
                className="m-2 w-2/6"
                defaultValue={searchBookOptions[0]}
                options={searchBookOptions}
              />
            )}
          </div>
          <div className="flex justify-center items-center w-full">
            <button onClick={searchHandler} className="py-2 px-4 m-4 font-semibold text-teal-700 shadow-md rounded hover:bg-gray-400">
              Go
            </button>
          </div>
          {query !== '' && <SearchResults className="w-full" query={query} queryType={searchType} queryOptions={searchOption} />}
        </div>
      </div>
    </div>
  );
};

export default Search;
