import { connect } from 'react-redux';
import Timeline from './timeline';
import dateCompare from '../reducers/selectors';

const mapStateToProps = state => ({
  timelineEvents: state.timelineEvents.sort(dateCompare)
});


export default connect(
  mapStateToProps
)(Timeline);
