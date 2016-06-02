import { storiesOf, action } from '@kadira/storybook';
import withProps from '../Styleguide/withProps';

import SearchBar from './SearchBar';

const defaultProps = {
  keywordPlaceholder: 'Search...',
  locationPlaceholder: 'Location',
  onSubmit(v) {
    action('SearchBar submit')(v);
  },
};

storiesOf('Top bar search')
  .add('keyword', () =>
       withProps(SearchBar, { ...defaultProps, mode: 'keyword' }))
  .add('location', () =>
       withProps(SearchBar, { ...defaultProps, mode: 'location' }))
  .add('keyword and location', () =>
       withProps(SearchBar, { ...defaultProps, mode: 'keyword-and-location' }));
