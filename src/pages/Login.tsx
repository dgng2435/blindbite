import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO(stagewise): Add actual login logic here
    console.log('Login attempt:', formData);
    // Navigate to onboarding for new users or dashboard for existing users
    navigate('/onboarding');
  };

  const handleForgotSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO(stagewise): Add forgot password logic here
    setForgotSent(true);
    console.log('Forgot password email:', forgotEmail);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-pink-100 to-yellow-50 p-6">
      {/* Logo */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-pink-600">BlindBite</h1>
      </div>

      {/* Login Form */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {!showForgot ? (
          <>
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
              Đăng nhập
            </h2>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Nhập email của bạn"
                  autoComplete="email"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Nhập mật khẩu"
                  autoComplete="current-password"
                  required
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm text-pink-500 hover:underline"
                  onClick={() => setShowForgot(true)}
                >
                  Quên mật khẩu?
                </button>
              </div>

              <button
                type="submit"
                className="w-full px-8 py-3 rounded-xl bg-pink-500 text-white font-semibold shadow-lg hover:bg-pink-600 transition"
              >
                Đăng nhập
              </button>
            </form>

            <div className="text-center mt-6">
              <p className="text-gray-600">
                Chưa có tài khoản?{' '}
                <button 
                  type="button"
                  onClick={() => navigate('/register')}
                  className="text-pink-500 font-semibold hover:text-pink-600"
                >
                  Đăng ký ngay
                </button>
              </p>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
              Quên mật khẩu
            </h2>
            {!forgotSent ? (
              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <div>
                  <label htmlFor="forgotEmail" className="block text-sm font-medium text-gray-700 mb-2">
                    Nhập email để lấy lại mật khẩu
                  </label>
                  <input
                    type="email"
                    id="forgotEmail"
                    name="forgotEmail"
                    value={forgotEmail}
                    onChange={e => setForgotEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Nhập email của bạn"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-8 py-3 rounded-xl bg-pink-500 text-white font-semibold shadow-lg hover:bg-pink-600 transition"
                >
                  Gửi yêu cầu
                </button>
                <button
                  type="button"
                  className="w-full mt-2 px-8 py-3 rounded-xl bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition"
                  onClick={() => {
                    setShowForgot(false);
                    setForgotSent(false);
                    setForgotEmail('');
                  }}
                >
                  Quay lại đăng nhập
                </button>
              </form>
            ) : (
              <div className="text-center space-y-4">
                <p className="text-green-600 font-semibold">
                  Đã gửi yêu cầu đặt lại mật khẩu! Vui lòng kiểm tra email của bạn.
                </p>
                <button
                  type="button"
                  className="w-full px-8 py-3 rounded-xl bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition"
                  onClick={() => {
                    setShowForgot(false);
                    setForgotSent(false);
                    setForgotEmail('');
                  }}
                >
                  Quay lại đăng nhập
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Login;