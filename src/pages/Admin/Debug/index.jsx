import React, { useState, useEffect } from 'react';
import './styles.css';

const Debug = () => {
  const [systemInfo, setSystemInfo] = useState({
    version: '1.0.0',
    nodeVersion: 'v16.14.2',
    platform: 'win32',
    memory: {
      total: '8GB',
      free: '2.5GB',
      usage: '68%'
    },
    uptime: '5 days, 3 hours',
    lastDeployment: '2023-10-02 09:15:32'
  });
  
  const [logs, setLogs] = useState([
    { time: '2023-10-08 14:25:12', level: 'INFO', message: 'User login successful: admin' },
    { time: '2023-10-08 14:22:35', level: 'ERROR', message: 'Failed to connect to payment gateway: Timeout' },
    { time: '2023-10-08 13:45:10', level: 'WARNING', message: 'Low inventory alert: Product ID 156' },
    { time: '2023-10-08 12:30:22', level: 'INFO', message: 'Order #ORD-001 status changed to Completed' },
    { time: '2023-10-08 11:15:43', level: 'ERROR', message: 'Database query error: Table products not found' },
    { time: '2023-10-08 10:05:18', level: 'INFO', message: 'System backup completed successfully' },
    { time: '2023-10-08 09:30:05', level: 'WARNING', message: 'High server load detected: 85% CPU usage' },
    { time: '2023-10-08 08:45:59', level: 'INFO', message: 'Application started successfully' }
  ]);
  
  const [activeTab, setActiveTab] = useState('system');
  const [logFilter, setLogFilter] = useState('all');
  
  // Simulate timer for uptime
  useEffect(() => {
    const timer = setInterval(() => {
      // In a real application, this would fetch real-time data
      const randomLogEntry = {
        time: new Date().toISOString().replace('T', ' ').slice(0, 19),
        level: ['INFO', 'WARNING', 'ERROR'][Math.floor(Math.random() * 3)],
        message: `Random log event ${Math.floor(Math.random() * 1000)}`
      };
      
      setLogs(prevLogs => [randomLogEntry, ...prevLogs.slice(0, 7)]);
    }, 60000); // Every minute
    
    return () => clearInterval(timer);
  }, []);
  
  const handleLogFilterChange = (e) => {
    setLogFilter(e.target.value);
  };
  
  const filteredLogs = logFilter === 'all' 
    ? logs 
    : logs.filter(log => log.level === logFilter);
  
  const handleClearLogs = () => {
    setLogs([{
      time: new Date().toISOString().replace('T', ' ').slice(0, 19),
      level: 'INFO',
      message: 'Logs cleared by admin'
    }]);
  };
  
  return (
    <div className="debug-container">
      <div className="debug-header">
        <h2>Debug Information</h2>
        <div className="debug-tabs">
          <button 
            className={activeTab === 'system' ? 'active' : ''} 
            onClick={() => setActiveTab('system')}
          >
            System Info
          </button>
          <button 
            className={activeTab === 'logs' ? 'active' : ''} 
            onClick={() => setActiveTab('logs')}
          >
            Log Viewer
          </button>
          <button 
            className={activeTab === 'tools' ? 'active' : ''} 
            onClick={() => setActiveTab('tools')}
          >
            Debug Tools
          </button>
        </div>
      </div>
      
      <div className="debug-content">
        {activeTab === 'system' && (
          <div className="system-info">
            <div className="info-card">
              <h3>Application</h3>
              <div className="info-item">
                <span className="info-label">Version:</span>
                <span className="info-value">{systemInfo.version}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Node Version:</span>
                <span className="info-value">{systemInfo.nodeVersion}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Platform:</span>
                <span className="info-value">{systemInfo.platform}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Uptime:</span>
                <span className="info-value">{systemInfo.uptime}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Last Deployment:</span>
                <span className="info-value">{systemInfo.lastDeployment}</span>
              </div>
            </div>
            
            <div className="info-card">
              <h3>Memory Usage</h3>
              <div className="memory-gauge">
                <div 
                  className="memory-usage" 
                  style={{ width: systemInfo.memory.usage }}
                ></div>
              </div>
              <div className="info-item">
                <span className="info-label">Total:</span>
                <span className="info-value">{systemInfo.memory.total}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Free:</span>
                <span className="info-value">{systemInfo.memory.free}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Usage:</span>
                <span className="info-value">{systemInfo.memory.usage}</span>
              </div>
            </div>
            
            <div className="info-card">
              <h3>Environment Variables</h3>
              <div className="env-variables">
                <code>
                  NODE_ENV=production<br />
                  PORT=3000<br />
                  API_URL=https://api.example.com<br />
                  DEBUG=false<br />
                  DB_HOST=localhost<br />
                  DB_PORT=5432<br />
                  DB_NAME=sonit_db<br />
                  {/* Sensitive info is masked */}
                  DB_USER=******<br />
                  DB_PASS=******<br />
                </code>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'logs' && (
          <div className="logs-viewer">
            <div className="logs-controls">
              <div className="log-filter">
                <label>Filter by level:</label>
                <select value={logFilter} onChange={handleLogFilterChange}>
                  <option value="all">All Levels</option>
                  <option value="INFO">Info Only</option>
                  <option value="WARNING">Warnings Only</option>
                  <option value="ERROR">Errors Only</option>
                </select>
              </div>
              
              <button className="clear-logs-btn" onClick={handleClearLogs}>
                Clear Logs
              </button>
            </div>
            
            <div className="logs-table-container">
              <table className="logs-table">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Level</th>
                    <th>Message</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.map((log, index) => (
                    <tr key={index} className={`log-level-${log.level.toLowerCase()}`}>
                      <td>{log.time}</td>
                      <td>{log.level}</td>
                      <td>{log.message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'tools' && (
          <div className="debug-tools">
            <div className="tool-card">
              <h3>Cache Management</h3>
              <p>Clear application cache to force refresh of data.</p>
              <button className="tool-button">Clear Cache</button>
            </div>
            
            <div className="tool-card">
              <h3>Database</h3>
              <p>Run database maintenance operations.</p>
              <div className="tool-buttons">
                <button className="tool-button">Verify Connection</button>
                <button className="tool-button">Run Migrations</button>
                <button className="tool-button">Backup Database</button>
              </div>
            </div>
            
            <div className="tool-card">
              <h3>API Testing</h3>
              <p>Test API endpoints and connections.</p>
              <div className="endpoint-tester">
                <select>
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="PUT">PUT</option>
                  <option value="DELETE">DELETE</option>
                </select>
                <input type="text" placeholder="/api/endpoint" />
                <button className="tool-button">Send</button>
              </div>
            </div>
            
            <div className="tool-card">
              <h3>Performance</h3>
              <p>Analyze application performance metrics.</p>
              <button className="tool-button">Run Performance Test</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Debug; 