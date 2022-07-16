import React from 'react';
import PropTypes from 'prop-types';
import { RiSettingsLine, RiArrowLeftLine } from 'react-icons/ri';

import styles from './Header.module.scss';

function Header({ title, onBackClick }) {
  return (
    <div className={styles.header}>
      <div className={styles.icons}>
        {onBackClick && (
          <button className={styles.icon}>
            <RiArrowLeftLine className={styles.icon} onClick={onBackClick} />
            <span className="is-sr-only">back</span>
          </button>
        )}
      </div>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.icons}>
        <button className={styles.icon}>
          <RiSettingsLine className={styles.icon} />
          <span className="is-sr-only">setting</span>
        </button>
      </div>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  onBackClick: PropTypes.func,
};

export default Header;
