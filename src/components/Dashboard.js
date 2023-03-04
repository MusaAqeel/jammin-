import React, { useState } from 'react';
import {
  initiateGetResult,
  initiateLoadMoreAlbums,
  initiateLoadMorePlaylist,
  initiateLoadMoreArtists
} from '../actions/result';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SearchResult from './SearchResult';
import SearchForm from './SearchForm';
import Header from './Header';
import Loader from './Loader';
import SongList from './SongList';

const Dashboard = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('albums');
  const [songList, setSongList] = useState([]);
  const { isValidSession, history } = props;

  const handleSearch = (searchTerm) => {
    if (isValidSession()) {
      setIsLoading(true);
      props.dispatch(initiateGetResult(searchTerm)).then(() => {
        setIsLoading(false);
        setSelectedCategory('albums');
      });
    } else {
      history.push({
        pathname: '/',
        state: {
          session_expired: true
        }
      });
    }
  };



  const loadMore = async (type) => {
    if (isValidSession()) {
      const { dispatch, albums, artists, playlist } = props;
      setIsLoading(true);
      switch (type) {
        case 'albums':
          await dispatch(initiateLoadMoreAlbums(albums.next));
          break;
        case 'artists':
          await dispatch(initiateLoadMoreArtists(artists.next));
          break;
        case 'playlist':
          await dispatch(initiateLoadMorePlaylist(playlist.next));
          break;
        default:
      }
      setIsLoading(false);
    } else {
      history.push({
        pathname: '/',
        state: {
          session_expired: true
        }
      });
    }
  };

  const setCategory = (category) => {
    setSelectedCategory(category);
  };

  const addSongToList = (song) => {
    setSongList([...songList, song]);
  };

  const { albums, artists, playlist } = props;
  const result = { albums, artists, playlist };

  return (
    <React.Fragment>
      {isValidSession() ? (
        <div>
          <Header />
          <SearchForm handleSearch={handleSearch} />
          <Loader show={isLoading}>Loading...</Loader>
          <div className="dashboard-container">
            <div className="tabs">
              <div
                className={selectedCategory === 'albums' ? 'tab active' : 'tab'}
                onClick={() => setCategory('albums')}
              >
                Albums
              </div>
              <div
                className={selectedCategory === 'artists' ? 'tab active' : 'tab'}
                onClick={() => setCategory('artists')}
              >
                Artists
              </div>
              <div
                className={selectedCategory === 'playlist' ? 'tab active' : 'tab'}
                onClick={() => setCategory('playlist')}
              >
                Playlists
              </div>
            </div>
            <SearchResult
              result={result}
              loadMore={loadMore}
              selectedCategory={selectedCategory}
              isValidSession={isValidSession}
              addSongToList={addSongToList}
            />
            <SongList songList={songList} />
          </div>
        </div>
      ) : (
        <Redirect
          to={{
            pathname: '/',
            state: {
              session_expired: true
            }
          }}
        />
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    albums: state.albums,
    artists: state.artists,
    playlist: state.playlist
  };
};

export default connect(mapStateToProps)(Dashboard);
