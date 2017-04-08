import EventIndex from './eventIndex';
import { connect } from 'react-redux';
import { recordChoice } from '../utils/events_api_util';
import { addTimelineEvent } from '../actions/timeline_actions';
import {
  removeEvent,
  fetchEvents,
  shiftEventFromAll,
  addSwipeEvent
} from '../actions/event_actions';

const mapStateToProps = state => ({
  fetchedEvents: state.fetchedEvents,
  swipeEvents: state.swipeEvents,
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  removeEvent: id => dispatch(removeEvent(id)),
  fetchEvents: () => dispatch(fetchEvents()),
  shiftEventFromAll: () => dispatch(shiftEventFromAll()),
  addSwipeEvent: newEvent => dispatch(addSwipeEvent(newEvent)),
  recordChoice: (direction, likedEvent) => recordChoice(direction, likedEvent),
  addTimelineEvent: likedEvent => dispatch(addTimelineEvent(likedEvent))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventIndex);
