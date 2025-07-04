// Componenets
/* import { FaTimesCircle } from "react-icons/fa" */

// Images
import info from '@Assets/images/ph_info-light.png';
import question from '@Assets/images/bi_question-circle-fill.png';

// Styles
import '@Sass/components/tooltips.scss';

import { Tooltip } from 'react-tooltip';

export const ToolTip = ({ text, tool }) => {
  const id = `tooltip-${text.toLowerCase().replace(/\s+/g, '-')}`;
  
  return (
    <div className="tooltipWrap">
      <h3 
        data-tooltip-id={id}
        data-tooltip-content={tool}
        data-tooltip-place="right"
        data-tooltip-float={true}
      >
        {text}
      </h3>
      <Tooltip 
        id={id}
        className="tooltipCustom"
        style={{ maxWidth: '300px' }}
        multiline={true}
      />
    </div>
  );
};

export const ToolTipBackground = ({ text, toottip }) => {
  const id = `tooltip-bg-${text.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <span className="tooltipBackground">
      <h4>{text}</h4>
      <span 
        className="tooltipIcon"
        data-tooltip-id={id}
        data-tooltip-content={toottip}
        data-tooltip-place="bottom"
        data-tooltip-float={true}
      >
        <img src={question} alt="question" />
      </span>
      <Tooltip 
        id={id}
        className="tooltipCustom"
        style={{ maxWidth: '300px' }}
        multiline={true}
      />
    </span>
  );
};
