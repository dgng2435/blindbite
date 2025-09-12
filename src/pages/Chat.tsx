import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ChatGroup {
  id: string;
  eventName: string;
  eventDate: string;
  tableNumber: number;
  memberCount: number;
  lastMessage: {
    text: string;
    sender: string;
    timestamp: string;
  };
  unreadCount: number;
  isActive: boolean;
}

function Chat() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('active');

  // TODO(stagewise): Replace with real data from backend
  const mockChatGroups: ChatGroup[] = [
    {
      id: 'chat1',
      eventName: 'Nhà hàng The Deck - 17/01',
      eventDate: '2024-01-17',
      tableNumber: 3,
      memberCount: 6,
      lastMessage: {
        text: 'Cảm ơn mọi người! Tối nay rất vui 😊',
        sender: 'Minh',
        timestamp: '2024-01-17T21:30:00Z'
      },
      unreadCount: 2,
      isActive: true
    },
    {
      id: 'chat2',
      eventName: 'Rooftop Garden - 10/01',
      eventDate: '2024-01-10',
      tableNumber: 5,
      memberCount: 5,
      lastMessage: {
        text: 'Hẹn gặp lại mọi người lần sau nhé!',
        sender: 'Thu',
        timestamp: '2024-01-10T22:15:00Z'
      },
      unreadCount: 0,
      isActive: false
    },
    {
      id: 'chat3',
      eventName: 'Secret Garden - 03/01',
      eventDate: '2024-01-03',
      tableNumber: 2,
      memberCount: 6,
      lastMessage: {
        text: 'Món ăn tuyệt vời! 5 sao ⭐',
        sender: 'Anh',
        timestamp: '2024-01-03T20:45:00Z'
      },
      unreadCount: 0,
      isActive: false
    }
  ];

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'Vừa xong';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} giờ trước`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} ngày trước`;
    }
  };

  const filteredChats = selectedTab === 'active' 
    ? mockChatGroups.filter(chat => chat.isActive)
    : mockChatGroups.filter(chat => !chat.isActive);

  const totalUnread = mockChatGroups.reduce((sum, chat) => sum + chat.unreadCount, 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <button
              onClick={() => navigate('/dashboard')}
              className="text-2xl font-bold text-pink-600 hover:text-pink-700 transition"
            >
              BlindBite
            </button>
            <p className="text-gray-600 text-sm mt-1">Trò chuyện nhóm</p>
          </div>
          {totalUnread > 0 && (
            <div className="px-3 py-1 bg-red-500 text-white rounded-full text-sm font-medium">
              {totalUnread} tin mới
            </div>
          )}
        </div>
      </div>

      <div className="p-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setSelectedTab('active')}
            className={`px-4 py-2 rounded-lg transition ${
              selectedTab === 'active'
                ? 'bg-pink-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Đang hoạt động ({mockChatGroups.filter(c => c.isActive).length})
          </button>
          <button
            onClick={() => setSelectedTab('ended')}
            className={`px-4 py-2 rounded-lg transition ${
              selectedTab === 'ended'
                ? 'bg-pink-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Đã kết thúc ({mockChatGroups.filter(c => !c.isActive).length})
          </button>
        </div>

        {/* Chat List */}
        <div className="space-y-4">
          {filteredChats.length > 0 ? (
            filteredChats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => navigate(`/chat/${chat.id}`)}
                className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition text-left"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-800">{chat.eventName}</h3>
                      {chat.isActive && (
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <span>🪑 Bàn {chat.tableNumber}</span>
                      <span>👥 {chat.memberCount} người</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500 mb-1">
                      {formatTime(chat.lastMessage.timestamp)}
                    </div>
                    {chat.unreadCount > 0 && (
                      <div className="w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center font-medium">
                        {chat.unreadCount}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">
                    {chat.lastMessage.sender}:
                  </span>
                  <span className="text-sm text-gray-600 truncate flex-1">
                    {chat.lastMessage.text}
                  </span>
                </div>

                {!chat.isActive && (
                  <div className="mt-2 text-xs text-gray-400 italic">
                    Chat đã đóng sau 72 giờ
                  </div>
                )}
              </button>
            ))
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
              <div className="text-gray-400 mb-4">💬</div>
              <p className="text-gray-600 mb-2">
                {selectedTab === 'active' ? 'Chưa có chat nào đang hoạt động' : 'Chưa có chat nào đã kết thúc'}
              </p>
              <p className="text-sm text-gray-500">
                {selectedTab === 'active' 
                  ? 'Chat sẽ mở sau khi bạn tham gia sự kiện'
                  : 'Chat sẽ xuất hiện ở đây sau khi kết thúc'
                }
              </p>
            </div>
          )}
        </div>

        {/* Info Card */}
        <div className="bg-blue-50 rounded-2xl border border-blue-200 p-4 mt-6">
          <h4 className="font-semibold text-blue-800 mb-2">📋 Về Chat Nhóm</h4>
          <div className="space-y-1 text-sm text-blue-700">
            <p>• Chat mở sau 2 giờ kết thúc sự kiện</p>
            <p>• Hoạt động trong 72 giờ (3 ngày)</p>
            <p>• Chỉ thành viên cùng bàn mới thấy</p>
            <p>• Có thể chia sẻ liên lạc và kết bạn</p>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4">
        <div className="flex justify-around">
          <button 
            onClick={() => navigate('/dashboard')}
            className="flex flex-col items-center gap-1"
          >
            <div className="w-6 h-6 text-gray-400">🏠</div>
            <span className="text-xs text-gray-400">Trang Chính</span>
          </button>
          
          <button className="flex flex-col items-center gap-1 relative">
            <div className="w-6 h-6 text-pink-500">💬</div>
            <span className="text-xs font-medium text-pink-500">Trò Chuyện</span>
            {totalUnread > 0 && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-xs flex items-center justify-center font-medium">
                {totalUnread}
              </div>
            )}
          </button>
          
          <button className="flex flex-col items-center gap-1">
            <div className="w-6 h-6 text-gray-400">📅</div>
            <span className="text-xs text-gray-400">Events</span>
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

export default Chat;