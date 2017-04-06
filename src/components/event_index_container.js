import EventIndex from './eventIndex';
import { connect } from 'react-redux';
import {
  removeEvent,
  fetchEvents,
  shiftEventFromAll,
  addEventToSwipe
} from '../actions/event_actions';

const mapStateToProps = state => ({
  fetchedEvents: state.fetchedEvents,
  swipeEvents: state.swipeEvents
});

const mapDispatchToProps = dispatch => ({
  removeEvent: id => dispatch(removeEvent(id)),
  fetchEvents: () => dispatch(fetchEvents()),
  shiftEventFromAll: () => dispatch(shiftEventFromAll()),
  addEventToSwipe: newEvent => dispatch(addEventToSwipe(newEvent))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventIndex);
