import React from 'react';
import _ from 'lodash';
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import AlbumsList from './AlbumsList';
import ArtistsList from './ArtistsList';
import PlayList from './PlayList';
import SongList from './SongList';
const SearchResult = (props) => {
  const {
    isValidSession,
    loadMore,
    result,
    setCategory,
    selectedCategory,
    addSongToList
  } = props;
  const { albums, artists, playlist } = result;

  if (!isValidSession()) {
    return (
      <Redirect
        to={{
          pathname: '/',
          state: {
            session_expired: true
          }
        }}
      />
    );
  }

  return (
    <React.Fragment>
      <div className="search-buttons">
        {!_.isEmpty(albums.items) && (
          <button
            className={`${
              selectedCategory === 'albums' ? 'btn active' : 'btn'
            }`}
            onClick={() => setCategory('albums')}
          >
            Albums
          </button>
        )}
        {!_.isEmpty(artists.items) && (
          <button
            className={`${
              selectedCategory === 'artists' ? 'btn active' : 'btn'
            }`}
            onClick={() => setCategory('artists')}
          >
            Artists
          </button>
        )}
        {!_.isEmpty(playlist.items) && (
          <button
            className={`${
              selectedCategory === 'playlist' ? 'btn active' : 'btn'
            }`}
            onClick={() => setCategory('playlist')}
          >
            Playlists
          </button>
        )}
        <button
          className={`${
            selectedCategory === 'songList' ? 'btn active' : 'btn'
          }`}
          onClick={() => setCategory('songList')}
        >
          Song List
        </button>
      </div>
      <div className={`${selectedCategory === 'albums' ? '' : 'hide'}`}>
        {albums && <AlbumsList albums={albums} addSongToList={addSongToList} />}
      </div>
      <div className={`${selectedCategory === 'artists' ? '' : 'hide'}`}>
        {artists && <ArtistsList artists={artists} addSongToList={addSongToList} />}
      </div>
      <div className={`${selectedCategory === 'playlist' ? '' : 'hide'}`}>
        {playlist && <PlayList playlist={playlist} addSongToList={addSongToList} />}
      </div>
      <div className={`${selectedCategory === 'songList' ? '' : 'hide'}`}>
        <SongList songList={props.songList} />
      </div>
      {!_.isEmpty(result[selectedCategory]) &&
        !_.isEmpty(result[selectedCategory].next) && (
          <div className="load-more" onClick={() => loadMore(selectedCategory)}>
            <Button variant="info" type="button">
              Load More
            </Button>
          </div>
        )}
    </React.Fragment>
  );
};

export default SearchResult;
