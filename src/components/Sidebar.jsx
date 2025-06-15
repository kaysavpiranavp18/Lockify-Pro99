const Sidebar = ({ onLogout, onChangePassword }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Lockify Pro</h2>
      </div>
      <nav className="sidebar-nav">
        <button 
          className="sidebar-button"
          onClick={onChangePassword}
        >
          Change Master Password
        </button>
      </nav>
      <div className="sidebar-footer">
        <button 
          className="sidebar-button logout-button"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;