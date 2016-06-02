import { Component, PropTypes } from 'react';
import { form, input, button, span } from 'r-dom';

import css from './SearchBar.css';
import icon from './images/search-icon.svg';

const SEARCH_MODE_KEYWORD = 'keyword';
const SEARCH_MODE_LOCATION = 'location';
const SEARCH_MODE_KEYWORD_AND_LOCATION = 'keyword-and-location';
const SEARCH_MODES = [
  SEARCH_MODE_KEYWORD,
  SEARCH_MODE_LOCATION,
  SEARCH_MODE_KEYWORD_AND_LOCATION,
];

const searchInput = (className, placeholder) => input({
  className,
  type: 'search',
  placeholder,
});

class SearchBar extends Component {
  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit('trololo');
  }
  render() {
    const { mode, keywordPlaceholder, locationPlaceholder } = this.props;
    const inputs = [];

    if (mode === SEARCH_MODE_KEYWORD || mode === SEARCH_MODE_KEYWORD_AND_LOCATION) {
      inputs.push(searchInput(css.keywordInput, keywordPlaceholder));
    }
    if (mode === SEARCH_MODE_LOCATION || mode === SEARCH_MODE_KEYWORD_AND_LOCATION) {
      inputs.push(searchInput(css.locationInput, locationPlaceholder));
    }
    return form({
      classSet: {
        [css.root]: true,
      },
      onSubmit: this.handleSubmit.bind(this),
    }, [
      ...inputs,
      button({
        type: 'submit',
        className: css.searchButton,
        dangerouslySetInnerHTML: { __html: icon },
      }),
      span({ className: css.focusContainer }),
    ]);
  }
}

SearchBar.propTypes = {
  mode: PropTypes.oneOf(SEARCH_MODES).isRequired,
  keywordPlaceholder: PropTypes.string.isRequired,
  locationPlaceholder: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
