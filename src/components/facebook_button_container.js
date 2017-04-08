import { connect } from 'react-redux';
import FacebookButton from './facebook_button.js';
import { fetchUserFBInfo } from '../actions/facebook_actions.js';

const mapDispatchToProps = dispatch => ({
  fetchUserFBInfo: token => dispatch(fetchUserFBInfo(token))
});

export default connect(null, mapDispatchToProps)(FacebookButton);
