// Componenets
/* import { FaTimesCircle } from "react-icons/fa" */

// Images
import info from '@Assets/images/ph_info-light.png';
import question from '@Assets/images/bi_question-circle-fill.png';

// Styles
import '@Sass/components/tooltips.scss';

import { useState } from 'react';
import { FaQuestionCircle } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';

export const ToolTip = ({ text, tool }) => {
  const [isOpen, setIsOpen] = useState(false);
  const id = `tooltip-${text.toLowerCase().replace(/\s+/g, '-')}`;
  
  return (
    <div className="tooltipWrap">
      <h3>{text}</h3>
      <span 
        className="tooltipIcon"
        data-tooltip-id={id}
        data-tooltip-content={tool}
        data-tooltip-place="right"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <FaQuestionCircle />
      </span>
      <Tooltip 
        id={id}
        className="tooltipCustom"
        style={{ maxWidth: '300px' }}
        isOpen={isOpen}
        multiline={true}
      />
    </div>
  );
};

export const ToolTipBackground = ({ text, toottip }) => {
  const [isOpen, setIsOpen] = useState(false);
  const id = `tooltip-bg-${text.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <span className="tooltipBackground">
      <h4>{text}</h4>
      <span 
        className="tooltipIcon"
        data-tooltip-id={id}
        data-tooltip-content={toottip}
        data-tooltip-place="bottom"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <FaQuestionCircle />
      </span>
      <Tooltip 
        id={id}
        className="tooltipCustom"
        style={{ maxWidth: '300px' }}
        isOpen={isOpen}
        multiline={true}
      />
    </span>
  );
};
