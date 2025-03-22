// Images
import email from '@Assets/images/icons/email.png';
import earth from '@Assets/images/icons/earth.png';

// Style
import style from '@Sass/components/cards.module.scss';

export const MarketingCard = (props) => {
  return (
    <div className={style.item}>
      <div className={style.profile}>
        <div className={style.avatar}>
          <img src={props.foto} />
        </div>
        <div className={style.name}>
          <h4>{props.company}</h4>
          <small>{props.description}</small>
        </div>
      </div>

      <div className={style.contentDetail}>
        <div className={style.infoContent}>
          <img src={earth} alt="earth" className={style.icon} />
          <p className={style.info}>{props.phone}</p>
        </div>
        <div className={style.infoContent}>
          <img src={email} alt="email" className={style.icon} />
          <p className={style.info}>{props.email}</p>
        </div>
      </div>
    </div>
  );
};
