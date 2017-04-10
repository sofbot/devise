import { connect } from 'react-redux';
import FacebookButton from './facebook_button.js';
import { fetchUserFBInfo } from '../actions/facebook_actions.js';
import { fetchTimeline } from '../actions/timeline_actions.js';

const mapDispatchToProps = dispatch => ({
  fetchUserFBInfo: token => dispatch(fetchUserFBInfo(token)),
  fetchTimeline: userId => dispatch(fetchTimeline(userId))
});

export default connect(null, mapDispatchToProps)(FacebookButton);
