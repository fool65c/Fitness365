import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';

import Settings from './pages/Settings';
import Pantry from './pages/Pantry';
import Log from './pages/Log';
import FoodModal from './components/FoodModal';

const MusicRoute = () => <Text>Music</Text>;

const LogRoute = () => <Log />;

const pantryRoute = () => <Pantry />;

const settingsRoute = () => <Settings />;

const App = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'music', title: 'Home', focusedIcon: 'heart', unfocusedIcon: 'heart-outline'},
    { key: 'log', title: 'Log', focusedIcon: 'book-open', unfocusedIcon:'book-outline' },
    { key: 'pantry', title: 'Pantry', focusedIcon: 'food-apple', unfocusedIcon: 'food-apple-outline' },
    { key: 'settings', title: 'Settings', focusedIcon: 'cog', unfocusedIcon: 'cog-outline' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    music: MusicRoute,
    log: LogRoute,
    pantry: pantryRoute,
    settings: settingsRoute,
  });

  return (
    <>
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
            compact={true}
        />

        <FoodModal />
    </>
  );
};

export default App;