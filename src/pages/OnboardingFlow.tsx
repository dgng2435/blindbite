import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Question {
  id: string;
  title: string;
  type: 'choice' | 'text' | 'yesno' | 'input' | 'year' | 'city';
  options?: string[];
  placeholder?: string;
  section?: string;
}

const questions: Question[] = [
  // Initial personality question
  {
    id: 'personality_type',
    title: 'Bạn nghĩ mình là người thiên về:',
    type: 'choice',
    options: ['Cảm xúc', 'Lý trí']
  },
  
  // 1. Thông tin cơ bản
  {
    id: 'name',
    title: 'Tên của bạn là gì?',
    type: 'input',
    placeholder: 'Nhập tên của bạn...',
    section: 'Thông tin cơ bản'
  },
  {
    id: 'birth_year',
    title: 'Bạn sinh năm bao nhiêu?',
    type: 'year',
    placeholder: 'Ví dụ: 1995',
    section: 'Thông tin cơ bản'
  },
  {
    id: 'gender',
    title: 'Giới tính của bạn?',
    type: 'choice',
    options: ['Nam', 'Nữ', 'Khác'],
    section: 'Thông tin cơ bản'
  },
  {
    id: 'looking_for',
    title: 'Bạn muốn kết nối với ai?',
    type: 'choice',
    options: ['Nam', 'Nữ', 'Khác', 'Mở'],
    section: 'Thông tin cơ bản'
  },
  {
    id: 'city',
    title: 'Thành phố bạn đang sống?',
    type: 'city',
    options: ['Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng', 'Hải Phòng', 'Cần Thơ', 'Nha Trang', 'Huế', 'Vũng Tàu', 'Khác'],
    section: 'Thông tin cơ bản'
  },

  // 2. Về lối sống & sở thích
  {
    id: 'ideal_weekend',
    title: 'Một ngày cuối tuần lý tưởng với bạn là...?',
    type: 'choice',
    options: ['Ở nhà thư giãn', 'Đi chơi với bạn bè', 'Khám phá địa điểm mới', 'Tập thể thao', 'Đọc sách/xem phim', 'Hoạt động ngoài trời'],
    section: 'Lối sống & sở thích'
  },
  {
    id: 'date_food',
    title: 'Bạn thường chọn đi ăn gì khi hẹn hò?',
    type: 'choice',
    options: ['Món Việt truyền thống', 'Món Âu', 'Món Nhật/Hàn', 'Đồ ăn nhanh', 'Cafe & bánh ngọt', 'Tùy hứng'],
    section: 'Lối sống & sở thích'
  },
  {
    id: 'travel_interest',
    title: 'Bạn có thích du lịch không?',
    type: 'yesno',
    section: 'Lối sống & sở thích'
  },
  {
    id: 'next_destination',
    title: 'Nơi bạn muốn đến tiếp theo là đâu?',
    type: 'choice',
    options: ['Trong nước (biển)', 'Trong nước (núi)', 'Châu Á', 'Châu Âu', 'Châu Mỹ', 'Chưa có kế hoạch'],
    section: 'Lối sống & sở thích'
  },
  {
    id: 'daily_rhythm',
    title: 'Bạn là "cú đêm" hay "người dậy sớm"?',
    type: 'choice',
    options: ['Cú đêm', 'Người dậy sớm', 'Tùy tình huống'],
    section: 'Lối sống & sở thích'
  },
  {
    id: 'group_activities',
    title: 'Bạn có thích tham gia sự kiện/hoạt động nhóm không?',
    type: 'choice',
    options: ['Rất thích', 'Thích', 'Bình thường', 'Không thích lắm', 'Thích hoạt động 1-1 hơn'],
    section: 'Lối sống & sở thích'
  },

  // 3. Về mục tiêu & mong muốn khi tham gia
  {
    id: 'purpose',
    title: 'Bạn đến đây để tìm gì?',
    type: 'choice',
    options: ['Hẹn hò nghiêm túc', 'Kết bạn', 'Trải nghiệm mới', 'Ăn uống cùng nhau', 'Mở rộng mối quan hệ'],
    section: 'Mục tiêu & mong muốn'
  },
  {
    id: 'about_me',
    title: 'Một điều bạn muốn người khác biết ngay về mình?',
    type: 'text',
    placeholder: 'Chia sẻ điều đặc biệt về bạn...',
    section: 'Mục tiêu & mong muốn'
  },
  {
    id: 'relationship_important',
    title: 'Bạn nghĩ điều gì quan trọng nhất trong một mối quan hệ?',
    type: 'choice',
    options: ['Sự tin tương', 'Giao tiếp tốt', 'Tôn trọng lẫn nhau', 'Có chung sở thích', 'Hỗ trợ lẫn nhau', 'Tất cả đều quan trọng'],
    section: 'Mục tiêu & mong muốn'
  },
  {
    id: 'first_experience',
    title: 'Bạn muốn trải nghiệm BlindBite đầu tiên của mình như thế nào?',
    type: 'choice',
    options: ['Bữa tối nhẹ nhàng', 'Cafe', 'Event', 'Bất ngờ', 'Hoạt động vui nhộn'],
    section: 'Mục tiêu & mong muốn'
  }
];

