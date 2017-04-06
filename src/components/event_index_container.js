import EventIndex from './eventIndex';
import { connect } from 'react-redux';
import {
  removeEvent,
  fetchEvents
} from '../actions/event_actions';

const mapStateToProps = state => ({
  events: state.fetchedEvents
});

const mapDispatchToProps = dispatch => ({
  removeEvent: id => dispatch(removeEvent(id)),
  fetchEvents: () => dispatch(fetchEvents())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventIndex);
