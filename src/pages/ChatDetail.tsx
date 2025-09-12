import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  type: 'message' | 'system';
}

interface Member {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
}

interface ChatInfo {
  id: string;
  eventName: string;
  eventDate: string;
  tableNumber: number;
  isActive: boolean;
  expiresAt: string;
}

function ChatDetail() {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [chatInfo, setChatInfo] = useState<ChatInfo | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentUserId = 'user1'; // TODO(stagewise): Get from auth context

  useEffect(() => {
    // TODO(stagewise): Fetch chat data from backend
    const mockChatInfo: ChatInfo = {
      id: chatId || 'chat1',
      eventName: 'Nhà hàng The Deck - 17/01',
      eventDate: '2024-01-17',
      tableNumber: 3,
      isActive: true,
      expiresAt: '2024-01-20T21:00:00Z'
    };

    const mockMembers: Member[] = [
      { id: 'user1', name: 'Bạn', avatar: '👤', isOnline: true },
      { id: 'user2', name: 'Minh', avatar: '👨', isOnline: true },
      { id: 'user3', name: 'Thu', avatar: '👩', isOnline: false },
      { id: 'user4', name: 'Anh', avatar: '👨', isOnline: true },
      { id: 'user5', name: 'Linh', avatar: '👩', isOnline: false },
      { id: 'user6', name: 'Nam', avatar: '👨', isOnline: true }
    ];

    const mockMessages: Message[] = [
      {
        id: 'msg1',
        senderId: 'system',
        senderName: 'Hệ thống',
        text: 'Chat nhóm đã được mở! Mọi người có thể trò chuyện trong 72 giờ tới.',
        timestamp: '2024-01-17T21:00:00Z',
        type: 'system'
      },
      {
        id: 'msg2',
        senderId: 'user2',
        senderName: 'Minh',
        text: 'Chào mọi người! Tối nay rất vui được gặp các bạn 😊',
        timestamp: '2024-01-17T21:05:00Z',
        type: 'message'
      },
      {
        id: 'msg3',
        senderId: 'user3',
        senderName: 'Thu',
        text: 'Món ăn tuyệt vời quá! Cảm ơn BlindBite đã tạo cơ hội này',
        timestamp: '2024-01-17T21:10:00Z',
        type: 'message'
      },
      {
        id: 'msg4',
        senderId: 'user1',
        senderName: 'Bạn',
        text: 'Đúng rồi! Mình cũng rất thích không khí ở đây',
        timestamp: '2024-01-17T21:15:00Z',
        type: 'message'
      },
      {
        id: 'msg5',
        senderId: 'user4',
        senderName: 'Anh',
        text: 'Mọi người có muốn trao đổi liên lạc không? Mình có thể tạo group Zalo',
        timestamp: '2024-01-17T21:20:00Z',
        type: 'message'
      },
      {
        id: 'msg6',
        senderId: 'user2',
        senderName: 'Minh',
        text: 'Ý tưởng hay đấy! Mình đồng ý',
        timestamp: '2024-01-17T21:25:00Z',
        type: 'message'
      }
    ];

    setChatInfo(mockChatInfo);
    setMembers(mockMembers);
    setMessages(mockMessages);
  }, [chatId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeRemaining = () => {
    if (!chatInfo) return '';
    const now = new Date().getTime();
    const expiry = new Date(chatInfo.expiresAt).getTime();
    const remaining = expiry - now;
    
    if (remaining <= 0) return 'Đã hết hạn';
    
    const hours = Math.floor(remaining / (1000 * 60 * 60));
    return `Còn ${hours} giờ`;
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !chatInfo?.isActive) return;

    const message: Message = {
      id: `msg${Date.now()}`,
      senderId: currentUserId,
      senderName: 'Bạn',
      text: newMessage.trim(),
      timestamp: new Date().toISOString(),
      type: 'message'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // TODO(stagewise): Send message to backend
    console.log('Sending message:', message);
  };

  if (!chatInfo) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-gray-600">Đang tải...</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/chat')}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="flex-1">
            <h1 className="font-semibold text-gray-800">{chatInfo.eventName}</h1>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <span>🪑 Bàn {chatInfo.tableNumber}</span>
              <span>👥 {members.length} người</span>
              {chatInfo.isActive && (
                <span className="text-green-600">• {getTimeRemaining()}</span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1">
            {members.filter(m => m.isOnline).slice(0, 3).map((member, index) => (
              <div key={member.id} className="relative" style={{ marginLeft: index > 0 ? '-8px' : '0' }}>
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center border-2 border-white">
                  <span className="text-sm">{member.avatar}</span>
                </div>
                {member.isOnline && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>
            ))}
            {members.filter(m => m.isOnline).length > 3 && (
              <span className="text-xs text-gray-500 ml-1">+{members.filter(m => m.isOnline).length - 3}</span>
            )}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id}>
              {message.type === 'system' ? (
                <div className="text-center">
                  <div className="inline-block px-3 py-1 bg-gray-200 text-gray-600 rounded-full text-sm">
                    {message.text}
                  </div>
                </div>
              ) : (
                <div className={`flex ${message.senderId === currentUserId ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                    message.senderId === currentUserId
                      ? 'bg-pink-500 text-white'
                      : 'bg-white text-gray-800 shadow-sm'
                  }`}>
                    {message.senderId !== currentUserId && (
                      <div className="text-xs font-medium mb-1 opacity-75">
                        {message.senderName}
                      </div>
                    )}
                    <div className="text-sm">{message.text}</div>
                    <div className={`text-xs mt-1 ${
                      message.senderId === currentUserId ? 'text-pink-100' : 'text-gray-500'
                    }`}>
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      {chatInfo.isActive ? (
        <div className="bg-white border-t border-gray-200 p-4">
          <form onSubmit={handleSendMessage} className="flex gap-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Nhập tin nhắn..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className="px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Gửi
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-gray-100 border-t border-gray-200 p-4 text-center">
          <p className="text-gray-600 text-sm">Chat đã đóng sau 72 giờ</p>
        </div>
      )}
    </div>
  );
}

export default ChatDetail;