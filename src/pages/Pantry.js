import { useState } from "react"
import { SafeAreaView, View, FlatList } from "react-native"
import { TextInput, IconButton} from "react-native-paper"
import { useDispatch, useSelector } from "react-redux"
import FoodDisplay from "../components/FoodDisplay"
import { showFoodModal, showFoodSearchModal } from "../store/modal/actions"

const Pantry = () => {

    const dispatch = useDispatch();
    const { foods } = useSelector(state => state.foodReducer);
    const [filterTerm, updateFilterTerm] = useState('');
    const doSomething = (food) => {
        console.log('buttonAction', food)
    }

    const openEditModal = (foodId) => {
        console.log('openEditModal', foodId)
        dispatch(showFoodModal(foodId))
    }

    return (
        <SafeAreaView>  
            <View style={{flexDirection:'row'}}>
                <TextInput 
                    style={{width:'70%', marginLeft: 10}} 
                    mode='outlined'
                    label='Filter'
                    onChangeText={updateFilterTerm}
                />
                <IconButton icon='cloud-search-outline' onPress={() => dispatch(showFoodSearchModal())}/>
                <IconButton icon='cart-plus' onPress={() => dispatch(showFoodModal())}/>
                </View>
            <FlatList
                data={Object.values(foods).filter(food => {
                    return filterTerm.length > 0 
                            ? food.brandName.toLowerCase().includes(filterTerm.toLowerCase()) || food.name.toLowerCase().includes(filterTerm.toLowerCase())
                            : true;
                })}
                renderItem={({item, index, separators}) => {
                    return (
                        <FoodDisplay
                            food={item}
                            buttonAction={<IconButton icon='plus' onPress={() => doSomething(item)}/>}
                            displayAction={() => openEditModal(item.id)}
                        />
                    )
                    }}
            />        
        </SafeAreaView>
    )
}

export default Pantry;