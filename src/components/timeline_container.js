import { connect } from 'react-redux';
import Timeline from './timeline';

const mapStateToProps = state => ({
  timelineEvents: state.timelineEvents
});


export default connect(
  mapStateToProps
)(Timeline);
