import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';

import Settings from './pages/Settings';
import Pantry from './pages/Pantry';
import History from './pages/History';
import FoodModal from './modal/FoodModal';
import FoodSearchModal from './modal/FoodSearchModal';
import LogDetialModal from './modal/LogDetailModal';

const MusicRoute = () => <Text>Music</Text>;

const HistoryRoute = () => <History />;

const pantryRoute = () => <Pantry />;

const settingsRoute = () => <Settings />;


const App = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'music', title: 'Home', focusedIcon: 'heart', unfocusedIcon: 'heart-outline'},
    { key: 'history', title: 'History', focusedIcon: 'book-open', unfocusedIcon:'book-outline' },
    { key: 'pantry', title: 'Pantry', focusedIcon: 'food-apple', unfocusedIcon: 'food-apple-outline' },
    { key: 'settings', title: 'Settings', focusedIcon: 'cog', unfocusedIcon: 'cog-outline' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    music: MusicRoute,
    history: HistoryRoute,
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

        <FoodSearchModal />

        <LogDetialModal />
    </>
  );
};

export default App;