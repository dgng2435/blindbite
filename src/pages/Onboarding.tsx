import { useNavigate } from 'react-router-dom';

function Onboarding() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-pink-100 to-yellow-50 p-6">
      <div className="flex items-center justify-center">
        <img
          src="/logo.png"
          alt="BlindBite Logo"
          className="w-100 h-100"
        />
      </div>
      <div className="mb-10">
        <h1 className="text-5xl font-extrabold text-pink-600">BlindBite</h1>
      </div>

      {/* Nội dung + nút */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Ăn tối cùng tôi
        </h2>
        <p className="text-gray-600 mb-6">
          Không chỉ là hẹn hò, mà còn là trải nghiệm và kết nối.
        </p>
        <button 
          onClick={handleGetStarted}
          className="px-8 py-3 rounded-2xl bg-pink-500 text-white font-semibold shadow-lg hover:bg-pink-600 transition"
        >
          Bắt đầu
        </button>
      </div>
    </div>
  );
}

export default Onboarding;