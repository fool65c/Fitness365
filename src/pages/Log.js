import * as React from 'react';
import { SafeAreaView, Pressable, View } from 'react-native';
import { List , Surface, Text, ProgressBar } from 'react-native-paper';

const Log = () => {
    
    const meals = {
        [new Date()]: {
            breakfast: [
                {
                    brandName: 'Kodiak Cakes',
                    name: 'Buttermilk Pancakes',
                    
                    servingSize: {
                        value: 53,
                        units: 'G'
                    },
                    calories: {
                        value: 120,
                        units: 'KCAL'
                    },
                    protine: {
                        value: 12,
                        units: 'G'
                    },
                    carbs: {
                        value: 20,
                        units: 'G'
                    },
                    fat: {
                        value: 2,
                        units: 'G'
                    }
                }
            ]
        }
    }
    return (
        <SafeAreaView>
            <Text variant='titleLarge' style={{marginLeft: 10}}>Daily Log</Text>
            <Pressable>
                <Surface elevation={1} style={{margin: 10, marginLeft: 10, padding: 10}}>
                    <Text variant='labelLarge' style={{textAlign:'center'}}>02/03/2023</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                        <View style={{flexDirection: 'column', width: 55}}>
                            <Text variant='labelSmall'>Protine</Text>
                            <ProgressBar progress={0.5} color='green' />
                        </View>
                        <View style={{flexDirection: 'column', width: 55}}>
                            <Text variant='labelSmall'>Carbs</Text>
                            <ProgressBar progress={0.5} color='green' />
                        </View>
                        <View style={{flexDirection: 'column', width: 55}}>
                            <Text variant='labelSmall'>Fat</Text>
                            <ProgressBar progress={1.2} color='red' />
                        </View>
                    </View>
                </Surface>
            </Pressable>
        </SafeAreaView>
  );
};

export default Log;