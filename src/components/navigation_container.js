import { connect } from 'react-redux';
import Navigation from './navigation.js';

const mapStateToProps = state => ({
  user: state.user,
  title: "Navigation"
});

export default connect(mapStateToProps)(Navigation);
