import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import './global.css';

function App() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
