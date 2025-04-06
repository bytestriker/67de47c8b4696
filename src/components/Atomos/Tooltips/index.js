// Componenets
/* import { FaTimesCircle } from "react-icons/fa" */

// Images
import info from '@Assets/images/ph_info-light.png';
import question from '@Assets/images/bi_question-circle-fill.png';

// Styles
import '@Sass/components/tooltips.scss';

export const ToolTip = (props) => {
  return (
    <div className="tooltipWrap">
      <h3>{props.text}</h3>
      <div className="tooltipContainer">
        <div>
          <span>{props.tool}</span>
        </div>
      </div>
    </div>
  );
};

export const ToolTipBackground = (props) => {
  return (
    <span className={style.Tooltip}>
      <span className={style.TooltipContent}>
        <span className={style.background}>
          <h4>{props.text}</h4>
          <span className={style.toolImg}>
            <span className={style.TooltipText}>
              <p>{props.toottip}</p>
              <div className={style.tab}></div>
            </span>
            <img src={question} alt="question" />
          </span>
        </span>
      </span>
    </span>
  );
};
