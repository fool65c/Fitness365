import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Appbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

import { showSettingsModal } from './store/settings/actions';
import Settings from './pages/Settings';


export default function TabViewExample() {
    const dispatch = useDispatch();
    // ; 

    return (
    <>
    <Appbar.Header>
    <Appbar.BackAction onPress={() => {}} />
    <Appbar.Content title="Title" />
    <Appbar.Action icon="calendar" onPress={() => {}} />
    <Appbar.Action icon="cog" onPress={() => {dispatch(showSettingsModal())}} />
  </Appbar.Header>

    <Settings />

    </>

  );
}



import * as React from 'react';
import { useDispatch } from 'react-redux';
import { View, useWindowDimensions } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';

import { showSettingsModal } from './store/settings/actions';
import Settings from './pages/Settings';

const FirstRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#ff4081' }} >
        <Icon name="cog" size={30} color="#900" />
    </View>
);

const settingsRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
);

const renderScene = SceneMap({
    nutrition: FirstRoute,
    settings: settingsRoute,
});

export default function TabViewExample() {
    const layout = useWindowDimensions();

    const dispatch = useDispatch();
    dispatch(showSettingsModal()); 

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { 
            key: 'nutrition', 
            title: 'nutrition',
            activeIcon: 'nutrition',
            inactiveIcon: 'nutrition-outline'
        },
        { 
            key: 'settings',
            title: 'settings',
            activeIcon: 'settings',
            inactiveIcon: 'settings-outline'
        },
    ]);

    const getTabBarIcon = (props) => {
        console.log(props.focused ? props.route.activeIcon : props.route.inactiveIcon)
        return (
            <Icon 
                name={props.focused ? props.route.activeIcon : props.route.inactiveIcon} 
                size={20} 
                color='white' 
            />
        )
    }

    return (
        <>
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={props =>
            <TabBar
                {...props}
                indicatorStyle={{backgroundColor: 'white'}}
                renderIcon={
                    props => getTabBarIcon(props)
                }
        />
    }
    />

    <Settings />

    </>

  );
}