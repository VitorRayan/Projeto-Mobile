import { registerRootComponent } from 'expo';
import AppNavigator from './AppNavigator';

function App() {
  return (
    <AppNavigator />
  );
}

registerRootComponent(App);
