import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { auth, provider, db, logout, signInAsAdmin, getUserRole, ADMIN_CREDENTIALS, createAdminUser } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { FcGoogle } from "react-icons/fc";

Modal.setAppElement("#root");

const ModalLogin = ({ isOpen, onRequestClose, user, setUser, userRole, setUserRole }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);

  const handleSignOut = async () => {
    try {
      await logout();
      setUser(null);
      setUserRole(null);
      localStorage.removeItem("userData");
      setShowConfirmLogout(false);
      onRequestClose();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // استرجاع البيانات من localStorage أولاً لتجنب فلاش الـ User
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser({ uid: parsed.uid, email: parsed.email, displayName: parsed.displayName });
      setUserRole(parsed.role);
    }

    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        // إذا البريد هو بريد الإدمن، اجعل الدور ثابت
        const role = currentUser.email === ADMIN_CREDENTIALS.email ? "admin" : await getUserRole(currentUser.uid).catch(() => "user");
        setUser(currentUser);
        setUserRole(role);
        localStorage.setItem(
          "userData",
          JSON.stringify({
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName || (role === "admin" ? "Administrator" : ""),
            role
          })
        );
      } else {
        localStorage.removeItem("userData");
        setUser(null);
        setUserRole(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        await setDoc(ref, {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          role: "user",
          createdAt: new Date()
        });
      }
      onRequestClose();
    } catch (err) {
      console.error(err);
      setError("Google login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let userCredential;

      if (!isSignUp) {
        // تسجيل الدخول
        if (email === ADMIN_CREDENTIALS.email) {
          userCredential = await signInAsAdmin(email, password);
        } else {
          userCredential = await signInWithEmailAndPassword(auth, email, password);
        }

        const currentUser = userCredential.user;
        const role = currentUser.email === ADMIN_CREDENTIALS.email ? "admin" : await getUserRole(currentUser.uid).catch(() => "user");

        const userData = {
          uid: currentUser.uid,
          displayName: currentUser.displayName || (role === "admin" ? "Administrator" : ""),
          email: currentUser.email,
          role
        };

        setUser(currentUser);
        setUserRole(role);
        localStorage.setItem("userData", JSON.stringify(userData));
        onRequestClose();
      } else {
        // إنشاء حساب جديد
        if (password !== confirmPassword) {
          setError("Passwords do not match");
          setLoading(false);
          return;
        }

        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const newUser = userCredential.user;

        const role = "user"; // أي مستخدم جديد لا يمكن أن يكون admin
        await setDoc(doc(db, "users", newUser.uid), {
          displayName: name,
          email: newUser.email,
          role,
          createdAt: new Date()
        });

        const userData = {
          uid: newUser.uid,
          displayName: name,
          email: newUser.email,
          role
        };

        setUser(newUser);
        setUserRole(role);
        localStorage.setItem("userData", JSON.stringify(userData));
        onRequestClose();
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const confirmSignOut = () => setShowConfirmLogout(true);
  const cancelSignOut = () => setShowConfirmLogout(false);

  const goToAdminPanel = () => {
    onRequestClose();
    console.log("Redirect to admin panel");
  };

  // الدور الذي سيظهر في العرض (ثابت للإدمن)
  const displayRole = user?.email === ADMIN_CREDENTIALS.email ? "admin" : userRole;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        overlay: { backgroundColor: "rgba(0,0,0,0.6)", zIndex: 1000 },
        content: {
          maxWidth: "450px",
          maxHeight: "90vh",
          margin: "auto",
          borderRadius: "16px",
          padding: "40px 30px",
          border: "none",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          background: "white",
          position: "relative",
          overflowY: "auto",
        },
      }}
    >
      <button onClick={onRequestClose} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-all text-gray-500 hover:text-gray-700 text-xl font-bold">×</button>

      {showConfirmLogout ? (
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-2xl text-red-600">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Confirm Sign Out</h2>
          <p className="text-gray-600 mb-6 text-lg">Are you sure you want to sign out?</p>
          <div className="space-y-3">
            <button onClick={handleSignOut} className="w-full bg-red-600 text-white py-3 rounded-xl font-bold hover:bg-red-700 transition-all" style={{ backgroundColor: "#3498db" }}>Yes, Sign Out</button>
            <button onClick={cancelSignOut} className="w-full bg-gray-200 text-gray-800 py-3 rounded-xl font-bold hover:bg-gray-300 transition-all">Cancel</button>
          </div>
        </div>
      ) : user ? (
        <div className="text-center">
          {/* أيقونة أول حرف من الإيميل */}
         // داخل JSX، استبدلي الكود السابق بالآتي:

{/* أيقونة أول حرف من الإيميل */}
<div className="w-20 h-20 mx-auto mb-4 bg-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
  {user?.email?.[0]?.toUpperCase() || "?"}
</div>

<h2 className="text-3xl font-extrabold mb-2 text-gray-900">
  Welcome back, {user?.email || "Guest"}! 👋
</h2>

<span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${
  displayRole === "admin" ? "bg-purple-100 text-purple-800" : "bg-green-100 text-green-800"
}`}>
  {displayRole === "admin" ? '👑 Administrator' : '👤 User'}
</span>

{/* معلومات الحساب */}
<div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
  <div className="flex justify-between mb-2">
    <span className="text-gray-600 font-semibold">Email:</span>
    <span className="font-semibold">{user?.email || "N/A"}</span>
  </div>
  <div className="flex justify-between">
    <span className="text-gray-600 font-semibold">Role:</span>
    <span className={`font-semibold ${displayRole === "admin" ? "text-purple-600" : "text-green-600"}`}>
      {displayRole === "admin" ? "Administrator" : "User"}
    </span>
  </div>
</div>


          {/* أزرار */}
          <div className="space-y-3">
            {displayRole === "admin" && (
              <button onClick={goToAdminPanel} className="w-full bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700 transition-all flex items-center justify-center gap-2"
              style={{ backgroundColor: "#3498db" }} // نفس اللون الأزرق
  >
                👑 Admin Panel
              </button>
            )}
            <button onClick={() => onRequestClose()} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all"
              style={{ backgroundColor: "#3498db" }} // نفس اللون الأزرق
  >
              🏠 Continue Shopping
            </button>
            <button onClick={confirmSignOut} className="w-full bg-gray-200 text-gray-800 py-3 rounded-xl font-bold hover:bg-gray-300 transition-all">
              🔓 Sign Out
            </button>
          </div>
        </div>
      ) : (
        <div>
          {/* نموذج تسجيل الدخول أو إنشاء حساب */}
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">{isSignUp ? "Create Account" : "Login"}</h2>
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-4">{error}</div>}
          <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
            {isSignUp && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input type="text" placeholder="Enter your full name" value={name} onChange={(e)=>setName(e.target.value)} required className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"/>
              </div>
            )}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input type="email" placeholder="Enter your email" value={email} onChange={(e)=>setEmail(e.target.value)} required className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"/>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input type="password" placeholder="Enter your password" value={password} onChange={(e)=>setPassword(e.target.value)} required className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"/>
            </div>
            {isSignUp && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
                <input type="password" placeholder="Confirm your password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} required className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"/>
              </div>
            )}
            <button type="submit" disabled={loading} className={`w-full py-4 rounded-xl font-bold text-white text-lg transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed ${isSignUp ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700" : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"} border-2 border-transparent hover:border-white`}>
              {loading ? "Loading..." : (isSignUp ? "Create Account" : "Sign In")}
            </button>
          </form>
          <button onClick={handleGoogleLogin} disabled={loading} className="flex items-center justify-center gap-3 mt-6 w-full border-2 border-gray-300 rounded-xl py-3 hover:bg-gray-50 hover:border-gray-400 transition-all font-semibold text-gray-700 text-lg disabled:opacity-50 disabled:cursor-not-allowed">
            <FcGoogle size={26}/> <span>Sign in with Google</span>
          </button>
          <p className="text-center mt-6 text-gray-600 text-lg">{isSignUp ? "Already have an account?" : "Don't have an account?"} <span onClick={()=>{setIsSignUp(!isSignUp); setError("")}} className="text-blue-600 cursor-pointer hover:underline font-bold ml-1">{isSignUp ? "Login" : "Sign Up"}</span></p>
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-xl text-center"><p className="text-sm text-yellow-700"><strong>Admin Access:</strong> Use {ADMIN_CREDENTIALS.email}</p></div>
        </div>
      )}
    </Modal>
  );
};

export default ModalLogin;
