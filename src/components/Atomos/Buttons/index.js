/**
 * @returns components buttons

*/
import { useRef, useEffect, useState } from 'react';
import { FaReply, FaTimes } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

import { IoCloseOutline } from 'react-icons/io5';
import { BiLoaderAlt } from 'react-icons/bi';

// Components
import { Title } from '@Components/Atomos/Titles';

// Styles
import style from '@Sass/components/buttons.module.scss';

export const ButtonClose = ({ setModalSalir, titlePage }) => {
  return (
    <div className={style.buttonCloseContaier}>
      <div></div>
      <div>
        <Title title={titlePage} />
      </div>
      <div>
        <div className={style.buttonClose}>
          <button className={style.btnClose} onClick={() => setModalSalir(true)}>
            Salir <FaTimes className={style.iconClose} />
          </button>
        </div>
      </div>
    </div>
  );
};

export const ButtonGoBack = ({ setPage, titlePage, page }) => {
  return (
    <div className={style.buttonCloseContaier}>
      <div></div>
      <div>
        <Title title={titlePage} />
      </div>
      <div>
        <div className={style.buttonClose}>
          <button className={style.btnClose} onClick={() => setPage(page)}>
            <FaReply className={style.iconClose} />
          </button>
        </div>
      </div>
    </div>
  );
};

export const ButtonOut = (props) => {
  const { setModal } = props;
  return (
    <div className={style.Buttons}>
      <div className={style.buttonClose}>
        <button className={style.btnClose} onClick={() => setModal(true)}>
          Salir <FaTimes className={style.iconClose} />
        </button>
      </div>
    </div>
  );
};

export const SaberMas = ({ data }) => {
  const [modalVideo, setModalVideo] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);

  const openModalVideo = () => {
    setModalVideo(!modalVideo);
  };

  const spinner = () => {
    setVideoLoading(!videoLoading);
  };

  const handleVideo = () => {
    if (data?.link_video) {
      const url = data?.link_video;
      const urlObject = new URL(url);
      const videoId = urlObject.searchParams.get('v');
      return (
        <iframe
          onLoad={spinner}
          loading="lazy"
          style={{ width: '100%', height: '100%' }}
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&controls=1&mute=0&listType=playlist&rel=0`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      );
    }
  };

  return (
    <p className={style.saberMas}>
      <a href="#" onClick={openModalVideo}>
        {data?.seccion_de_apoyo ? data?.seccion_de_apoyo : 'Saber más'}
        {modalVideo ? (
          <section
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.9)',
              zIndex: 9999,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div style={{ width: '100%', maxWidth: '75%', position: 'relative' }}>
              <IoCloseOutline
                style={{
                  position: 'absolute',
                  top: '-40px',
                  right: '0',
                  color: 'white',
                  fontSize: '2rem',
                  cursor: 'pointer',
                }}
                aria-label="Cerrar Ventana"
                onClick={() => {
                  setModalVideo(false);
                  setVideoLoading(true);
                }}
              />
              <div style={{ width: '100%', aspectRatio: '16/9' }}>
                {videoLoading && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <BiLoaderAlt
                      style={{
                        fontSize: '3rem',
                        color: 'white',
                        animation: 'spin 1s linear infinite',
                      }}
                    />
                  </div>
                )}
                {handleVideo()}
              </div>
            </div>
          </section>
        ) : null}
      </a>
    </p>
  );
};

export const WatchSelfHostedVideo = ({ img_src, img_alt }) => {
  const [modalVideo, setModalVideo] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);

  const openModalVideo = () => {
    console.log("opening video self hosted ")
    setModalVideo(!modalVideo);
  };

  const handleVideoCanPlay = () => {
    setVideoLoading(false);
  };

  const handleVideo = () => {
    return (
      <video
        className={style.modal__video__style}
        onCanPlay={handleVideoCanPlay}
        onLoadStart={() => setVideoLoading(true)}
        loading="lazy"
        controls
        autoPlay
        width="100%"
      >
        <source
          src="https://wprocket.digitalferrer.com/wp-content/uploads/2023/04/ROCKETNOW-pre-registro.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    );
  };

  return (
    <button onClick={openModalVideo} >
      Reproducir Video
      {
        modalVideo && (
        <section className="modalBackdrop">
          <div className="modalVideo">
            <IoCloseOutline
              arial-label="Cerrar Ventana"
              onClick={() => {
                setModalVideo(false);
                setVideoLoading(true); // Reset loading state when closing
              }} />
            {
              handleVideo()
            }
            {
              videoLoading &&
              <div>
                <BiLoaderAlt />
              </div>
            }
          </div>
        </section>
      )}
    </button>
  );
};

import playvideo from '@Assets/images/playvideo.svg';

export const WatchHomeVideo = ({ params }) => {
  const [modalVideo, setModalVideo] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);

  // Handle params more safely
  const link_video = params?.length > 0 ? params[0]?.url : null;
  const image = params?.length > 0 ? params[0]?.url : null;

  const openModalVideo = () => {
    setModalVideo(!modalVideo);
  };

  const handleVideoCanPlay = () => {
    setVideoLoading(false);
  };

  const spinner = () => {
    setVideoLoading(!videoLoading);
  };

  const renderVideo = () => {
    if (!link_video) return null;

    try {
      const urlObject = new URL(link_video);
      const videoId = urlObject.searchParams.get('v');
      if (!videoId) return null;

      return (
        <iframe
          onLoad={spinner}
          loading="lazy"
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&controls=1&mute=0&listType=playlist&rel=0`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      );
    } catch (e) {
      console.error('Invalid YouTube URL', e);
      return null;
    }
  };

  return (
    <>
      <button onClick={openModalVideo}>
        <img src={playvideo} alt={'Play Video'} />
        Reproducir Video
      </button>

      {modalVideo && (
        <section
          className={style.modal__bg}
          id="modal-watch-home-video"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.9)',
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: '75%',
              maxWidth: '75%',
              margin: '20px',
            }}
          >
            <button
              className="closeNav"
              text=""
              aria-label="Cerrar Ventana"
              onClick={() => {
                setModalVideo(false);
                setVideoLoading(true);
              }}
            />
            <div
              style={{
                position: 'relative',
                alignItems: 'end',
                width: '100%',
              }}
            >
              <div
                style={{
                  width: '100%',
                  aspectRatio: '16/9',
                }}
              >
                {renderVideo()}
                {videoLoading && (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '100%',
                    }}
                  >
                    <BiLoaderAlt
                      style={{
                        fontSize: '3rem',
                        color: 'white',
                        animation: 'spin 1s linear infinite',
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

////
import video from '@Assets/images/video.svg';

export const WatchPlanetVideo = ({ params }) => {
  const [modalVideo, setModalVideo] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);

  const link_video = params?.[0]?.url || null;
  const link_text = params?.[0]?.link_text || null;
  const playVideoImage = params?.[0]?.playvideo || '';
  const size = params?.[0]?.size || null;

  const toggleModal = () => setModalVideo(!modalVideo);
  const handleVideoLoad = () => setVideoLoading(false);

  const getYouTubeEmbedUrl = (url) => {
    try {
      const urlObject = new URL(url);
      const videoId = urlObject.searchParams.get('v') || urlObject.pathname.slice(1);
      return videoId
        ? `https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&controls=1&mute=0&listType=playlist&rel=0`
        : null;
    } catch {
      console.error('Invalid YouTube URL');
      return null;
    }
  };

  const videoSrc = link_video ? getYouTubeEmbedUrl(link_video) : null;

  const renderImage = () => {
    if (!playVideoImage) return null;
  
    const imgProps = {
      src: playVideoImage,
      alt: "video",
      style: {}
    };
    if (size?.width) imgProps.style.width = `${size.width}px`;
    if (size?.height) imgProps.style.height = `${size.height}px`;

    return (<figure> <img {...imgProps} /></figure>);
  };
  

  return (
    <fieldset>
      <a href="#" onClick={toggleModal} className={link_text ? 'anchorVideo' : null }>
        {link_text || null}
        {/* {playVideoImage && <figure><img src={playVideoImage} alt="video" /></figure>} */}
        {renderImage()}
      </a>
      {modalVideo && videoSrc && (
        <section
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.9)',
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div style={{ width: '100%', maxWidth: '75%', position: 'relative' }}>
            <IoCloseOutline
              style={{
                position: 'absolute',
                top: '-40px',
                right: '0',
                color: 'white',
                fontSize: '2rem',
                cursor: 'pointer',
              }}
              aria-label="Cerrar Ventana"
              onClick={() => {
                setModalVideo(false);
                setVideoLoading(true);
              }}
            />
            <div style={{ width: '100%', aspectRatio: '16/9' }}>
              <iframe
                style={{ width: '100%', height: '100%' }}
                onLoad={handleVideoLoad}
                loading="lazy"
                src={videoSrc}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              {videoLoading && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <BiLoaderAlt
                    style={{
                      fontSize: '3rem',
                      color: 'white',
                      animation: 'spin 1s linear infinite',
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </fieldset>
  );
};
