import { createAppContainer, createStackNavigator } from 'react-navigation';

import Home from './screens/Home';

const Routes = createAppContainer(
    createStackNavigator({
        Home,
    })
);

export default Routes;
