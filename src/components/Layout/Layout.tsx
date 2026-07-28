import { useState } from 'react';
import './Layout.css';

// Link ảnh placeholder mặc định cho tất cả các icon
const ICON_PLACEHOLDER = "https://via.placeholder.com/20";
const AVATAR_PLACEHOLDER = "https://via.placeholder.com/32";

// Danh sách các item menu ở Sidebar bên trái
const SIDEBAR_ITEMS = [
  { id: 'user', label: 'Người dùng' },
  { id: 'task', label: 'Công việc' },
];

// Component Header trên cùng
const Header = () => {
  return (
    <header className="crm-header">
      <div className="header-left">
        <img src={ICON_PLACEHOLDER} alt="Logo" className="icon logo-icon" />
        <span className="logo-text">CRM</span>
      </div>

      <div className="header-search">
        <img src='./assets/ic_Search.png' alt="Search" className="icon search-icon" />
        <input 
          type="text" 
          placeholder="Tìm kiếm tiềm năng, liên hệ, khách hàng" 
        />
      </div>

      <div className="header-right">
        <button className="icon-btn"><img src={ICON_PLACEHOLDER} alt="3d" className="icon" /></button>
        <button className="icon-btn"><img src={ICON_PLACEHOLDER} alt="settings" className="icon" /></button>
        <button className="icon-btn"><img src={ICON_PLACEHOLDER} alt="clock" className="icon" /></button>
        <button className="icon-btn"><img src={ICON_PLACEHOLDER} alt="user" className="icon" /></button>
        <button className="icon-btn"><img src={ICON_PLACEHOLDER} alt="add" className="icon" /></button>
        
        <button className="icon-btn notification-btn">
          <img src={ICON_PLACEHOLDER} alt="bell" className="icon" />
          <span className="badge">75</span>
        </button>
        
        <button className="icon-btn"><img src={ICON_PLACEHOLDER} alt="help" className="icon" /></button>
        <button className="icon-btn"><img src={ICON_PLACEHOLDER} alt="chat" className="icon" /></button>

        <div className="user-avatar">
          <img src={AVATAR_PLACEHOLDER} alt="Avatar" className="avatar-img" />
          <span className="user-initials">ND</span>
        </div>
      </div>
    </header>
  );
};

// Component Sidebar bên trái
interface SidebarProps {
  activeTab: string;
  setActiveTab: (tabId: string) => void;
}
const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  return (
    <aside className="crm-sidebar">
      <nav className="sidebar-nav">
        {SIDEBAR_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`sidebar-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            <img src={ICON_PLACEHOLDER} alt={item.label} className="icon sidebar-icon" />
            <span className="sidebar-label">{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="sidebar-footer">
        <button className="icon-btn collapse-btn">
          <img src={ICON_PLACEHOLDER} alt="collapse" className="icon" />
        </button>
      </div>
    </aside>
  );
};

// Component Action Bar (Thanh menu thao tác ngay trên bảng)
const ActionBar = () => {
  return (
    <div className="action-bar">
      <div className="action-group-left">
        <span className="selected-count">Đã chọn 1</span>
        <button className="link-btn">Bỏ chọn</button>
        
        <button className="action-btn">
          <img src={ICON_PLACEHOLDER} alt="action" className="icon" />
          Sinh đơn hàng salein
          <img src={ICON_PLACEHOLDER} alt="dropdown" className="icon arrow-icon" />
        </button>

        <button className="action-btn">
          <img src={ICON_PLACEHOLDER} alt="tag" className="icon" />
          Gắn thẻ
          <img src={ICON_PLACEHOLDER} alt="dropdown" className="icon arrow-icon" />
        </button>

        <button className="action-btn">
          <img src={ICON_PLACEHOLDER} alt="edit" className="icon" />
          Cập nhật thông tin
        </button>

        <button className="action-btn">
          <img src={ICON_PLACEHOLDER} alt="campaign" className="icon" />
          Chọn vào chiến dịch
        </button>

        <button className="action-btn">
          <img src={ICON_PLACEHOLDER} alt="assign" className="icon" />
          Bàn giao công việc
        </button>

        <button className="action-btn icon-only">
          <img src={ICON_PLACEHOLDER} alt="more" className="icon" />
        </button>
      </div>
    </div>
  );
};

// Main Component
export default function Layout() {
  const [activeTab, setActiveTab] = useState('customers');

  return (
    <div className="crm-container">
      <Header />
      <div className="crm-body">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="crm-content">
          {/* Thanh menu chức năng phía trên bảng */}
          <ActionBar />
          
          {/* Khoảng trống dành cho Nội dung chính / Bảng dữ liệu sau này */}
          <div className="content-placeholder">
            {/* Nội dung để trống theo yêu cầu */}
          </div>
        </main>
      </div>
    </div>
  );
}