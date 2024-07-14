import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation'; // using react-native-paper cuz it offers animation
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../screens/HomeScreen';
import InboxScreen from '../screens/InboxScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ShopScreen from '../screens/ShopScreen';
import UploadScreen from '../screens/UploadScreen';

// documentation: https://callstack.github.io/react-native-paper/docs/guides/bottom-navigation/

const Tab = createMaterialBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
            tabBarLabel: route.name,
            tabBarIcon: ({ color }) => {
                let iconName;
                if (route.name === 'Home') {
                iconName = 'home';
                } else if (route.name === 'Shop') {
                iconName = 'shopping';
                } else if (route.name === 'Upload') {
                iconName = 'bookmark-plus';
                } else if (route.name === 'Inbox') {
                iconName = 'tooltip-minus';
                } else if (route.name === 'Profile') {
                iconName = 'account';
                }
                return <MaterialCommunityIcons name={iconName} color={color} size={26} />;
            }
        })}
    >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Shop" component={ShopScreen} />
        <Tab.Screen name="Upload" component={UploadScreen} />
        <Tab.Screen name="Inbox" component={InboxScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
  )
}