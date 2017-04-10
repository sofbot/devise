import { connect } from 'react-redux';
import Timeline from './timeline';
import dateCompare from '../reducers/selectors';

const mapStateToProps = state => {
    return ({
      timelineEvents: state.timelineEvents
    });
};


export default connect(
  mapStateToProps
)(Timeline);
