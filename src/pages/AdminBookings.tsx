import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Booking {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  eventId: string;
  eventName: string;
  eventDate: string;
  eventTime: string;
  price: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'attended';
  bookedAt: string;
  tableNumber?: number;
}

function AdminBookings() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // TODO(stagewise): Replace with real data from backend
  const mockBookings: Booking[] = [
    {
      id: 'BK001',
      userId: 'U001',
      userName: 'Nguyễn Văn A',
      userEmail: 'nguyenvana@email.com',
      userPhone: '0901234567',
      eventId: '1',
      eventName: 'Nhà hàng The Deck - 17/01',
      eventDate: '2024-01-17',
      eventTime: '19:00',
      price: 350000,
      status: 'confirmed',
      bookedAt: '2024-01-10T14:30:00Z',
      tableNumber: 3
    },
    {
      id: 'BK002',
      userId: 'U002',
      userName: 'Trần Thị B',
      userEmail: 'tranthib@email.com',
      userPhone: '0912345678',
      eventId: '1',
      eventName: 'Nhà hàng The Deck - 17/01',
      eventDate: '2024-01-17',
      eventTime: '19:00',
      price: 350000,
      status: 'confirmed',
      bookedAt: '2024-01-11T09:15:00Z',
      tableNumber: 3
    },
    {
      id: 'BK003',
      userId: 'U003',
      userName: 'Lê Minh C',
      userEmail: 'leminhc@email.com',
      userPhone: '0923456789',
      eventId: '2',
      eventName: 'Rooftop Garden - 24/01',
      eventDate: '2024-01-24',
      eventTime: '19:00',
      price: 420000,
      status: 'pending',
      bookedAt: '2024-01-12T16:45:00Z'
    },
    {
      id: 'BK004',
      userId: 'U004',
      userName: 'Phạm Thị D',
      userEmail: 'phamthid@email.com',
      userPhone: '0934567890',
      eventId: '1',
      eventName: 'Nhà hàng The Deck - 17/01',
      eventDate: '2024-01-17',
      eventTime: '19:00',
      price: 350000,
      status: 'cancelled',
      bookedAt: '2024-01-09T11:20:00Z'
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'attended': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Đã xác nhận';
      case 'pending': return 'Chờ xử lý';
      case 'cancelled': return 'Đã hủy';
      case 'attended': return 'Đã tham gia';
      default: return 'Không xác định';
    }
  };

  const filteredBookings = mockBookings.filter(booking => {
    const matchesTab = selectedTab === 'all' || booking.status === selectedTab;
    const matchesSearch = searchTerm === '' || 
      booking.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const totalRevenue = mockBookings
    .filter(b => b.status === 'confirmed' || b.status === 'attended')
    .reduce((sum, b) => sum + b.price, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/admin')}
              className="p-2 rounded-full hover:bg-gray-100 transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Quản lý Bookings</h1>
              <p className="text-gray-600">Danh sách người mua ticket và quản lý đặt chỗ</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="max-w-md">
          <input
            type="text"
            placeholder="Tìm theo tên, email, hoặc mã booking..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>
      </div>

      <div className="p-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-gray-800">{mockBookings.length}</div>
            <div className="text-sm text-gray-600">Tổng bookings</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-green-600">{mockBookings.filter(b => b.status === 'confirmed').length}</div>
            <div className="text-sm text-gray-600">Đã xác nhận</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-yellow-600">{mockBookings.filter(b => b.status === 'pending').length}</div>
            <div className="text-sm text-gray-600">Chờ xử lý</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="text-lg font-bold text-pink-600">{formatPrice(totalRevenue)}</div>
            <div className="text-sm text-gray-600">Tổng doanh thu</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {[
            { id: 'all', label: 'Tất cả', count: mockBookings.length },
            { id: 'confirmed', label: 'Đã xác nhận', count: mockBookings.filter(b => b.status === 'confirmed').length },
            { id: 'pending', label: 'Chờ xử lý', count: mockBookings.filter(b => b.status === 'pending').length },
            { id: 'cancelled', label: 'Đã hủy', count: mockBookings.filter(b => b.status === 'cancelled').length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition ${
                selectedTab === tab.id
                  ? 'bg-pink-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Bookings List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Booking ID</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Khách hàng</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Sự kiện</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Bàn</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Giá</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Trạng thái</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Đặt lúc</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-mono text-sm">{booking.id}</td>
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium text-gray-800">{booking.userName}</div>
                        <div className="text-sm text-gray-600">{booking.userEmail}</div>
                        <div className="text-sm text-gray-600">{booking.userPhone}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm text-gray-800">{booking.eventName}</div>
                      <div className="text-xs text-gray-600">{booking.eventDate} • {booking.eventTime}</div>
                    </td>
                    <td className="py-3 px-4">
                      {booking.tableNumber ? (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                          Bàn {booking.tableNumber}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-sm">Chưa xếp</span>
                      )}
                    </td>
                    <td className="py-3 px-4 font-semibold text-gray-800">{formatPrice(booking.price)}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                        {getStatusText(booking.status)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{formatDateTime(booking.bookedAt)}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-1">
                        <button className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition">
                          Xem
                        </button>
                        {booking.status === 'pending' && (
                          <button className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition">
                            Xác nhận
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredBookings.length === 0 && (
            <div className="p-12 text-center">
              <div className="text-gray-400 mb-4">🎫</div>
              <p className="text-gray-600">Không có booking nào</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminBookings;