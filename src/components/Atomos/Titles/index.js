// STYLES
import style from '@Sass/components/titles.module.scss';
import style2 from '@Sass/pages/personalizado.module.scss';
import style3 from '@Sass/pages/general.module.scss';

export const Title = (props) => {
  return (
    <div className={style.TitlesContet}>
      <h2 className={style.TitlePage} dangerouslySetInnerHTML={{ __html: props.title }}></h2>
    </div>
  );
};

export const QuestionH4 = (props) => {
  return (
    <div className={style.TitlesContet}>
      <h4 className={style.QuestionH4}>{props.questiontext}</h4>
    </div>
  );
};

export const Paragraph = (props) => {
  return (
    <div className={style.TitlesContet}>
      <div className={style.ParagraphInfo} dangerouslySetInnerHTML={{ __html: props.text }}></div>
    </div>
  );
};

export const ParagraphPlanet = (props) => {
  return (
    <div className={style.TitlesContet}>
      <div className={`${style.ParagraphInfo} ${style.colorP} `} dangerouslySetInnerHTML={{ __html: props.text }}></div>
    </div>
  );
};

export const Title2 = (props) => {
  return (
    <div className={`${style.TitlesContet} ${style3.textCenter }`}>
      <h3 className={`${style.Title2} ${style2.Title2_personalizado}  ${style2.textCenter_personalizado } `} dangerouslySetInnerHTML={{ __html: props.text }}></h3>
    </div>
  );
};

export const TitlePre = (props) => {
  return (
    <div className={`${style.TitlesContet} ${style3.textCenter }`}>
      <h3 className={`${style.TitlePre} ${style2.Title2_personalizado}  ${style2.textCenter_personalizado } `} dangerouslySetInnerHTML={{ __html: props.text }}></h3>
    </div>
  );
};

export const Title3 = (props) => {
  return (
    <div className={style.TitlesContet}>
      <h3 className={style.Title3}>{props.text}</h3>
    </div>
  );
};
