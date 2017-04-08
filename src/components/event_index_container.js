import EventIndex from './eventIndex';
import { connect } from 'react-redux';
import { recordChoice } from '../utils/event_api_utils';
import { addToTimeline } from '../actions/timeline_actions';
import {
  removeEvent,
  fetchEvents
} from '../actions/event_actions';

const mapStateToProps = state => ({
  fetchedEvents: state.fetchedEvents,
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  removeEvent: id => dispatch(removeEvent(id)),
  fetchEvents: () => dispatch(fetchEvents()),
  recordChoice: (direction, likedEvent) => recordChoice(direction, likedEvent),
  addToTimeline: likedEvent => dispatch(addToTimeline(likedEvent))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventIndex);
