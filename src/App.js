import logo from './logo.svg';
import './App.css';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import {BrowserRouter as Router, Routes , Route, Outlet, Navigate, Link} from "react-router-dom";
import ProtectedRoutes from './services/protectedRoutes';
import AdminMainPage from './pages/admin/MainPage';
import ClientMainPage from './pages/user/MainPage';
import UsersPage from './pages/admin/UsersPage';
import ProfilePage from './pages/user/ProfilePage';
import AdvertTypesPage from './pages/advertTypes/AdvertTypesPage';
import EditAdvertTypePage from './pages/advertTypes/EditAdvertTypePage';
import NewAdvertTypePage from './pages/advertTypes/NewAdvertTypePage';
import AdvertsPage from './pages/adverts/AdvertsPage';
import EditAdvertPage from './pages/adverts/EditAdvertPage';
import NewAdvertPage from './pages/adverts/NewAdvertPage';
import CarsPage from './pages/car/CarsPage';
import NewCarPage from './pages/car/NewCarPage';
import EditCarPage from './pages/car/EditCarPage';
import AllAdvertsPage from './pages/admin/AllAdvertsPage';
import AllCarsPage from './pages/admin/AllCarsPage';
import AdminEditAdvertPage from './pages/admin/EditAdvertPage';
import AdminEditCarPage from './pages/admin/EditCarPage';
import SearchPage from './pages/user/SearchPage';
import AdvertPage from './pages/adverts/AdvertPage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<ProtectedRoutes requireAdmin={true}/>}>
            <Route path="/" element={<Navigate replace to="dashboard" />}/>
            <Route path="/dashboard" element={<AdminMainPage/>}/>
            <Route path="/users" element={<UsersPage/>}/>
            <Route path="/advertTypes" element={<AdvertTypesPage/>}/>
            <Route path="/advertTypes/edit" element={<EditAdvertTypePage/>}/>
            <Route path="/advertTypes/new" element={<NewAdvertTypePage/>}/>
            <Route path="/allAdverts" element={<AllAdvertsPage/>}/>
            <Route path="/allAdverts/edit" element={<AdminEditAdvertPage/>}/>
            <Route path="/allCars" element={<AllCarsPage/>}/>
            <Route path="/allCars/edit" element={<AdminEditCarPage/>}/>
          </Route>

          <Route path="/" element={<ProtectedRoutes requireAdmin={false}/>}>
            <Route path="/" element={<Navigate replace to="main" />}/>
            <Route path="/main" element={<ClientMainPage/>}/>
            <Route path="/profile" element={<ProfilePage/>}/>
            <Route path="/adverts" element={<AdvertsPage/>}/>
            <Route path="/adverts/edit" element={<EditAdvertPage/>}/>
            <Route path="/adverts/new" element={<NewAdvertPage/>}/>
            <Route path="/cars" element={<CarsPage/>}/>
            <Route path="/cars/new" element={<NewCarPage/>}/>
            <Route path="/cars/edit" element={<EditCarPage/>}/>
            <Route path="/search" element={<SearchPage/>}/>
            <Route path="/advert" element={<AdvertPage/>}/>
          </Route>

          <Route path="/" element={<Outlet/>}>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
