import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Warehouse() {
  const [cylinders, setCylinders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3006/api/cylinders').then((res) => {
      setCylinders(res.data);
    });
  }, []);

  return (
    <div className="container">
      <h2>Warehouse Summary</h2>
      <table>
        <thead>
          <tr>
            <th>Cylinder</th>
            <th>Full</th>
            <th>Empty</th>
          </tr>
        </thead>
        <tbody>
          {cylinders.map((cyl) => (
            <tr key={cyl.id} onClick={() => navigate(`/update/${cyl.id}`)}>
              <td>{cyl.name}</td>
              <td>{cyl.full_count}</td>
              <td>{cyl.empty_count}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={() => navigate('/inventory-list')}
        className="update-btn"
      >
        Update Inventory
      </button>
    </div>
  );
}

export default Warehouse;
