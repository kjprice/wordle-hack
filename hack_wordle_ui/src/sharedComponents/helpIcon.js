import React from 'react';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

function HelpIcon(props) {
  const { text, id } = props;
  return (
    <OverlayTrigger
      placement="bottom"
      overlay={<Tooltip id={`tooltip-id-${id}`}>{text}</Tooltip>}
    >
      {({ ref, ...triggerHandler }) => (
        <i
          ref={ref}
          {...triggerHandler}
          className="bi-info-circle"
          >
        </i>
      )}
    </OverlayTrigger>
  );
}

export default HelpIcon;