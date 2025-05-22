import React, { useState } from 'react';
import './styles.css';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState({
    siteName: 'Sonit Custom Store',
    siteUrl: 'https://sonitcustom.com',
    adminEmail: 'admin@sonitcustom.com',
    currencySymbol: '$',
    orderPrefix: 'ORD-',
    itemsPerPage: '10',
    enableNotifications: true,
    enableGuestCheckout: true,
    maintenanceMode: false,
    smtpHost: 'smtp.mailserver.com',
    smtpPort: '587',
    smtpUsername: 'notifications@sonitcustom.com',
    smtpPassword: '********',
    backupFrequency: 'daily',
    apiKey: 'sk_test_12345abcdef',
    apiKeyHidden: true
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleTogglePassword = (field) => {
    setFormData({
      ...formData,
      [`${field}Hidden`]: !formData[`${field}Hidden`]
    });
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would save the settings
    console.log('Saving settings:', formData);
    // Display a success message or similar
  };

  return (
    <div className="settings-container">
      <h2>System Settings</h2>
      
      <div className="settings-content">
        <div className="settings-sidebar">
          <ul className="settings-tabs">
            <li 
              className={activeTab === 'general' ? 'active' : ''} 
              onClick={() => handleTabChange('general')}
            >
              General
            </li>
            <li 
              className={activeTab === 'store' ? 'active' : ''} 
              onClick={() => handleTabChange('store')}
            >
              Store
            </li>
            <li 
              className={activeTab === 'mail' ? 'active' : ''} 
              onClick={() => handleTabChange('mail')}
            >
              Email
            </li>
            <li 
              className={activeTab === 'api' ? 'active' : ''} 
              onClick={() => handleTabChange('api')}
            >
              API & Integrations
            </li>
            <li 
              className={activeTab === 'backup' ? 'active' : ''} 
              onClick={() => handleTabChange('backup')}
            >
              Backup & Security
            </li>
          </ul>
        </div>
        
        <div className="settings-panel">
          <form onSubmit={handleSubmit}>
            {/* General Settings */}
            {activeTab === 'general' && (
              <div className="settings-section">
                <h3>General Settings</h3>
                
                <div className="form-group">
                  <label htmlFor="siteName">Site Name</label>
                  <input
                    type="text"
                    id="siteName"
                    name="siteName"
                    value={formData.siteName}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="siteUrl">Site URL</label>
                  <input
                    type="url"
                    id="siteUrl"
                    name="siteUrl"
                    value={formData.siteUrl}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="adminEmail">Admin Email</label>
                  <input
                    type="email"
                    id="adminEmail"
                    name="adminEmail"
                    value={formData.adminEmail}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group checkbox-group">
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      name="maintenanceMode"
                      checked={formData.maintenanceMode}
                      onChange={handleInputChange}
                    />
                    <span className="checkmark"></span>
                    Enable Maintenance Mode
                  </label>
                </div>
              </div>
            )}
            
            {/* Store Settings */}
            {activeTab === 'store' && (
              <div className="settings-section">
                <h3>Store Settings</h3>
                
                <div className="form-group">
                  <label htmlFor="currencySymbol">Currency Symbol</label>
                  <input
                    type="text"
                    id="currencySymbol"
                    name="currencySymbol"
                    value={formData.currencySymbol}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="orderPrefix">Order ID Prefix</label>
                  <input
                    type="text"
                    id="orderPrefix"
                    name="orderPrefix"
                    value={formData.orderPrefix}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="itemsPerPage">Items Per Page</label>
                  <select
                    id="itemsPerPage"
                    name="itemsPerPage"
                    value={formData.itemsPerPage}
                    onChange={handleInputChange}
                  >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                </div>
                
                <div className="form-group checkbox-group">
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      name="enableGuestCheckout"
                      checked={formData.enableGuestCheckout}
                      onChange={handleInputChange}
                    />
                    <span className="checkmark"></span>
                    Enable Guest Checkout
                  </label>
                </div>
              </div>
            )}
            
            {/* Email Settings */}
            {activeTab === 'mail' && (
              <div className="settings-section">
                <h3>Email Settings</h3>
                
                <div className="form-group">
                  <label htmlFor="smtpHost">SMTP Host</label>
                  <input
                    type="text"
                    id="smtpHost"
                    name="smtpHost"
                    value={formData.smtpHost}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="smtpPort">SMTP Port</label>
                  <input
                    type="text"
                    id="smtpPort"
                    name="smtpPort"
                    value={formData.smtpPort}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="smtpUsername">SMTP Username</label>
                  <input
                    type="text"
                    id="smtpUsername"
                    name="smtpUsername"
                    value={formData.smtpUsername}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="smtpPassword">SMTP Password</label>
                  <div className="password-field">
                    <input
                      type={formData.smtpPasswordHidden ? 'password' : 'text'}
                      id="smtpPassword"
                      name="smtpPassword"
                      value={formData.smtpPassword}
                      onChange={handleInputChange}
                    />
                    <button 
                      type="button"
                      className="password-toggle"
                      onClick={() => handleTogglePassword('smtpPassword')}
                    >
                      {formData.smtpPasswordHidden ? '👁️' : '🔒'}
                    </button>
                  </div>
                </div>
                
                <div className="form-group checkbox-group">
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      name="enableNotifications"
                      checked={formData.enableNotifications}
                      onChange={handleInputChange}
                    />
                    <span className="checkmark"></span>
                    Enable Email Notifications
                  </label>
                </div>
              </div>
            )}
            
            {/* API Settings */}
            {activeTab === 'api' && (
              <div className="settings-section">
                <h3>API & Integration Settings</h3>
                
                <div className="form-group">
                  <label htmlFor="apiKey">API Key</label>
                  <div className="password-field">
                    <input
                      type={formData.apiKeyHidden ? 'password' : 'text'}
                      id="apiKey"
                      name="apiKey"
                      value={formData.apiKey}
                      onChange={handleInputChange}
                      className="code-input"
                    />
                    <button 
                      type="button"
                      className="password-toggle"
                      onClick={() => handleTogglePassword('apiKey')}
                    >
                      {formData.apiKeyHidden ? '👁️' : '🔒'}
                    </button>
                  </div>
                  <p className="warning-text">
                    Warning: Keep this key secure and never share it publicly.
                  </p>
                </div>
              </div>
            )}
            
            {/* Backup Settings */}
            {activeTab === 'backup' && (
              <div className="settings-section">
                <h3>Backup & Security Settings</h3>
                
                <div className="form-group">
                  <label htmlFor="backupFrequency">Backup Frequency</label>
                  <select
                    id="backupFrequency"
                    name="backupFrequency"
                    value={formData.backupFrequency}
                    onChange={handleInputChange}
                  >
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
              </div>
            )}
            
            <div className="form-actions">
              <button type="button" className="form-button">
                Cancel
              </button>
              <button type="submit" className="form-submit">
                Save Settings
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings; 