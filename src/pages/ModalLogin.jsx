import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { auth, provider, signInWithPopup, signOut } from "./firebase";
import { FcGoogle } from "react-icons/fc";

Modal.setAppElement("#root");

const ModalLogin = ({ isOpen, onRequestClose }) => {
  const [user, setUser] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      onRequestClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(
      isSignUp
        ? "Sign Up" + name + email + password + confirmPassword
        : "Sign In" + email + password
    );
    onRequestClose();
  };

  return (
    <Modal
  isOpen={isOpen}
  onRequestClose={onRequestClose}
  style={{
    overlay: { 
      backgroundColor: "rgba(0,0,0,0.6)",
      zIndex: 1000
    },
    content: {
      maxWidth: "450px",
      maxHeight: "90vh", // الحد الأقصى للارتفاع
      margin: "auto",
      borderRadius: "16px",
      padding: "40px 30px",
      border: "none",
      boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
      background: "white",
      position: "relative",
      overflowY: "auto", // هذه الخاصية تجعل المحتوى قابل للتمرير عموديًا
    },
  }}
>

      {/* زر X في الأعلى */}
      <button
        onClick={onRequestClose}
        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-all text-gray-500 hover:text-gray-700 text-xl font-bold"
      >
        ×
      </button>

      {user ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Welcome, {user.displayName || user.email}
          </h2>
          <button
            onClick={handleSignOut}
            className="bg-red-600 text-white w-full py-3 rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg text-lg"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
            {isSignUp ? "Create Account" : "Login"}
          </h2>

          <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
            {isSignUp && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                />
              </div>
            )}
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>

            {isSignUp && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                />
              </div>
            )}
            
            {/* الزر الرئيسي - واضح جداً */}
            <button
              type="submit"
              className={`
                w-full py-4 rounded-xl font-bold text-white text-lg
                transition-all duration-300 shadow-2xl hover:shadow-3xl
                hover:scale-[1.02] active:scale-[0.98]
                ${isSignUp 
                  ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700" 
                  : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                }
                border-2 border-transparent hover:border-white
              `}
            >
              {isSignUp ? "Create Account" : "Sign In"}
            </button>
          </form>

          {/* زر Google - واضح جداً */}
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-3 mt-6 w-full border-2 border-gray-300 rounded-xl py-3 hover:bg-gray-50 hover:border-gray-400 transition-all font-semibold text-gray-700 text-lg"
          >
            <FcGoogle size={26} />
            <span>Sign in with Google</span>
          </button>

          {/* رابط التبديل */}
          <p className="text-center mt-6 text-gray-600 text-lg">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <span
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-blue-600 cursor-pointer hover:underline font-bold ml-1"
            >
              {isSignUp ? "Login" : "Sign Up"}
            </span>
          </p>
        </div>
      )}
    </Modal>
  );
};

export default ModalLogin;