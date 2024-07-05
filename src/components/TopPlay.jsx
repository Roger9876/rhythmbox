/* eslint-disable import/no-unresolved */
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';

import 'swiper/css';
import 'swiper/css/free-mode';

const TopChartCard = ({ song, isPlaying, activeSong, i, handlePauseClick, handlePlayClick }) => {
  const artWorkWidth = 50;
  const artWorkHeight = 50;
  const imageUrl = song?.attributes?.artwork?.url.replace('{w}', artWorkWidth).replace('{h}', artWorkHeight);

  return (
    <div className="w-full flex flex-row items-center hover:bg-[#4c426e]
      py-2 p-4 rounded-lg cursor-pointer mb-2"
    >
      <h3 className="font-bold text-base text-white mr-3">{i + 1}</h3>
      <div className="flex-1 flex flex-row justify-between items-center">
        <img className="w-20 h-20 rounded-lg" src={imageUrl} alt={song?.attributes?.name} />
        <div className="flex-1 flex flex-col justify-center mx-3">
          <Link to={`/songs/${song.id}`}>
            <p className="text-xl font-bold text-white">{song?.attributes?.name}</p>
          </Link>
          <Link to={`/artists/${song?.relationships?.artists?.data[0].id}`}>
            <p className="text-base text-gray-300 mt-1">{song?.attributes?.artistName}</p>
          </Link>
        </div>
      </div>
      <PlayPause
        isPlaying={isPlaying}
        activeSong={activeSong}
        song={song}
        handlePause={handlePauseClick}
        handlePlay={() => handlePlayClick(song, i)}
      />
    </div>
  );
};

const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data } = useGetTopChartsQuery();
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: 'smooth' });
  });

  const topPlace = data?.data.slice(0, 5);

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  return (
    <div
      ref={divRef}
      className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1
        xl:max-w-[500px] max-w-full flex flex-col"
    >
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">
            Top Charts
          </h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">
              See More
            </p>
          </Link>
        </div>
        <div className="mt-4 flex flex-col gap-1">
          {topPlace?.map((song, i) => (
            <TopChartCard
              song={song}
              i={i}
              key={song?.id}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={handlePlayClick}
            />
          ))}
        </div>
      </div>
      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">
            Top Artists
          </h2>
          <Link to="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer">
              See More
            </p>
          </Link>
        </div>
        <Swiper
          freeMode
          slidesPerView="auto"
          spaceBetween={15}
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4"
        >
          {topPlace?.map((song, i) => (
            <SwiperSlide
              key={song?.id}
              style={{ width: '25%', height: 'auto' }}
              className="shadow-lg rounded-full animate-slideright"
            >
              <Link to={`/artists/${song?.relationships?.artists?.data[0].id}`}>
                <img
                  src={song?.attributes?.artwork?.url.replace('{w}', 75).replace('{h}', 75)}
                  alt="name"
                  className="rounded-full w-full object-cover"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopPlay;
