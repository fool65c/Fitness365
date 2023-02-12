import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, FlatList, SafeAreaView } from 'react-native'
import { 
    Modal, 
    Text, 
    TextInput, 
    Button, 
    ActivityIndicator, 
    Snackbar 
} from 'react-native-paper';

import { hideFoodSearchModal } from '../store/modal/actions';
import { updateFood } from '../store/food/actions';
import { searchUSDA, getUSDASearchProperties } from '../api/searchUSDA';
import FoodDisplay from "../components/FoodDisplay";

const FoodSearchModal = () => {

    const { showFoodSearchModal } = useSelector(state => state.modalReducer);
    const { USDAAPIKey } = useSelector(state => state.settingReducer);
    const { foods } = useSelector(state => state.foodReducer);

    const [ loading, updateLoading ] = React.useState(false);
    const [ brandName, updateBrandName ] = React.useState('');
    const [ name, updateName ] = React.useState('');
    const [ foodResults, updateFoodResults ] = React.useState({foods: []})
    const appendFoodResults = (updates) => {
        let temp = foodResults.foods
        console.log(temp[0])
        updateFoodResults({
            pageNumber: updates.pageNumber,
            totalPages: updates.totalPages,
            foods: foodResults.foods.concat(updates.foods)
        });
    }
    const [ showSnackBar, updateShowSnackBar] = React.useState(true)
    const containerStyle = {backgroundColor: 'white', padding: 5};

    const searchProperties = getUSDASearchProperties(USDAAPIKey, updateLoading, updateFoodResults)
    const updateSearchProperties = getUSDASearchProperties(USDAAPIKey, updateLoading, appendFoodResults)
    const dispatch = useDispatch();

    const hideModal = () => {
        dispatch(hideFoodSearchModal())
        updateBrandName('')
        updateName('')
        updateFoodResults({foods: []})
    }

    const saveFood = (food) => {
        updateShowSnackBar(true)
        dispatch(updateFood(food));
    }

    React.useEffect(() => {
        console.log(name)
        if (brandName.length > 3 || name.length > 3) {
            console.log("SEARCH")
            searchUSDA(brandName, name, searchProperties);
        }
    }, [brandName, name])

    React.useEffect(() => {
        if (!showSnackBar) {
            return
        }
        setTimeout(() => {
            updateShowSnackBar(false);
        }, 5000);
    }, [showSnackBar])

    const getNextPage = () => {
        if (foodResults.pageNumber == foodResults.totalPages) {
            console.log('end of results');
            return;
        }

        searchUSDA(brandName, name, updateSearchProperties, foodResults.pageNumber + 1)
    }

    return (
        
        <Modal visible={showFoodSearchModal} onDismiss={hideModal} contentContainerStyle={containerStyle}>
            <SafeAreaView >
            <View flexDirection='row' style={{justifyContent:'space-between'}}>
                <Text variant='headlineMedium'>Food Search</Text>
                <ActivityIndicator 
                    animating={loading} 
                    color='purple' 
                    hidesWhenStopped={true}
                />
                <Button
                    mode='outlined'
                    icon='close'
                    onPress={hideModal}
                >
                    Close
                </Button>
            </View>
            <TextInput 
                mode='outlined'
                inputmode='text'
                label='Brand Name'
                placeholder='Brand name'
                value={brandName}
                onChangeText={updateBrandName}
                style={inputStyle}
            />
            <TextInput 
                mode='outlined'
                inputmode='text'
                label='Name'
                placeholder='Food name'
                value={name}
                onChangeText={updateName}
                style={inputStyle}
            />
            <FlatList
                style={{height:'75%', marginTop:5}}
                data={foodResults.foods.filter((food) => {
                    return !(food.id in foods)
                })}
                onEndReached={getNextPage}
                renderItem={({item, index, separators}) => (
                    <FoodDisplay 
                        food={item}
                        displayAction={() => saveFood(item)}
                    />
                )}
            />
            <Snackbar
                visible={showSnackBar}
                label='Something'
                action={{
                    label: 'OK',
                    onpress: () => {
                        updateShowSnackBar(false);
                    }
                }}
                onDismiss={() => updateShowSnackBar(false)}
            >
                Added Food to Pantry
            </Snackbar>
            </SafeAreaView>
        </Modal>
    );
};

const inputStyle = {
    marginLeft: 5,
    marginRight: 5
}

export default FoodSearchModal;
