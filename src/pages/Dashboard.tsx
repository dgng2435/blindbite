import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Event {
  id: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  price: number;
  availableSeats: number;
  totalSeats: number;
  city: string;
}

const cityList = ['Hồ Chí Minh', 'Hà Nội'];

function Dashboard() {
  const [userCity, setUserCity] = useState('Hồ Chí Minh');
  const [loading, setLoading] = useState(true);
  const [unreadCount] = useState(2); // giả lập
  const [activeTab, setActiveTab] = useState<'all' | 'my'>('all');
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const savedUserData = localStorage.getItem('onboardingData');
      if (savedUserData) {
        const userData = JSON.parse(savedUserData);
        if (userData.city) {
          setUserCity(userData.city);
        }
      }
      setLoading(false);
    }, 500);
  }, []);

  // TODO(stagewise): Replace with real data from backend
  const mockEvents: Event[] = [
    {
      id: '1',
      date: '2024-01-17',
      time: '19:00',
      venue: 'Nhà hàng The Deck',
      address: '38 Nguyễn Ư Dĩ, Q2',
      price: 350000,
      availableSeats: 12,
      totalSeats: 35,
      city: 'Hồ Chí Minh'
    },
    {
      id: '2',
      date: '2024-01-24',
      time: '19:00',
      venue: 'Rooftop Garden',
      address: '123 Lê Lợi, Q1',
      price: 420000,
      availableSeats: 0,
      totalSeats: 28,
      city: 'Hồ Chí Minh'
    },
    {
      id: '3',
      date: '2024-01-17',
      time: '19:00',
      venue: 'Madame Hiên',
      address: '15 Chân Cầm, Hoàn Kiếm',
      price: 380000,
      availableSeats: 15,
      totalSeats: 42,
      city: 'Hà Nội'
    }
  ];

  // Giả lập: user đã đăng ký event id 1
  const myEventIds = ['1'];
  const filteredEvents = mockEvents.filter(event => event.city === userCity);
  const myEvents = mockEvents.filter(e => myEventIds.includes(e.id) && e.city === userCity);
  const showEvents = activeTab === 'all' ? filteredEvents : myEvents;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = date.getMonth() + 1;
    return `${dayName}, ${day}/${month}`;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const handleBookEvent = (eventId: string) => {
    navigate(`/book/${eventId}`);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserCity(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-pink-600">BlindBite</h1>
          <button 
            onClick={() => navigate('/profile')}
            className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center hover:bg-pink-600 transition"
          >
            <span className="text-white font-semibold">👤</span>
          </button>
        </div>

        {/* User's City Display + Chọn thành phố */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Thành phố của bạn:</span>
          <select
            value={userCity}
            onChange={handleCityChange}
            className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-medium focus:outline-none"
          >
            {cityList.map(city => (
              <option key={city} value={city}>📍 {city}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl p-6 text-white mb-6">
          <h2 className="text-xl font-bold mb-2">Bữa tối Thứ Tư 🍽️</h2>
          <p className="text-pink-100">
            Khám phá những người bạn mới qua bữa ăn thú vị
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          <button
            className={`px-4 py-2 rounded-full font-semibold ${activeTab === 'all' ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setActiveTab('all')}
          >
            Sự kiện sẽ diễn ra
          </button>
          <button
            className={`px-4 py-2 rounded-full font-semibold ${activeTab === 'my' ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setActiveTab('my')}
          >
            Sự kiện của tôi
          </button>
        </div>

        {/* Events List */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {activeTab === 'all'
              ? `Sự kiện tại ${userCity}`
              : `Sự kiện bạn đã đăng ký tại ${userCity}`}
          </h3>
          
          {loading ? (
            <div className="text-center text-gray-400 py-12">Đang tải dữ liệu...</div>
          ) : showEvents.length > 0 ? (
            showEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg mb-1">
                      {event.venue}
                    </h4>
                    <p className="text-gray-600 text-sm mb-2">{event.address}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        📅 {formatDate(event.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        ⏰ {event.time}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-pink-600 mb-1">
                      {formatPrice(event.price)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {event.availableSeats}/{event.totalSeats} chỗ
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${event.availableSeats > 0 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <span className={`text-sm font-medium ${event.availableSeats > 0 ? 'text-green-600' : 'text-gray-400'}`}>
                      {event.availableSeats > 0 ? `Còn ${event.availableSeats} chỗ` : 'Hết chỗ'}
                    </span>
                  </div>
                  
                  {activeTab === 'all' ? (
                    <button
                      onClick={() => handleBookEvent(event.id)}
                      className={`px-6 py-2 rounded-xl font-semibold transition ${
                        event.availableSeats > 0
                          ? 'bg-pink-500 text-white hover:bg-pink-600'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                      disabled={event.availableSeats === 0}
                    >
                      Mua ticket
                    </button>
                  ) : (
                    <span className="px-4 py-2 rounded-xl bg-green-100 text-green-700 font-semibold">
                      Đã đăng ký
                    </span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
              <div className="text-gray-400 mb-2">🍽️</div>
              <p className="text-gray-600">
                {activeTab === 'all'
                  ? `Chưa có sự kiện nào tại ${userCity}`
                  : `Bạn chưa đăng ký sự kiện nào tại ${userCity}`}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4">
        <div className="flex justify-around">
          <button
            className="flex flex-col items-center gap-1"
            onClick={() => window.location.reload()}
          >
            <div className="w-6 h-6 text-pink-500">🏠</div>
            <span className="text-xs font-medium text-pink-500">Trang Chính</span>
          </button>
          
          <button 
            onClick={() => navigate('/chat')}
            className="flex flex-col items-center gap-1 relative"
          >
            <div className="w-6 h-6 text-gray-400">💬</div>
            <span className="text-xs text-gray-400">Trò Chuyện</span>
            {unreadCount > 0 && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-xs flex items-center justify-center font-medium">
                {unreadCount}
              </div>
            )}
          </button>
          
          <button
            className={`flex flex-col items-center gap-1 ${activeTab === 'my' ? 'text-pink-500' : 'text-gray-400'}`}
            onClick={() => setActiveTab('my')}
          >
            <div className="w-6 h-6">📅</div>
            <span className="text-xs font-medium">Event</span>
          </button>
          
          <button 
            onClick={() => navigate('/profile')}
            className="flex flex-col items-center gap-1"
          >
            <div className="w-6 h-6 text-gray-400">👤</div>
            <span className="text-xs text-gray-400">Hồ Sơ</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;