import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  name: string;
  gender: 'Nam' | 'Nữ';
  age: number;
  job: string;
  isFirstTime: boolean;
  trustScore: number;
}

interface Table {
  id: number;
  capacity: number;
  members: User[];
}

function AdminTables() {
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState('1');
  const [autoArranged, setAutoArranged] = useState(false);

  // TODO(stagewise): Replace with real data from backend
  const mockEvents = [
    { id: '1', name: 'Nhà hàng The Deck - 17/01', bookedCount: 23 },
    { id: '2', name: 'Rooftop Garden - 24/01', bookedCount: 20 }
  ];

  const mockUsers: User[] = [
    { id: 'U001', name: 'Nguyễn Văn A', gender: 'Nam', age: 28, job: 'Công nghệ thông tin', isFirstTime: true, trustScore: 8.5 },
    { id: 'U002', name: 'Trần Thị B', gender: 'Nữ', age: 25, job: 'Marketing', isFirstTime: false, trustScore: 9.2 },
    { id: 'U003', name: 'Lê Minh C', gender: 'Nam', age: 30, job: 'Tài chính', isFirstTime: true, trustScore: 7.8 },
    { id: 'U004', name: 'Phạm Thị D', gender: 'Nữ', age: 27, job: 'Thiết kế', isFirstTime: false, trustScore: 8.9 },
    { id: 'U005', name: 'Hoàng Văn E', gender: 'Nam', age: 32, job: 'Kinh doanh', isFirstTime: true, trustScore: 8.1 },
    { id: 'U006', name: 'Vũ Thị F', gender: 'Nữ', age: 24, job: 'Công nghệ thông tin', isFirstTime: false, trustScore: 9.0 }
  ];

  // Khởi tạo state cho tables từ mockTables
  const initialTables: Table[] = [
    {
      id: 1,
      capacity: 6,
      members: [
        mockUsers[0], mockUsers[1], mockUsers[2], mockUsers[3]
      ]
    },
    {
      id: 2,
      capacity: 6,
      members: [
        mockUsers[4], mockUsers[5]
      ]
    },
    {
      id: 3,
      capacity: 6,
      members: []
    }
  ];

  const [tables, setTables] = useState<Table[]>(initialTables);

  // Xếp bàn tự động: chia đều nam/nữ vào các bàn
  const handleAutoArrange = () => {
    const males = mockUsers.filter(u => u.gender === 'Nam');
    const females = mockUsers.filter(u => u.gender === 'Nữ');
    const newTables = tables.map(table => ({ ...table, members: [] as User[] }));

    let tableIdx = 0;
    [...males, ...females].forEach(user => {
      newTables[tableIdx].members.push(user);
      tableIdx = (tableIdx + 1) % newTables.length;
    });

    setTables(newTables);
    setAutoArranged(true);
    setTimeout(() => {
      alert('Xếp bàn tự động hoàn tất!');
    }, 500);
  };

  // Reset bàn về trạng thái trống
  const handleReset = () => {
    setTables(tables.map(table => ({ ...table, members: [] })));
    setAutoArranged(false);
  };

  const getGenderBalance = (members: User[]) => {
    const maleCount = members.filter(m => m.gender === 'Nam').length;
    const femaleCount = members.filter(m => m.gender === 'Nữ').length;
    return { male: maleCount, female: femaleCount };
  };

  const getJobDiversity = (members: User[]) => {
    const jobs = new Set(members.map(m => m.job));
    return jobs.size;
  };

  const getAverageAge = (members: User[]) => {
    if (members.length === 0) return 0;
    const sum = members.reduce((acc, m) => acc + m.age, 0);
    return Math.round(sum / members.length);
  };

  const getTableScore = (table: Table) => {
    if (table.members.length === 0) return 0;
    const balance = getGenderBalance(table.members);
    const diversity = getJobDiversity(table.members);
    const avgTrust = table.members.reduce((acc, m) => acc + m.trustScore, 0) / table.members.length;
    let score = avgTrust;
    if (Math.abs(balance.male - balance.female) <= 1) score += 1; // Gender balance bonus
    if (diversity >= 3) score += 0.5; // Job diversity bonus
    return Math.round(score * 10) / 10;
  };

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
              <h1 className="text-2xl font-bold text-gray-800">Xếp Bàn</h1>
              <p className="text-gray-600">Tự động và thủ công xếp bàn cho sự kiện</p>
            </div>
          </div>
          <button
            onClick={handleAutoArrange}
            disabled={autoArranged}
            className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition disabled:opacity-50"
          >
            🤖 Xếp bàn tự động
          </button>
        </div>

        {/* Event Selector */}
        <div className="max-w-md">
          <select
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            {mockEvents.map((event) => (
              <option key={event.id} value={event.id}>
                {event.name} ({event.bookedCount} người)
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="p-6">
        {/* Algorithm Rules */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">📋 Quy tắc xếp bàn</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Cân bằng giới tính (tối đa chênh lệch 1 người)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Ưu tiên người lần đầu tham gia</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Đa dạng nghề nghiệp (tối đa 2 nghề trùng)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span>Điểm tin cậy cao được ưu tiên</span>
            </div>
          </div>
        </div>

        {/* Tables Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {tables.map((table) => {
            const balance = getGenderBalance(table.members);
            const diversity = getJobDiversity(table.members);
            const avgAge = getAverageAge(table.members);
            const score = getTableScore(table);

            return (
              <div key={table.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Bàn {table.id}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">
                      {table.members.length}/{table.capacity}
                    </span>
                    {score > 0 && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        Score: {score}
                      </span>
                    )}
                  </div>
                </div>

                {/* Table Stats */}
                {table.members.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
                    <div className="bg-gray-50 rounded p-2 text-center">
                      <div className="font-medium text-gray-800">{balance.male}M/{balance.female}F</div>
                      <div className="text-gray-600">Giới tính</div>
                    </div>
                    <div className="bg-gray-50 rounded p-2 text-center">
                      <div className="font-medium text-gray-800">{diversity}</div>
                      <div className="text-gray-600">Nghề khác</div>
                    </div>
                    <div className="bg-gray-50 rounded p-2 text-center">
                      <div className="font-medium text-gray-800">{avgAge}</div>
                      <div className="text-gray-600">Tuổi TB</div>
                    </div>
                  </div>
                )}

                {/* Members List */}
                <div className="space-y-2">
                  {table.members.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                          member.gender === 'Nam' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'
                        }`}>
                          {member.gender === 'Nam' ? '👨' : '👩'}
                        </div>
                        <div>
                          <div className="font-medium text-gray-800 text-sm">{member.name}</div>
                          <div className="text-xs text-gray-600">{member.job} • {member.age} tuổi</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {member.isFirstTime && (
                          <span className="px-1 py-0.5 bg-yellow-100 text-yellow-700 rounded text-xs">Mới</span>
                        )}
                        <span className="text-xs text-gray-600">⭐{member.trustScore}</span>
                      </div>
                    </div>
                  ))}

                  {/* Empty Slots */}
                  {Array.from({ length: table.capacity - table.members.length }).map((_, index) => (
                    <div key={index} className="flex items-center justify-center p-3 border-2 border-dashed border-gray-300 rounded-lg">
                      <span className="text-gray-400 text-sm">Chỗ trống</span>
                    </div>
                  ))}
                </div>

                {/* Table Actions */}
                <div className="flex gap-2 mt-4">
                  <button
                    className="flex-1 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                    // TODO: Thêm logic chỉnh sửa bàn nếu muốn
                  >
                    Chỉnh sửa
                  </button>
                  <button
                    className="px-3 py-2 text-sm bg-pink-100 text-pink-700 rounded-lg hover:bg-pink-200 transition"
                    onClick={handleReset}
                  >
                    Reset
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">📊 Tóm tắt xếp bàn</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-800">{tables.length}</div>
              <div className="text-sm text-gray-600">Tổng số bàn</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {tables.reduce((acc, t) => acc + t.members.length, 0)}
              </div>
              <div className="text-sm text-gray-600">Đã xếp chỗ</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-600">
                {tables.reduce((acc, t) => acc + (t.capacity - t.members.length), 0)}
              </div>
              <div className="text-sm text-gray-600">Chỗ trống</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-pink-600">
                {Math.round((tables.reduce((acc, t) => acc + getTableScore(t), 0) / tables.length) * 10) / 10}
              </div>
              <div className="text-sm text-gray-600">Score trung bình</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminTables;