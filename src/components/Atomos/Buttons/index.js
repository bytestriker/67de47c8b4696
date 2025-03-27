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
          className={style.modal__video__style}
          onLoad={spinner}
          loading="lazy"
          width="1200"
          height="500"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&controls=1&mute=0&listType=playlist&rel=0`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      );
    }
  };

  return (
    <p className={style.saberMas}>
      <a href="#" onClick={openModalVideo}>
        {data?.secciondeapoyo ? data?.secciondeapoyo : 'Saber más'}
        {modalVideo ? (
          <section className={style.modal__bg}>
            <div className={style.modal__align}>
              <div className={style.modal__content} modalVideo={modalVideo}>
                <IoCloseOutline
                  className={style.modal__close}
                  arial-label="Close modal"
                  onClick={setModalVideo}
                />
                <div className={style.modal__video__align}>
                  {videoLoading ? (
                    <div className={style.modal__spinner}>
                      <BiLoaderAlt className={style.modal__spinner__style} fadeIn="none" />
                    </div>
                  ) : null}
                  {handleVideo()}
                </div>
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
    <button onClick={openModalVideo}>
      <img src={img_src} alt={img_alt} />
      Reproducir Video
      {modalVideo && (
        <section
          className={style.modal__bg}
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
              width: '100%',
              maxWidth: '1200px',
              padding: '20px',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
              }}
            >
              <IoCloseOutline
                style={{
                  position: 'absolute',
                  top: '-40px',
                  right: '0',
                  color: 'white',
                  fontSize: '2rem',
                  cursor: 'pointer',
                }}
                arial-label="Cerrar Ventana"
                onClick={() => {
                  setModalVideo(false);
                  setVideoLoading(true); // Reset loading state when closing
                }}
              />
              <div
                style={{
                  width: '100%',
                  aspectRatio: '16/9',
                }}
              >
                {handleVideo()} {/* Render the video here */}
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
          className={style.modal__video__style}
          onLoad={spinner}
          loading="lazy"
          width="1200"
          height="500"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&controls=1&mute=0&listType=playlist&rel=0`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      );
    } catch (e) {
      console.error("Invalid YouTube URL", e);
      return null;
    }
  };

  return (
    <>
      <button onClick={openModalVideo}>
      <img src={playvideo} alt={"Play Video"} />
        Reproducir Video
      </button>
      
      {modalVideo && (
        <section
          className={style.modal__bg}
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
              width: '100%',
              maxWidth: '1200px',
              padding: '20px',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
              }}
            >
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



export const WatchLunaVideos = ({ params }) => {
  const [modalVideo, setModalVideo] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);

  // Handle params more safely
  const link_video = params?.length > 0 ? params[0]?.url : null;
  console.log("params ", params)
  
  const openModalVideo = () => {
    setModalVideo(!modalVideo);
  };

  
  
  const spinner = () => {
    setVideoLoading(!videoLoading);
  };

  const renderVideo = () => {
    if (!link_video) return null;
    
    try {
      const urlObject = new URL(link_video);
      let videoId = urlObject.searchParams.get('v');
      let src_video = null;
      if (videoId) {
        src_video = `https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&controls=1&mute=0&listType=playlist&rel=0`
      }

      if (!videoId ) {
        videoId = urlObject.pathname
        src_video = `https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&controls=1&mute=0&listType=playlist&rel=0`
        
      }
      
      if (!videoId) return null;
      if (!src_video) return null;
      
      console.log(videoId)
      console.log(src_video)
      return (
        <iframe
          className={style.modal__video__style}
          onLoad={spinner}
          loading="lazy"
          width="1200"
          height="500"
          src={src_video}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      );
    } catch (e) {
      console.error("Invalid YouTube URL", e);
      return null;
    }
  };

  return (
    <>
      
      <a href="#" onClick={openModalVideo}>

        <img src={params[0]?.playvideo} alt="video" />
      </a>

      {modalVideo && (
        <section
          className={style.modal__bg}
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
              width: '100%',
              maxWidth: '1200px',
              padding: '20px',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
              }}
            >
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