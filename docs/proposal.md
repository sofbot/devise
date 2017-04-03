# __EVENT APP__  

EventApp is tinder for events. A React Native app with a Python/Django backend. Users will be able to swipe through cool local events (that we scrape from SF FunCheap, and GET from the Meetup API). Chosen events will be displayed on a timeline, where users will be able to add the events to their calendar, or invite friends (imported from their contacts).

## __MVP Features__
* Auth
* Listing events/main page (includes event detail page)
* Filter Events By:
	* Location
	* Time
	* Event Categories (including free/paid)
* Timeline (infinite scroll and backend storage)
* Google calendar integration
* Fetching contacts from phone
* Tour (in app and web)
* A functional Android app listed on the Google Play Store

## __Design Docs__
* [View Wireframes](./wireframes)  
* [React Components](./component-hierarchy.md)  
* [Sample State](./sample-state.md)  
* [DB Schema](./schema.md)  
* [API Endpoints](./api-endpoints.md)  
* [Android Permissions](./permissions.md)  

## __Implementation Plan__  
###__Day 1: Auth and Scrape Script__
__Objectives:__ Login with Gmail set up, SF FunCheap data scraper complete, backend set up to store event and user data, `EventIndex` component skeleton laid out.
__Tasks:__
* Sofia - EventIndex scaffold
* Fariba / Sofia - Gmail Auth and handling Permissions
* Justin - SF Fun Cheap Scrape & Backend setup

###__Day 2 & 3: Swipe Animation and Filtering Events__
__Objectives:__ Get a swipe action working, get user location and event filtering  

__Tasks:__
* Sofia - Swipe Animation
* Fariba - Frontend filtering & Location grab
* Justin - Backend filtering & integration (connecting Django backend to React Native frontend)

###__Day 4: Polishing Components__
__Objective:__ Complete `EventIndex` component, `EventDetail` component, and all filter components, and set up first interaction flow  
__Tasks:__  
* Sofia - first interaction flow for `EventIndex` (alerts when user first swipes left or right)
* Justin/Fariba - styling components  


###__Day 5: Timeline and Friends__
__Objective:__ Build `Timeline` component with ability to export events via the Google Cal API. Get friends (names and emails from contacts) and display in the `FriendList` component  
__Tasks:__  
* Justin / Sofia - Timeline
* Fariba - FriendList

###__Day 6: Tours__
__Objective:__ Complete in app `Tour` component, deploy production web app with Demo  
__Tasks:__
* Fariba - `Tour` component
* Sofia - Web App
* Justin - Web App Tour

###__Day 7: Final Touches / README__
__Objective:__ Complete all app and web app styles, demos, and production readme
__Tasks:__
* Everyone - styles and readme

## __Bonus Features__  
* Chat feature
* Google Map
* User profile page
* Facebook Login
* iOS Deployment
* Past events
* User behavior analytics / taste optimization
