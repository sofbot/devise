__Android Permissions__  

* android.permission.READ_CONTACTS
  * Allows us to read a user's contacts. We will use these to populate the `FriendList`.
  * We would retrieve a list of contacts by matching the search string to an email address.
* android.permission.ACCESS_COARSE_LOCATION / android.permission.ACCESS_FINE_LOCATION
  * Gives us user location. We will use this in our `Distance` component to filter events by distance.
