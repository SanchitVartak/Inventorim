import { Outlet } from 'react-router';
import RetroFrame from './RetroFrame';
import { Toaster } from './ui/sonner';

export default function RetroLayout() {
  return (
    <RetroFrame>
      <Outlet />
      <Toaster />
    </RetroFrame>
  );
}