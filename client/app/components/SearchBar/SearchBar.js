import { Component, PropTypes } from 'react';
import { form, input, button } from 'r-dom';

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

const searchInput = (className, placeholder, onFocus, onBlur) => input({
  className,
  type: 'search',
  placeholder,
  onFocus,
  onBlur,
});

class SearchBar extends Component {
  constructor(props) {
    super(props);

    // We have to change the styles of the form and the inputs and the
    // search button inside the form if any of those has focus. This
    // is not possible to do with purely CSS before the :has()
    // pseudo-class is widely supported (see:
    // http://caniuse.com/#feat=css-has ). Therefore we have to sync
    // the focus state from the children to the form and use a class
    // for targeting styles.
    this.state = {
      hasFocus: false,
    };
  }
  render() {
    const { mode, keywordPlaceholder, locationPlaceholder } = this.props;
    const inputs = [];
    const onFocus = () => this.setState({ hasFocus: true }); // eslint-disable-line react/no-set-state
    const onBlur = () => this.setState({ hasFocus: false }); // eslint-disable-line react/no-set-state
    const hasFocus = this.state.hasFocus;

    if (mode === SEARCH_MODE_KEYWORD || mode === SEARCH_MODE_KEYWORD_AND_LOCATION) {
      inputs.push(searchInput(css.keywordInput, keywordPlaceholder, onFocus, onBlur));
    }
    if (mode === SEARCH_MODE_LOCATION || mode === SEARCH_MODE_KEYWORD_AND_LOCATION) {
      inputs.push(searchInput(css.locationInput, locationPlaceholder, onFocus, onBlur));
    }
    return form({
      classSet: {
        [css.root]: true,
        [css.focus]: hasFocus,
      },
    }, [
      ...inputs,
      button({
        type: 'submit',
        className: css.searchButton,
        onFocus,
        onBlur,
        dangerouslySetInnerHTML: { __html: icon },
      }),
    ]);
  }
}

SearchBar.propTypes = {
  mode: PropTypes.oneOf(SEARCH_MODES).isRequired,
  keywordPlaceholder: PropTypes.string.isRequired,
  locationPlaceholder: PropTypes.string.isRequired,
};

export default SearchBar;
