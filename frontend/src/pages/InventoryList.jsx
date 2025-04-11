import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function InventoryList() {
  const [cylinders, setCylinders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3006/api/cylinders').then((res) => {
      setCylinders(res.data);
    });
  }, []);

  return (
    <div className="container">
      <h2>Inventory List</h2>
      <table>
        <thead>
          <tr>
            <th>Cylinder</th>
            <th>Full</th>
            <th>Empty</th>
            <th>Serial No.</th>
            <th>Current Status</th>
            <th>Warehouse</th>
          </tr>
        </thead>
        <tbody>
          {cylinders.map((cyl) => (
            <tr key={cyl.id} onClick={() => navigate(`/update/${cyl.id}`)}>
              <td>{cyl.name}</td>
              <td>{cyl.full_count}</td>
              <td>{cyl.empty_count}</td>
              <td>{cyl.serial_no}</td>
              <td>{cyl.current_status}</td>
              <td>{cyl.warehouse}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InventoryList;
