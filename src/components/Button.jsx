import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classname';

import styles from './Button.module.scss';

function Button({ children, className, ...props }) {
  return (
    <button {...props} className={cn(styles['btn-default'], className)}>
      {children}
    </button>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any.isRequired,
};

export default Button;
