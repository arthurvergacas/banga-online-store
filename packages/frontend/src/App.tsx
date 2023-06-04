import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import './global.css';

function App() {
  return (
    <>
      <Navbar />

      <div id="pageContent">
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
