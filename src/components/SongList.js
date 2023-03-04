import React from 'react';
import { useSelector } from 'react-redux';

const SongList = () => {
  const songList = useSelector((state) => state.songList);

  return (
    <div className="song-list">
      <h2>Song List</h2>
      <ul>
  {songList && songList.map((song, index) => (
    <li key={index}>
      {song.name} - {song.artist ? song.artist.name : ""}
    </li>
  ))}
</ul>
    </div>
  );
};

export default SongList;
