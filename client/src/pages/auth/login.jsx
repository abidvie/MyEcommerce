// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Mail, Lock, Eye, EyeOff } from "lucide-react";

// function Login() {
//   const [showPassword, setShowPassword] = useState(false);

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >

//       <div className="login-header">
//         <div className="auth-tabs">
//           <Link className="active-tab" to="/auth/login">
//             Login
//           </Link>

//           <Link to="/auth/register">
//             Sign Up
//           </Link>
//         </div>

//         <h2>Login to your account</h2>

//         <p>
//           Enter your credentials to access your account
//         </p>
//       </div>

//       <form className="auth-form">

//         <label>Email address</label>

//         <div className="input-wrapper">
//           <Mail size={19} />

//           <input
//             type="email"
//             placeholder="you@example.com"
//           />
//         </div>

//         <label>Password</label>

//         <div className="input-wrapper">
//           <Lock size={19} />

//           <input
//             type={showPassword ? "text" : "password"}
//             placeholder="Enter your password"
//           />

//           <button
//             type="button"
//             className="password-button"
//             onClick={() => setShowPassword(!showPassword)}
//           >
//             {showPassword ? (
//               <EyeOff size={18} />
//             ) : (
//               <Eye size={18} />
//             )}
//           </button>
//         </div>

//         <div className="form-options">

//           <label className="remember">
//             <input type="checkbox" />
//             <span>Remember me</span>
//           </label>

//           <Link to="/forgot-password">
//             Forgot password?
//           </Link>

//         </div>

//         <motion.button
//           className="login-button"
//           whileHover={{ scale: 1.02 }}
//           whileTap={{ scale: 0.97 }}
//         >
//           Login
//         </motion.button>

//       </form>

//       <div className="divider">
//         <span>or continue with</span>
//       </div>

//       <div className="social-buttons">

//         <button>
//           <span className="google-icon">G</span>
//           Google
//         </button>

//         <button>
//           <span>●</span>
//           Apple
//         </button>

//       </div>

//       <p className="signup-text">
//         Don't have an account?

//         <Link to="/auth/register">
//           Sign up
//         </Link>
//       </p>

//     </motion.div>
//   );
// }

// export default Login;



//       2nd updated ui ////////////////////





import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Check,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/AuthSlice/authslice";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();


     const formData=new FormData(e.target);
     const data=Object.fromEntries(formData.entries());
     console.log(data);

     dispatch(loginUser(data)).unwrap()
    .then((response) => {
      console.log("Login successful:", response);
      
      // Handle successful login, e.g., redirect to dashboard
    })
    .catch((error) => {
      console.error("Login failed:", error);
      // Handle login failure, e.g., show error message
    }); 





    // Add your login API here later
    // console.log("Login submitted");
  };

  return (
    <motion.div
      className="auth-content"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >

      {/* ================= TABS ================= */}
      <div className="auth-tabs">

        <Link
          to="/auth/login"
          className="active-tab"
        >
          Login
        </Link>

        <Link to="/auth/register">
          Sign Up
        </Link>

      </div>

      {/* ================= HEADER ================= */}
      <div className="login-header">

        <motion.div
          className="welcome-icon"
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            delay: 0.2,
            type: "spring",
            stiffness: 200,
          }}
        >
          👋
        </motion.div>

        <h2>
          Welcome back
          <span>.</span>
        </h2>

        <p>
          Login to your account and continue your shopping journey.
        </p>

      </div>

      {/* ================= FORM ================= */}
      <form
        className="auth-form"
        onSubmit={handleSubmit}
      >

        {/* EMAIL */}
        <div className="form-group">

          <label htmlFor="login-email">
            Email address
          </label>

          <div className="input-wrapper">

            <Mail size={19} />

            <input
              id="login-email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
            />

          </div>

        </div>

        {/* PASSWORD */}
        <div className="form-group">

          <label htmlFor="login-password">
            Password
          </label>

          <div className="input-wrapper">

            <Lock size={19} />

            <input
              id="login-password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />

            <button
              type="button"
              className="password-button"
              onClick={() =>
                setShowPassword((previous) => !previous)
              }
              aria-label={
                showPassword
                  ? "Hide password"
                  : "Show password"
              }
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>

          </div>

        </div>

        {/* OPTIONS */}
        <div className="form-options">

          <label className="remember">

            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) =>
                setRememberMe(e.target.checked)
              }
            />

            <span className="custom-checkbox">
              {rememberMe && <Check size={13} />}
            </span>

            <span>Remember me</span>

          </label>

          <Link to="/forgot-password">
            Forgot password?
          </Link>

        </div>

        {/* LOGIN BUTTON */}
        <motion.button
          type="submit"
          className="login-button"
          whileHover={{
            scale: 1.015,
            y: -2,
          }}
          whileTap={{
            scale: 0.97,
          }}
        >

          <span>Login to Nexora</span>

          <ArrowRight size={19} />

        </motion.button>

      </form>

      {/* ================= DIVIDER ================= */}
      <div className="divider">
        <span />
        <p>or continue with</p>
        <span />
      </div>

      {/* ================= SOCIAL BUTTONS ================= */}
      <div className="social-buttons">

        <motion.button
          type="button"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="google-icon">
            G
          </span>
          Google
        </motion.button>

        <motion.button
          type="button"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="apple-icon">
            
          </span>
          Apple
        </motion.button>

      </div>

      {/* ================= SIGN UP ================= */}
      <p className="signup-text">

        Don't have an account?

        <Link to="/auth/register">
          Create one
          <ArrowRight size={15} />
        </Link>

      </p>

    </motion.div>
  );
}

export default Login;

