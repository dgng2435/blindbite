import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  joinDate: string;
  status: 'active' | 'inactive' | 'banned';
  totalBookings: number;
  totalSpent: number;
  lastActivity: string;
  avatar?: string;
}

function AdminUsers() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'banned'>('all');

  // TODO(stagewise): Replace with real data from backend
  const mockUsers: User[] = [
    {
      id: '1',
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@email.com',
      phone: '0901234567',
      joinDate: '2024-01-15',
      status: 'active',
      totalBookings: 5,
      totalSpent: 2500000,
      lastActivity: '2024-01-20T14:30:00'
    },
    {
      id: '2',
      name: 'Trần Thị B',
      email: 'tranthib@email.com',
      phone: '0987654321',
      joinDate: '2024-01-10',
      status: 'active',
      totalBookings: 3,
      totalSpent: 1800000,
      lastActivity: '2024-01-19T10:15:00'
    },
    {
      id: '3',
      name: 'Lê Minh C',
      email: 'leminhc@email.com',
      joinDate: '2024-01-05',
      status: 'inactive',
      totalBookings: 1,
      totalSpent: 500000,
      lastActivity: '2024-01-10T16:45:00'
    },
    {
      id: '4',
      name: 'Phạm Thu D',
      email: 'phamthud@email.com',
      phone: '0912345678',
      joinDate: '2024-01-12',
      status: 'active',
      totalBookings: 7,
      totalSpent: 3200000,
      lastActivity: '2024-01-20T09:20:00'
    },
    {
      id: '5',
      name: 'Hoàng Văn E',
      email: 'hoangvane@email.com',
      joinDate: '2024-01-08',
      status: 'banned',
      totalBookings: 2,
      totalSpent: 800000,
      lastActivity: '2024-01-15T20:10:00'
    }
  ];

  const userStats = {
    totalUsers: mockUsers.length,
    activeUsers: mockUsers.filter(u => u.status === 'active').length,
    newUsersThisMonth: mockUsers.filter(u => new Date(u.joinDate) >= new Date('2024-01-01')).length,
    totalRevenue: mockUsers.reduce((sum, u) => sum + u.totalSpent, 0)
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-yellow-100 text-yellow-800';
      case 'banned': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Hoạt động';
      case 'inactive': return 'Không hoạt động';
      case 'banned': return 'Bị cấm';
      default: return status;
    }
  };

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <button
              onClick={() => navigate('/admin')}
              className="text-gray-500 hover:text-gray-700 mb-2 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Quay lại Dashboard
            </button>
            <h1 className="text-2xl font-bold text-gray-800">Quản lý Users</h1>
            <p className="text-gray-600">Danh sách người dùng và thống kê</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">👥</span>
              <span className="text-sm text-gray-500">Tổng</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">{userStats.totalUsers}</div>
            <div className="text-sm text-gray-600">Users</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">✅</span>
              <span className="text-sm text-gray-500">Hoạt động</span>
            </div>
            <div className="text-2xl font-bold text-green-600">{userStats.activeUsers}</div>
            <div className="text-sm text-gray-600">Active Users</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">🆕</span>
              <span className="text-sm text-gray-500">Tháng này</span>
            </div>
            <div className="text-2xl font-bold text-blue-600">{userStats.newUsersThisMonth}</div>
            <div className="text-sm text-gray-600">New Users</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">💰</span>
              <span className="text-sm text-gray-500">Tổng</span>
            </div>
            <div className="text-lg font-bold text-purple-600">{formatPrice(userStats.totalRevenue)}</div>
            <div className="text-sm text-gray-600">Doanh thu</div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Tìm kiếm theo tên hoặc email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="active">Hoạt động</option>
              <option value="inactive">Không hoạt động</option>
              <option value="banned">Bị cấm</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">
              Danh sách Users ({filteredUsers.length})
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Người dùng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Liên hệ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thống kê
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hoạt động cuối
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {user.name.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">Tham gia: {formatDate(user.joinDate)}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email}</div>
                      {user.phone && (
                        <div className="text-sm text-gray-500">{user.phone}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                        {getStatusText(user.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div>{user.totalBookings} bookings</div>
                      <div className="text-gray-500">{formatPrice(user.totalSpent)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDateTime(user.lastActivity)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          Xem
                        </button>
                        <button className="text-gray-600 hover:text-gray-800">
                          Chỉnh sửa
                        </button>
                        {user.status !== 'banned' && (
                          <button className="text-red-600 hover:text-red-800">
                            Cấm
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminUsers;