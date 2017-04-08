import { Permissions, Alert } from 'react-native-permissions';

export default class PermissionsUtil {
  constructor() {
    this.state = {
      calPermission: ''
    }
  }
  //check the status of a single permission
  componentDidMount() {
    Permissions.getPermissionStatus('calendar')
    .then(response => {
      //response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      this.setState({ calPermission: response })
    });
  }
  //request permission to access photos
  _requestPermission() {
    Permissions.requestPermission('calendar')
    .then(response => {
      //returns once the user has chosen to 'allow' or to 'not allow' access
      //response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      this.setState({ calPermission: response })
    });
  }

  //check the status of multiple permissions
  _checkPermissions() {
    Permissions.checkMultiplePermissions(['calendar', 'location'])
    .then(response => {
      //response is an object mapping type to permission
      this.setState({
        cameraPermission: response.camera,
        photoPermission: response.photo,
      })
    });
  }

  // this is a common pattern when asking for permissions.
  // iOS only gives you once chance to show the permission dialog,
  // after which the user needs to manually enable them from settings.
  // the idea here is to explain why we need access and determine if
  // the user will say no, so that we don't blow our one chance.
  // if the user already denied access, we can ask them to enable it from settings.
  _alertForPhotosPermission() {
    Alert.alert(
      'Can we access your photos?',
      'We need access so you can set your profile pic',
      [
        {text: 'No way', onPress: () => console.log('permission denied'), style: 'cancel'},
        this.state.photoPermission == 'undetermined'?
        {text: 'OK', onPress: this._requestPermission.bind(this)}
        : {text: 'Open Settings', onPress: Permissions.openSettings}
      ]
    )
  }}
