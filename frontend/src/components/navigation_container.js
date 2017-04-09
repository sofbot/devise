import { connect } from 'react-redux';
import Navigation from './navigation.js';

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Navigation);
