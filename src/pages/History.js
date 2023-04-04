import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { SafeAreaView, FlatList } from 'react-native';
import { Text } from 'react-native-paper';

import { showLogDetailModal } from '../store/modal/actions';
import LogSummary from '../components/LogSummay';


const History = () => {
    const { log } = useSelector(state => state.logReducer);
    const dispatch = useDispatch();

    const summaryClick = (day) => {
        dispatch(showLogDetailModal(day.date))
    }

    return (
        <>
            <SafeAreaView>
                <Text variant='titleLarge' style={{marginLeft: 10}}>Daily Log</Text>
                <FlatList 
                    data={Object.values(log)}
                    renderItem={({item}) => {
                        console.log(item)
                        return <LogSummary day={item} action={() => summaryClick(item)}/>  
                    }}
                />
            </SafeAreaView>
        </>
  );
};

export default History;