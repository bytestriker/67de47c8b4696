import { BiLoaderAlt } from 'react-icons/bi';
import { useState } from 'react';

import empieza from '@Assets/images/planets/empieza.svg';
import lock from '@Assets/images/lock.svg';
import grid from '@Assets/images/planet-grid.png';
import tierra from '@Assets/images/planets/tierra.svg';
import neptuno from '@Assets/images/planets/neptuno.svg';
// IMAGES
import _Astronaut from '@Assets/images/astronauta.png';

// STYLES
import '@Components/Notice/notice.scss';
import Button from '@Components/Button';

// export const ComingSoon = ({ setPopup, planet = 'tierra' }) => {
//   return (
//     <section className="noticeWrap">
//       <div className="noticeHeader">
//         <h2>¡Bienvenido!</h2>
//       </div>
//       <div className="noticeContainer">
//         <div className="noticeContent">
//           <h3>¡Próximamente!</h3>
//           <figure>
//             <img src={tierra} className="img-fluid" />
//             {/*
//                   <img src={grid} alt="lock" />
//                   <img src={lock} alt="lock" />
//                   */}
//           </figure>

//           <p>Muy pronto tendremos nuevos servicios increíbles</p>
//           <div className="fieldsets">
//             <Button text="Ok" isCentered={true} />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

export const ComingSoon = ({ planet }) => {
  const [planetName,  ] = useState(planet);
  const [modal, setModal] = useState(false);

  const openModal = () => {
    setModal(!modal);
  };

  return (
    <>
      <img src={empieza} alt="empieza" onClick={openModal}/>
      {modal && (
        <section
          id={`modal-notice-coming-soon-${planet}}`}
          style={{
            position: 'absolute',
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
              alignContent: 'center',
              width: '100%',
              margin: '20px',
            }}
          >
            <button
              className="closeNav"
              text=""
              aria-label="Cerrar Ventana"
              onClick={() => {setModal(false);}}
            />
            <div
              style={{
                position: 'relative',
                width: '100%',
              }}
            >
              <div
                style={{
                  width: '100%',
                  width: '100%',
                }}
              >
                <section className="noticeWrap">
                  <div className="noticeHeader">
                    <h2>¡Bienvenido!</h2>
                  </div>
                  
                  <div className="noticeContainer">
                    <div className="noticeContent">
                      <h3>¡Próximamente!</h3>
                      <figure>
                        { planetName === 'earth' && <img src={tierra} className="img-fluid" />}
                        { planetName === 'neptune' && <img src={neptuno} className="img-fluid" />}
                        <img src={grid} alt="lock" />
                        <img src={lock} alt="lock" /> 
                      </figure>
                      <p>Muy pronto tendremos nuevos servicios increíbles</p>
                      <div className="fieldsets">
                        <Button text="Ok" isCentered={true} onClick={()=>{setModal(false)}}/>
                      </div>
                    </div>
                  </div>
                </section>
                
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
