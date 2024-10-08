import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Footer from './components/Footer';
import Nav from './components/Nav'
import { BrowserRouter ,Routes,Route} from 'react-router-dom';
import SignUp from './components/SignUp';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import UpdateProduct from './components/UpdateProduct';
import Profile from './components/Profile';
// import Login from './components/Login';
function App() {
  return (
    <div className="App">
<BrowserRouter>
<Nav/>
{/* <Login/> */}
<Routes>
  
  <Route element={<PrivateComponent/>}>

<Route path="/" element ={<ProductList/>}/>
<Route path="/add" element ={<AddProduct/>}/>
<Route path="/update/:id" element ={<UpdateProduct />}/>
<Route path="/update/" element ={<ProductList/> }/>
<Route path="/logout" element ={<h1>Logout Listing component</h1>}/>
<Route path="/profile" element ={<Profile/> }/>
</Route>


<Route path="/signup" element={<SignUp/>}/>
<Route path="/login" element={<Login/>}/>
</Routes>

</BrowserRouter>
{/* <Footer/> */}
    </div>
  );
}

export default App;
