import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UpdateStatus() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cylinder, setCylinder] = useState(null);

  // Fetch data for selected cylinder
  useEffect(() => {
    axios.get(`http://localhost:3006/api/cylinders/${id}`).then((res) => {
      setCylinder(res.data);
    }).catch((err) => {
      console.error("Failed to fetch cylinder data:", err);
    });
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCylinder((prev) => ({ ...prev, [name]: value }));
  };

  // Save updates to backend
  const handleSubmit = () => {
    axios.put(`http://localhost:3006/api/cylinders/${id}`, {
      current_status: cylinder.current_status,
      warehouse: cylinder.warehouse
    })
    .then(() => {
      alert('Status updated successfully!');
      navigate('/'); // Go back to warehouse
    })
    .catch((err) => {
      console.error("Update failed:", err);
      alert('Failed to update status.');
    });
  };

  if (!cylinder) return <div>Loading...</div>;

  return (
    <div className="container update-status-container">
      <h2>Update Cylinder Status</h2>

      <div className="form-group">
        <label id="serial">Serial No.:</label>
        <input
          name="serial_no"
          value={cylinder.serial_no || ''}
          readOnly
        />
      </div>

      <div className="form-group">
        <label>Current Status:</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="current_status"
              value="Full"
              checked={cylinder.current_status === 'Full'}
              onChange={handleChange}
            /> Full Cylinder
          </label>
          <label>
            <input
              type="radio"
              name="current_status"
              value="Empty"
              checked={cylinder.current_status === 'Empty'}
              onChange={handleChange}
            /> Empty Cylinder
          </label>
        </div>
      </div>

      <div className="form-group">
        <label>Warehouse:</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="warehouse"
              value="In"
              checked={cylinder.warehouse === 'In'}
              onChange={handleChange}
            /> In
          </label>
          <label>
            <input
              type="radio"
              name="warehouse"
              value="Out"
              checked={cylinder.warehouse === 'Out'}
              onChange={handleChange}
            /> Out
          </label>
        </div>
      </div>

      <button onClick={handleSubmit}>Update Status</button>
    </div>
  );
}

export default UpdateStatus;
