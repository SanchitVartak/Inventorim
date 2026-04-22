import { createBrowserRouter } from 'react-router';
import RetroLayout from './components/RetroLayout';
import MainScreen from './components/MainScreen';
import InventoryScreen from './components/InventoryScreen';
import AddItemScreen from './components/AddItemScreen';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RetroLayout,
    children: [
      {
        index: true,
        Component: MainScreen,
      },
      {
        path: 'inventory',
        Component: InventoryScreen,
      },
      {
        path: 'add-item',
        Component: AddItemScreen,
      },
    ],
  },
]);