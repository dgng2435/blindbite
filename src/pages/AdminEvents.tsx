import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Event {
  id: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  price: number;
  totalSeats: number;
  bookedSeats: number;
  city: string;
  status: 'draft' | 'published' | 'full' | 'completed';
}

function AdminEvents() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [formData, setFormData] = useState({
    venue: '',
    address: '',
    city: 'Hồ Chí Minh',
    date: '',
    time: '19:00',
    price: '',
    totalSeats: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load events from localStorage or use mock data
  useEffect(() => {
    const savedEvents = localStorage.getItem('adminEvents');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    } else {
      // TODO(stagewise): Replace with real data from backend
      const mockEvents: Event[] = [
        {
          id: '1',
          date: '2024-01-17',
          time: '19:00',
          venue: 'Nhà hàng The Deck',
          address: '38 Nguyễn Ư Dĩ, Q2',
          price: 350000,
          totalSeats: 35,
          bookedSeats: 23,
          city: 'Hồ Chí Minh',
          status: 'published'
        },
        {
          id: '2',
          date: '2024-01-24',
          time: '19:00',
          venue: 'Rooftop Garden',
          address: '123 Lê Lợi, Q1',
          price: 420000,
          totalSeats: 28,
          bookedSeats: 20,
          city: 'Hồ Chí Minh',
          status: 'published'
        },
        {
          id: '3',
          date: '2024-01-31',
          time: '19:00',
          venue: 'Secret Garden',
          address: '45 Pasteur, Q1',
          price: 380000,
          totalSeats: 42,
          bookedSeats: 0,
          city: 'Hồ Chí Minh',
          status: 'draft'
        }
      ];
      setEvents(mockEvents);
      localStorage.setItem('adminEvents', JSON.stringify(mockEvents));
    }
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      weekday: 'short',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'published': return 'bg-green-100 text-green-800';
      case 'full': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'draft': return 'Nháp';
      case 'published': return 'Đã xuất bản';
      case 'full': return 'Đã đầy';
      case 'completed': return 'Hoàn thành';
      default: return 'Không xác định';
    }
  };

  const filteredEvents = selectedTab === 'all' 
    ? events 
    : events.filter(event => event.status === selectedTab);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const newEvent: Event = {
        id: Date.now().toString(),
        venue: formData.venue,
        address: formData.address,
        city: formData.city,
        date: formData.date,
        time: formData.time,
        price: parseInt(formData.price),
        totalSeats: parseInt(formData.totalSeats),
        bookedSeats: 0,
        status: 'draft'
      };

      const updatedEvents = [...events, newEvent];
      setEvents(updatedEvents);
      localStorage.setItem('adminEvents', JSON.stringify(updatedEvents));
      
      // Also update dashboard events
      const dashboardEvents = localStorage.getItem('dashboardEvents');
      const dashboardEventsList = dashboardEvents ? JSON.parse(dashboardEvents) : [];
      const dashboardEvent = {
        id: newEvent.id,
        venue: newEvent.venue,
        address: newEvent.address,
        city: newEvent.city,
        date: newEvent.date,
        time: newEvent.time,
        price: newEvent.price,
        availableSeats: newEvent.totalSeats,
        totalSeats: newEvent.totalSeats
      };
      dashboardEventsList.push(dashboardEvent);
      localStorage.setItem('dashboardEvents', JSON.stringify(dashboardEventsList));

      // Reset form
      setFormData({
        venue: '',
        address: '',
        city: 'Hồ Chí Minh',
        date: '',
        time: '19:00',
        price: '',
        totalSeats: '',
        description: ''
      });
      setShowCreateModal(false);
    } catch (error) {
      console.error('Error creating event:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-6">
        <div className="flex items-center justify-between">
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
              <h1 className="text-2xl font-bold text-gray-800">Quản lý Sự kiện</h1>
              <p className="text-gray-600">Tạo và quản lý các sự kiện BlindBite</p>
            </div>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
          >
            + Tạo Event
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {[
            { id: 'all', label: 'Tất cả', count: events.length },
            { id: 'published', label: 'Đã xuất bản', count: events.filter(e => e.status === 'published').length },
            { id: 'draft', label: 'Nháp', count: events.filter(e => e.status === 'draft').length },
            { id: 'completed', label: 'Hoàn thành', count: events.filter(e => e.status === 'completed').length }
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

        {/* Events List */}
        <div className="space-y-4">
          {filteredEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">{event.venue}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                      {getStatusText(event.status)}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{event.address}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>📅 {formatDate(event.date)}</span>
                    <span>⏰ {event.time}</span>
                    <span>📍 {event.city}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-pink-600 mb-1">
                    {formatPrice(event.price)}
                  </div>
                  <div className="text-sm text-gray-500">
                    {event.bookedSeats}/{event.totalSeats} chỗ
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-full bg-gray-200 rounded-full h-2 w-32">
                    <div 
                      className="bg-pink-500 h-2 rounded-full transition-all"
                      style={{ width: `${(event.bookedSeats / event.totalSeats) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600">
                    {Math.round((event.bookedSeats / event.totalSeats) * 100)}%
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                    Xem chi tiết
                  </button>
                  <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition">
                    Xếp bàn
                  </button>
                  <button className="px-3 py-1 text-sm bg-pink-100 text-pink-700 rounded-lg hover:bg-pink-200 transition">
                    Chỉnh sửa
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="text-gray-400 mb-4">📅</div>
            <p className="text-gray-600">Không có sự kiện nào</p>
          </div>
        )}
      </div>

      {/* Create Event Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <form onSubmit={handleCreateEvent} className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Tạo Event Mới</h3>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                {/* Venue Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tên địa điểm *
                  </label>
                  <input
                    type="text"
                    name="venue"
                    value={formData.venue}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Ví dụ: Nhà hàng The Deck"
                    required
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Địa chỉ *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Ví dụ: 38 Nguyễn Ư Dĩ, Q2"
                    required
                  />
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Thành phố *
                  </label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  >
                    <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                    <option value="Hà Nội">Hà Nội</option>
                    <option value="Đà Nẵng">Đà Nẵng</option>
                    <option value="Hải Phòng">Hải Phòng</option>
                    <option value="Cần Thơ">Cần Thơ</option>
                    <option value="Nha Trang">Nha Trang</option>
                    <option value="Huế">Huế</option>
                    <option value="Vũng Tàu">Vũng Tàu</option>
                  </select>
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ngày *
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Giờ *
                    </label>
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                {/* Price and Seats */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Giá vé (VND) *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="350000"
                      min="0"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Số chỗ *
                    </label>
                    <input
                      type="number"
                      name="totalSeats"
                      value={formData.totalSeats}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="35"
                      min="1"
                      required
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mô tả (tùy chọn)
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Mô tả về sự kiện..."
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                  disabled={isSubmitting}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Đang tạo...' : 'Tạo Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminEvents;