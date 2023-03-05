import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';

import Settings from './Settings';
import Pantry from './Pantry';
import History from './History';
import Meals from './Meals';
import FoodModal from '../modal/FoodModal';
import LogDetialModal from '../modal/LogDetailModal';

const Main = (props) => {
  const MusicRoute = () => <Text>Music</Text>;
  const mealsRoute = () => <Meals props={props}/>;

  const HistoryRoute = () => <History />;

  const pantryRoute = () => <Pantry props={{...props}}/>;

  const settingsRoute = () => <Settings />;
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'music', title: 'Home', focusedIcon: 'heart', unfocusedIcon: 'heart-outline'},
    { key: 'history', title: 'History', focusedIcon: 'book-open', unfocusedIcon:'book-outline' },
    { key: 'meals', title: 'Meals', focusedIcon: 'bowl-mix', unfocusedIcon: 'bowl-mix-outline' },
    { key: 'pantry', title: 'Pantry', focusedIcon: 'food-apple', unfocusedIcon: 'food-apple-outline' },
    { key: 'settings', title: 'Settings', focusedIcon: 'cog', unfocusedIcon: 'cog-outline' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    music: MusicRoute,
    history: HistoryRoute,
    meals: mealsRoute,
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

        <LogDetialModal />
    </>
  );
};

export default Main;