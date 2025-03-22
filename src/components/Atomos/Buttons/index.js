/**
 * @returns components buttons

*/
import { useRef, useEffect, useState } from 'react';
import { FaReply, FaTimes } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

import { IoCloseOutline } from "react-icons/io5";
import { BiLoaderAlt } from "react-icons/bi";

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
      <a
        href="#"
        onClick={openModalVideo} 
      >
        {data?.seccion_de_apoyo ? data?.seccion_de_apoyo : 'Saber más'}
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
                      <BiLoaderAlt
                        className={style.modal__spinner__style}
                        fadeIn="none"
                      />
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
