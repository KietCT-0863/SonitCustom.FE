import React from 'react';
import './styles.css';

const Analytics = () => {
  return (
    <div className="analytics-container">
      <h2>Analytics Dashboard</h2>
      
      <div className="analytics-cards">
        <div className="analytics-card">
          <h3>Total Sales</h3>
          <div className="analytics-value">$24,350</div>
          <div className="analytics-change positive">+12% from last month</div>
        </div>
        
        <div className="analytics-card">
          <h3>Orders</h3>
          <div className="analytics-value">156</div>
          <div className="analytics-change positive">+8% from last month</div>
        </div>
        
        <div className="analytics-card">
          <h3>Customers</h3>
          <div className="analytics-value">84</div>
          <div className="analytics-change positive">+24% from last month</div>
        </div>
        
        <div className="analytics-card">
          <h3>Conversion Rate</h3>
          <div className="analytics-value">3.2%</div>
          <div className="analytics-change negative">-0.8% from last month</div>
        </div>
      </div>
      
      <div className="analytics-charts">
        <div className="analytics-chart-container">
          <h3>Monthly Sales</h3>
          <div className="analytics-chart">
            {/* In a real app, you would use a chart library here */}
            <div className="placeholder-chart">Chart Visualization Placeholder</div>
          </div>
        </div>
        
        <div className="analytics-chart-container">
          <h3>Traffic Sources</h3>
          <div className="analytics-chart">
            <div className="placeholder-chart">Chart Visualization Placeholder</div>
          </div>
        </div>
      </div>
      
      <div className="analytics-table-container">
        <h3>Top Products</h3>
        <table className="analytics-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Units Sold</th>
              <th>Revenue</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Premium Leather Wallet</td>
              <td>Accessories</td>
              <td>$89.99</td>
              <td>64</td>
              <td>$5,759.36</td>
            </tr>
            <tr>
              <td>Custom Engraved Watch</td>
              <td>Watches</td>
              <td>$199.99</td>
              <td>28</td>
              <td>$5,599.72</td>
            </tr>
            <tr>
              <td>Handcrafted Belt</td>
              <td>Accessories</td>
              <td>$59.99</td>
              <td>47</td>
              <td>$2,819.53</td>
            </tr>
            <tr>
              <td>Leather Smartphone Case</td>
              <td>Tech Accessories</td>
              <td>$39.99</td>
              <td>53</td>
              <td>$2,119.47</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Analytics; 