type OnboardingData = {
  [key: string]: string;
};

function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<OnboardingData>({});
  const navigate = useNavigate();

  const currentQuestion = questions[currentStep];
  const totalSteps = questions.length;

  // Skip travel destination question if user doesn't like travel
  const shouldSkipQuestion = () => {
    if (currentQuestion.id === 'next_destination' && answers['travel_interest'] === 'no') {
      return true;
    }
    return false;
  };

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      let nextStep = currentStep + 1;
      
      // Skip next question if needed
      if (nextStep < totalSteps && questions[nextStep].id === 'next_destination' && answers['travel_interest'] === 'no') {
        nextStep++;
      }
      
      setCurrentStep(nextStep);
    } else {
      // TODO(stagewise): Save onboarding data to backend
      console.log('Onboarding completed:', answers);
      localStorage.setItem('onboardingData', JSON.stringify(answers));
      navigate('/dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      let prevStep = currentStep - 1;
      
      // Skip previous question if needed
      if (prevStep >= 0 && questions[prevStep].id === 'next_destination' && answers['travel_interest'] === 'no') {
        prevStep--;
      }
      
      setCurrentStep(prevStep);
    }
  };

  const isStepValid = () => {
    if (shouldSkipQuestion()) return true;
    
    const answer = answers[currentQuestion.id];
    
    if (currentQuestion.type === 'year') {
      const year = parseInt(answer);
      return year >= 1950 && year <= 2010;
    }
    
    return answer && answer.trim().length > 0;
  };

  const renderQuestion = () => {
    if (!currentQuestion) return null;

    // Skip question logic
    if (shouldSkipQuestion()) {
      handleNext();
      return null;
    }

    switch (currentQuestion.type) {
      case 'choice':
      case 'city':
        return (
          <div className="space-y-6">
            {currentQuestion.section && (
              <div className="text-center mb-4">
                <span className="inline-block px-3 py-1 bg-pink-100 text-pink-600 text-sm font-medium rounded-full">
                  {currentQuestion.section}
                </span>
              </div>
            )}
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
              {currentQuestion.title}
            </h2>
            <div className="space-y-3">
              {currentQuestion.options?.map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  className={`w-full py-4 px-6 rounded-xl border-2 text-left transition-all duration-200 ${
                    answers[currentQuestion.id] === option
                      ? 'border-pink-500 bg-pink-50 text-pink-700 shadow-md'
                      : 'border-gray-300 hover:border-pink-300 hover:bg-pink-25'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{option}</span>
                    {answers[currentQuestion.id] === option && (
                      <svg className="w-5 h-5 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 'yesno':
        return (
          <div className="space-y-6">
            {currentQuestion.section && (
              <div className="text-center mb-4">
                <span className="inline-block px-3 py-1 bg-pink-100 text-pink-600 text-sm font-medium rounded-full">
                  {currentQuestion.section}
                </span>
              </div>
            )}
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
              {currentQuestion.title}
            </h2>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => handleAnswer('yes')}
                className={`py-4 px-8 rounded-xl border-2 font-medium transition-all duration-200 ${
                  answers[currentQuestion.id] === 'yes'
                    ? 'border-pink-500 bg-pink-50 text-pink-700 shadow-md'
                    : 'border-gray-300 hover:border-pink-300 hover:bg-pink-25'
                }`}
              >
                Có
              </button>
              <button
                onClick={() => handleAnswer('no')}
                className={`py-4 px-8 rounded-xl border-2 font-medium transition-all duration-200 ${
                  answers[currentQuestion.id] === 'no'
                    ? 'border-pink-500 bg-pink-50 text-pink-700 shadow-md'
                    : 'border-gray-300 hover:border-pink-300 hover:bg-pink-25'
                }`}
              >
                Không
              </button>
            </div>
          </div>
        );

      case 'input':
      case 'year':
        return (
          <div className="space-y-6">
            {currentQuestion.section && (
              <div className="text-center mb-4">
                <span className="inline-block px-3 py-1 bg-pink-100 text-pink-600 text-sm font-medium rounded-full">
                  {currentQuestion.section}
                </span>
              </div>
            )}
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
              {currentQuestion.title}
            </h2>
            <input
              type={currentQuestion.type === 'year' ? 'number' : 'text'}
              value={answers[currentQuestion.id] || ''}
              onChange={(e) => handleAnswer(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-center text-lg"
              placeholder={currentQuestion.placeholder}
              min={currentQuestion.type === 'year' ? 1950 : undefined}
              max={currentQuestion.type === 'year' ? 2010 : undefined}
            />
            {currentQuestion.type === 'year' && (
              <p className="text-sm text-gray-500 text-center">
                Vui lòng nhập năm sinh từ 1950 đến 2010
              </p>
            )}
          </div>
        );

      case 'text':
        return (
          <div className="space-y-6">
            {currentQuestion.section && (
              <div className="text-center mb-4">
                <span className="inline-block px-3 py-1 bg-pink-100 text-pink-600 text-sm font-medium rounded-full">
                  {currentQuestion.section}
                </span>
              </div>
            )}
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
              {currentQuestion.title}
            </h2>
            <textarea
              value={answers[currentQuestion.id] || ''}
              onChange={(e) => handleAnswer(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
              placeholder={currentQuestion.placeholder || "Chia sẻ suy nghĩ của bạn..."}
              rows={4}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-pink-100 to-yellow-50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          {currentStep > 0 && (
            <button
              onClick={handleBack}
              className="p-2 rounded-full hover:bg-white/50 transition-colors"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="BlindBite Logo"
              className="w-10 h-10"
            />
            <h1 className="text-2xl font-bold text-pink-600">BlindBite</h1>
          </div>
        </div>
        <div className="text-sm text-gray-600 font-medium">
          {currentStep + 1}/{totalSteps}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-3 mb-8 shadow-inner">
        <div 
          className="bg-gradient-to-r from-pink-500 to-pink-600 h-3 rounded-full transition-all duration-500 ease-out shadow-sm"
          style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
        ></div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center max-w-lg mx-auto w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {renderQuestion()}
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-8 max-w-lg mx-auto w-full">
        <button
          onClick={handleNext}
          disabled={!isStepValid()}
          className="w-full py-4 px-8 rounded-xl bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold shadow-lg hover:from-pink-600 hover:to-pink-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-pink-500 disabled:hover:to-pink-600 transform hover:scale-[1.02] disabled:hover:scale-100"
        >
          {currentStep === totalSteps - 1 ? 'Hoàn tất hồ sơ' : 'Tiếp tục'}
        </button>
      </div>

      {/* Skip option for early steps */}
      {currentStep < 5 && (
        <div className="mt-4 max-w-lg mx-auto w-full text-center">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Bỏ qua và đi đến dashboard
          </button>
        </div>
      )}
    </div>
  );
}

export default OnboardingFlow;