import { Routes, Route } from 'react-router-dom';
import Warehouse from './pages/Warehouse';
import InventoryList from './pages/InventoryList';
import UpdateStatus from './pages/UpdateStatus';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Warehouse />} />
      <Route path="/inventory-list" element={<InventoryList />} />
      <Route path="/update/:id" element={<UpdateStatus />} />
    </Routes>
  );
}

export default App;
