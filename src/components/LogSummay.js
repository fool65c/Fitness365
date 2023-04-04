import { View, Pressable } from "react-native"
import { useSelector } from 'react-redux';

import { Surface, Text, ProgressBar } from 'react-native-paper';

const LogSummary = (props) => {
    const day = props.day;
    console.log(day)
    const action = props.action ? props.action : null;
    const { dailyGoals, mealCount } = useSelector(state => state.settingReducer);
    const protine = props.showMealSummary ? day.protine.value / (dailyGoals.protine / mealCount) : day.summary.protine / dailyGoals.protine;
    const carbs = props.showMealSummary ? day.carbs.value / (dailyGoals.carbs / mealCount) : day.summary.carbs / dailyGoals.carbs;
    const fat = props.showMealSummary ? day.fat.value / (dailyGoals.fat / mealCount) : day.summary.fat / dailyGoals.fat;
    const getColor = (ratio) => {
        if (ratio < 0.75) {
            return 'yellow';
        } else if (ratio < 1) {
            return 'green';
        }
        return 'red';
    }

    const displayInlineButton = () => {
        if (props.button) {
            return props.button
        } else {
            return false
        }
    }

    return (
        <Pressable onPress={action}>
            <Surface elevation={1} style={{margin: 10, marginLeft: 10, padding: 10}}>
                <View flexDirection='row' style={{justifyContent: 'space-around'}}>
                <View style={{justifyContent: 'space-evenly', width:'80%'}}>
                <Text variant='labelLarge' style={{textAlign:'center'}}>{day.date}</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                    <View style={{flexDirection: 'column', width: 55}}>
                        <Text variant='labelSmall'>Protine</Text>
                        <ProgressBar 
                            progress={protine} 
                            color={getColor(protine)} 
                        />
                    </View>
                    <View style={{flexDirection: 'column', width: 55}}>
                        <Text variant='labelSmall'>Carbs</Text>
                        <ProgressBar 
                            progress={carbs} 
                            color={getColor(carbs)} 
                        />
                    </View>
                    <View style={{flexDirection: 'column', width: 55}}>
                        <Text variant='labelSmall'>Fat</Text>
                        <ProgressBar 
                            progress={fat} 
                            color={getColor(fat)} 
                        />
                    </View>
                </View>
                </View>

                    {
                        displayInlineButton()
                    }

                </View>
            </Surface>
        </Pressable>
    )
}

export default LogSummary;