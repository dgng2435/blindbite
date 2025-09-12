import { useNavigate } from 'react-router-dom';

interface AdminStats {
  totalEvents: number;
  totalBookings: number;
  totalRevenue: number;
  upcomingEvents: number;
}

function AdminDashboard() {
  const navigate = useNavigate();
  
  // TODO(stagewise): Replace with real data from backend
  const mockStats: AdminStats = {
    totalEvents: 12,
    totalBookings: 145,
    totalRevenue: 50750000,
    upcomingEvents: 3
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const adminFeatures = [
    {
      id: 'events',
      title: 'Quản lý Sự kiện',
      description: 'Tạo, chỉnh sửa và xóa sự kiện',
      icon: '📅',
      color: 'bg-blue-500',
      route: '/admin/events'
    },
    {
      id: 'bookings',
      title: 'Quản lý Booking',
      description: 'Xem danh sách người mua ticket',
      icon: '🎫',
      color: 'bg-green-500',
      route: '/admin/bookings'
    },
    {
      id: 'tables',
      title: 'Xếp Bàn',
      description: 'Tự động và thủ công xếp bàn',
      icon: '🪑',
      color: 'bg-purple-500',
      route: '/admin/tables'
    },
    {
      id: 'users',
      title: 'Quản lý Users',
      description: 'Danh sách người dùng và thống kê',
      icon: '👥',
      color: 'bg-orange-500',
      route: '/admin/users'
    },
    {
      id: 'analytics',
      title: 'Thống kê',
      description: 'Báo cáo doanh thu và hiệu suất',
      icon: '📊',
      color: 'bg-pink-500',
      route: '/admin/analytics'
    },
    {
      id: 'settings',
      title: 'Cài đặt',
      description: 'Cấu hình hệ thống',
      icon: '⚙️',
      color: 'bg-gray-500',
      route: '/admin/settings'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-gray-600">BlindBite Management System</p>
          </div>

        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">📅</span>
              <span className="text-sm text-gray-500">Tổng</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">{mockStats.totalEvents}</div>
            <div className="text-sm text-gray-600">Sự kiện</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">🎫</span>
              <span className="text-sm text-gray-500">Tổng</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">{mockStats.totalBookings}</div>
            <div className="text-sm text-gray-600">Bookings</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">💰</span>
              <span className="text-sm text-gray-500">Tổng</span>
            </div>
            <div className="text-lg font-bold text-gray-800">{formatPrice(mockStats.totalRevenue)}</div>
            <div className="text-sm text-gray-600">Doanh thu</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">⏰</span>
              <span className="text-sm text-gray-500">Sắp tới</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">{mockStats.upcomingEvents}</div>
            <div className="text-sm text-gray-600">Events</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Quản lý nhanh</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {adminFeatures.map((feature) => (
              <button
                key={feature.id}
                onClick={() => navigate(feature.route)}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition text-left group"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Hoạt động gần đây</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Nguyễn Văn A đã mua ticket cho event "Thứ Tư 17/01"</span>
              <span className="text-xs text-gray-500 ml-auto">2 phút trước</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Event mới "Thứ Tư 24/01" đã được tạo</span>
              <span className="text-xs text-gray-500 ml-auto">15 phút trước</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Xếp bàn tự động hoàn tất cho event "Thứ Tư 17/01"</span>
              <span className="text-xs text-gray-500 ml-auto">1 giờ trước</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;