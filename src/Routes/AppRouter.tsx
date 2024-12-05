import { Routes, Route, Router } from 'react-router-dom';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import Login from '../Components/Login';
import Locations from '../Components/Locations';

export const AppRouter = () => (
  <Routes>
    <Route element={<PublicRoute />}>
      <Route path="/" element={<Login />} />
    </Route>
    
    <Route element={<PrivateRoute />}>
      <Route path="/locations" element={<Locations />} />
    </Route>
    
    <Route path="*" element={<Login />} />
  </Routes>

);


export default AppRouter;