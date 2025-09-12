import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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

function BookEvent() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // TODO(stagewise): Replace with real data from backend
  const mockEvent: Event = {
    id: eventId || '1',
    date: '2024-01-17',
    time: '19:00',
    venue: 'Nhà hàng The Deck',
    address: '38 Nguyễn Ư Dĩ, Q2, TP.HCM',
    price: 350000,
    availableSeats: 12,
    totalSeats: 35,
    city: 'Hồ Chí Minh'
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const days = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${dayName}, ${day}/${month}/${year}`;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const handleBooking = async () => {
    setIsLoading(true);
    
    // TODO(stagewise): Add actual booking logic here
    console.log('Booking event:', eventId);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to success page or back to dashboard
      navigate('/dashboard');
      // Show success message (you might want to add a toast notification)
      alert('Đặt chỗ thành công! Chúng tôi sẽ gửi email xác nhận cho bạn.');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-gray-800">Đặt chỗ</h1>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Event Details */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Chi tiết sự kiện</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800 text-lg">{mockEvent.venue}</h3>
              <p className="text-gray-600">{mockEvent.address}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 py-4 border-t border-gray-100">
              <div>
                <p className="text-sm text-gray-500 mb-1">Ngày</p>
                <p className="font-semibold">{formatDate(mockEvent.date)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Giờ</p>
                <p className="font-semibold">{mockEvent.time}</p>
              </div>
            </div>

            <div className="flex justify-between items-center py-4 border-t border-gray-100">
              <div>
                <p className="text-sm text-gray-500 mb-1">Giá vé</p>
                <p className="text-2xl font-bold text-pink-600">{formatPrice(mockEvent.price)}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 mb-1">Chỗ còn lại</p>
                <p className="font-semibold text-green-600">{mockEvent.availableSeats} chỗ</p>
              </div>
            </div>
          </div>
        </div>

        {/* What's Included */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Bao gồm</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-700">Bữa tối 3 món</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-700">Nước uống có cồn/không cồn</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-700">Ghép bàn với 4-6 người mới</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-700">Chat nhóm sau sự kiện</span>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-yellow-50 rounded-2xl border border-yellow-200 p-6">
          <h3 className="font-semibold text-yellow-800 mb-3">📋 Lưu ý quan trọng</h3>
          <div className="space-y-2 text-sm text-yellow-700">
            <p>• Vui lòng có mặt đúng giờ (19:00)</p>
            <p>• Dress code: Smart casual</p>
            <p>• Có thể hủy miễn phí trước 24h</p>
            <p>• Chat nhóm mở sau 2h kết thúc sự kiện</p>
          </div>
        </div>

        {/* Booking Button */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6">
          <button
            onClick={handleBooking}
            disabled={isLoading}
            className="w-full py-4 bg-pink-500 text-white rounded-xl font-semibold text-lg hover:bg-pink-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Đang xử lý...
              </div>
            ) : (
              `Mua ticket • ${formatPrice(mockEvent.price)}`
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookEvent;