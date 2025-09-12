import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  gender: string;
  birthYear: number;
  job: string;
  city: string;
  joinedDate: string;
  eventsAttended: number;
  trustScore: number;
  totalSpent: number;
}

function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<UserProfile>>({});

  useEffect(() => {
    // TODO(stagewise): Get user profile from backend
    const savedData = localStorage.getItem('onboardingData');
    const mockProfile: UserProfile = {
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@email.com',
      phone: '0901234567',
      gender: 'Nam',
      birthYear: 1995,
      job: 'Công nghệ thông tin',
      city: 'Hồ Chí Minh',
      joinedDate: '2024-01-01',
      eventsAttended: 3,
      trustScore: 8.5,
      totalSpent: 1050000
    };

    if (savedData) {
      const onboardingData = JSON.parse(savedData);
      setProfile({
        ...mockProfile,
        name: onboardingData.name || mockProfile.name,
        gender: onboardingData.gender || mockProfile.gender,
        birthYear: onboardingData.birthYear || mockProfile.birthYear,
        job: onboardingData.job || mockProfile.job,
        city: onboardingData.city || mockProfile.city,
      });
    } else {
      setProfile(mockProfile);
    }
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const calculateAge = (birthYear: number) => {
    return new Date().getFullYear() - birthYear;
  };

  const formatJoinDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const handleEditProfile = () => {
    setEditForm(profile || {});
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    if (profile && editForm) {
      const updatedProfile = { ...profile, ...editForm };
      setProfile(updatedProfile);
      
      // Update localStorage
      const currentOnboardingData = JSON.parse(localStorage.getItem('onboardingData') || '{}');
      const newOnboardingData = {
        ...currentOnboardingData,
        name: editForm.name,
        gender: editForm.gender,
        birthYear: editForm.birthYear,
        job: editForm.job,
        city: editForm.city
      };
      localStorage.setItem('onboardingData', JSON.stringify(newOnboardingData));
      
      // TODO(stagewise): Save to backend
      console.log('Profile updated:', updatedProfile);
    }
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('onboardingData');
    navigate('/');
  };

  if (!profile) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-gray-600">Đang tải...</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm p-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-2xl font-bold text-pink-600 hover:text-pink-700 transition"
          >
            BlindBite
          </button>
          <button
            onClick={handleEditProfile}
            className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
          >
            Chỉnh sửa
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {profile.name.charAt(0)}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">{profile.name}</h2>
              <p className="text-gray-600">{profile.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  ⭐ {profile.trustScore} Trust Score
                </span>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                  {profile.eventsAttended} events
                </span>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Số điện thoại</label>
              <p className="text-gray-800">{profile.phone}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Giới tính</label>
              <p className="text-gray-800">{profile.gender}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Tuổi</label>
              <p className="text-gray-800">{calculateAge(profile.birthYear)} tuổi</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Nghề nghiệp</label>
              <p className="text-gray-800">{profile.job}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Thành phố</label>
              <p className="text-gray-800">📍 {profile.city}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Tham gia từ</label>
              <p className="text-gray-800">{formatJoinDate(profile.joinedDate)}</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-pink-600 mb-1">{profile.eventsAttended}</div>
            <div className="text-sm text-gray-600">Sự kiện đã tham gia</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="text-lg font-bold text-green-600 mb-1">{formatPrice(profile.totalSpent)}</div>
            <div className="text-sm text-gray-600">Tổng chi tiêu</div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Hoạt động gần đây</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Tham gia sự kiện "Nhà hàng The Deck"</span>
              <span className="text-xs text-gray-500 ml-auto">3 ngày trước</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Đánh giá 5 sao cho sự kiện</span>
              <span className="text-xs text-gray-500 ml-auto">1 tuần trước</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Cập nhật thông tin hồ sơ</span>
              <span className="text-xs text-gray-500 ml-auto">2 tuần trước</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div>
          <button
            onClick={handleLogout}
            className="w-full p-4 bg-red-50 text-red-700 rounded-xl hover:bg-red-100 transition text-left"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">🚪</span>
              <div>
                <div className="font-medium">Đăng xuất</div>
                <div className="text-sm opacity-75">Thoát khỏi tài khoản</div>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Chỉnh sửa hồ sơ</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tên</label>
                <input
                  type="text"
                  value={editForm.name || ''}
                  onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={editForm.email || ''}
                  onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
                <input
                  type="tel"
                  value={editForm.phone || ''}
                  onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nghề nghiệp</label>
                <input
                  type="text"
                  value={editForm.job || ''}
                  onChange={(e) => setEditForm({...editForm, job: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Hủy
              </button>
              <button
                onClick={handleSaveProfile}
                className="flex-1 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}

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
          
          <button className="flex flex-col items-center gap-1">
            <div className="w-6 h-6 text-gray-400">💬</div>
            <span className="text-xs text-gray-400">Trò Chuyện</span>
          </button>
          
          <button className="flex flex-col items-center gap-1">
            <div className="w-6 h-6 text-gray-400">📅</div>
            <span className="text-xs text-gray-400">Events</span>
          </button>
          
          <button className="flex flex-col items-center gap-1">
            <div className="w-6 h-6 text-pink-500">👤</div>
            <span className="text-xs font-medium text-pink-500">Hồ Sơ</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;