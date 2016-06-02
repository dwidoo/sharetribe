import { Component, PropTypes } from 'react';
import r, { div } from 'r-dom';

import css from './Topbar.css';

import Logo from './Logo';
import SearchBar from '../SearchBar/SearchBar';

class Topbar extends Component {
  render() {
    return div({ className: css.topbar }, [
      r(Logo, { ...this.props.logo, classSet: css.topbarLogo }),
      r(SearchBar, {
        mode: 'keyword-and-location',
        keywordPlaceholder: 'Search...',
        locationPlaceholder: 'Location',
        onSubmit(v) {
          console.log(v);
        },
      }),
    ]);
  }
}

Topbar.propTypes = {
  logo: PropTypes.shape(Logo.propTypes).isRequired,
};

export default Topbar;
