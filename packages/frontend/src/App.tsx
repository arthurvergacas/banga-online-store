import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import './global.css';

function App() {
  return (
    <div>
      <Navbar />

      <div id="pageContent">
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App;
