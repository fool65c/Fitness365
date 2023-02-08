import * as React from 'react';
import { View } from 'react-native';
import { Appbar } from 'react-native-paper';

const Navigation = (props) => {

    return (
  <Appbar.Header>
    {
        props.back ? 
        <Appbar.BackAction onPress={props.navigation.goBack} /> 
        : null
    }
    <Appbar.Content title={props.route.name} />
    <Appbar.Action icon="magnify" onPress={() => {}} />
    {
        props.route.name == 'Settings'
        ? null
        : <Appbar.Action 
        icon="cog"
        onPress={() => props.navigation.navigate('Settings')}
    />
    
    }
    
  </Appbar.Header>
    )
    };

export default Navigation;