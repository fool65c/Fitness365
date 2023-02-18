import { View, Pressable } from "react-native"
import { useSelector } from 'react-redux';

import { Surface, Text, ProgressBar } from 'react-native-paper';

const LogSummary = (props) => {
    const day = props.day;
    const action = props.action ? props.action : null;
    const { dailyGoals } = useSelector(state => state.settingReducer);

    return (
        <Pressable onPress={action}>
            <Surface elevation={1} style={{margin: 10, marginLeft: 10, padding: 10}}>
                <Text variant='labelLarge' style={{textAlign:'center'}}>{day.date}</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                    <View style={{flexDirection: 'column', width: 55}}>
                        <Text variant='labelSmall'>Protine</Text>
                        <ProgressBar progress={day.summary.protine / dailyGoals.protine} color='green' />
                    </View>
                    <View style={{flexDirection: 'column', width: 55}}>
                        <Text variant='labelSmall'>Carbs</Text>
                        <ProgressBar progress={day.summary.carbs / dailyGoals.carbs} color='green' />
                    </View>
                    <View style={{flexDirection: 'column', width: 55}}>
                        <Text variant='labelSmall'>Fat</Text>
                        <ProgressBar progress={day.summary.fat / dailyGoals.fat} color='red' />
                    </View>
                </View>
            </Surface>
        </Pressable>
    )
}

export default LogSummary;