import registerRootComponent from 'expo/build/launch/registerRootComponent';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Store, Persistor } from './store/store';
import App from './App';

 
const ReduxApp = () => (
    <Provider store={Store}>
        <SafeAreaProvider>
            <PersistGate loading={null} persistor={Persistor}>
                <App />
            </PersistGate>
        </SafeAreaProvider>
    </Provider>
)

registerRootComponent(ReduxApp);