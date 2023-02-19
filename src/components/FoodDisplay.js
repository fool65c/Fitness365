import { View, Pressable } from "react-native"
import { Text, Surface} from "react-native-paper"

const FoodDisplay = (props) => {
    const food = props.food
    const buttonAction = props.buttonAction ? props.buttonAction : null;
    const displayAction = props.displayAction ? props.displayAction : null;
    return (
        <Pressable onPress={displayAction}>
            <Surface  
                elevation={1} 
                style={foodStyle}
            >
                <View flexDirection='row' style={{justifyContent: 'space-between'}}>
                    <View flexDirection='column' style={{alignSelf:'center', marginLeft:5}}>
                        <Text variant='labelLarge'>{food.name && food.name.length > 46 ? food.name.substr(0, 45) + '\u2026' : food.name}</Text>
                        <Text variant='bodyMedium'>{food.brandName}</Text>
                        <View flexDirection='row'>
                            <Text variant='bodyMedium'>Serving:</Text>
                            <Text variant='bodyMedium'>{food.servingSize.value}</Text>
                            <Text variant='bodyMedium'>{food.servingSize.units}</Text>
                            <Text variant='bodyMedium'> </Text>
                            <Text variant='bodyMedium'>
                                {
                                    food.servings ? 
                                    Math.ceil(food.servings * food.calories.value) :
                                    Math.ceil(food.calories.value)
                                }
                            </Text>
                            <Text variant='bodyMedium'>{food.calories.units}</Text>
                            <Text variant='bodyMedium'> P:</Text>
                            <Text variant='bodyMedium'>
                                {
                                    food.servings ? 
                                    Math.ceil(food.servings * food.protine.value) :
                                    Math.ceil(food.protine.value)
                                }
                            </Text>
                            <Text variant='bodyMedium'>{food.protine.unit}</Text>
                            <Text variant='bodyMedium'> C:</Text>
                            <Text variant='bodyMedium'>
                                {
                                    food.servings ? 
                                    Math.ceil(food.servings * food.carbs.value) : 
                                    Math.ceil(food.carbs.value) 
                                }
                            </Text>
                            <Text variant='bodyMedium'>{food.carbs.unit}</Text>
                            <Text variant='bodyMedium'> F:</Text>
                            <Text variant='bodyMedium'>
                                {
                                    food.servings ?
                                    Math.ceil(food.servings * food.fat.value) :
                                    Math.ceil(food.fat.value)
                                }
                            </Text>
                            <Text variant='bodyMedium'>{food.fat.unit}</Text>
                        </View>
                    </View>
                    <View flexDirection='column' style={{ alignSelf: "flex-end" }}>
                        {buttonAction}
                    </View>
                </View>
            </Surface>
        </Pressable>
    )
}

const foodStyle = {
    display:'flex',
    marginLeft: 10, 
    marginRight: 10,
    marginBottom: 5,
    marginTop:5

}

export default FoodDisplay;