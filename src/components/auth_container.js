import { connect } from 'react-redux';
import { fetchUserFBInfo } from '../actions/facebook_actions.js';
import Auth from './auth.js';

const mapDispatchToProps = dispatch => ({
  fetchUser: data => dispatch(fetchUserFBInfo(data))
});

export default connect(null, mapDispatchToProps)(Auth);
