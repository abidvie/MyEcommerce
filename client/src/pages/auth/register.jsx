// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import {
//   User,
//   Mail,
//   Lock,
//   Eye,
//   EyeOff,
// } from "lucide-react";

// function Register() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >

//       {/* ================= TABS ================= */}

//       <div className="auth-tabs">

//         <Link to="/auth/login">
//           Login
//         </Link>

//         <Link
//           to="/auth/register"
//           className="active-tab"
//         >
//           Sign Up
//         </Link>

//       </div>


//       {/* ================= HEADER ================= */}

//       <div className="login-header">

//         <h2>
//           Create your account
//         </h2>

//         <p>
//           Join Nexora and start your shopping journey
//         </p>

//       </div>


//       {/* ================= FORM ================= */}

//       <form className="auth-form">

//         {/* Name */}

//         <label>
//           Full name
//         </label>

//         <div className="input-wrapper">

//           <User size={19} />

//           <input
//             type="text"
//             placeholder="Enter your full name"
//           />

//         </div>


//         {/* Email */}

//         <label>
//           Email address
//         </label>

//         <div className="input-wrapper">

//           <Mail size={19} />

//           <input
//             type="email"
//             placeholder="you@example.com"
//           />

//         </div>


//         {/* Password */}

//         <label>
//           Password
//         </label>

//         <div className="input-wrapper">

//           <Lock size={19} />

//           <input
//             type={showPassword ? "text" : "password"}
//             placeholder="Create a password"
//           />

//           <button
//             type="button"
//             className="password-button"
//             onClick={() =>
//               setShowPassword(!showPassword)
//             }
//           >
//             {showPassword ? (
//               <EyeOff size={18} />
//             ) : (
//               <Eye size={18} />
//             )}
//           </button>

//         </div>


//         {/* Confirm Password */}

//         <label>
//           Confirm password
//         </label>

//         <div className="input-wrapper">

//           <Lock size={19} />

//           <input
//             type={
//               showConfirmPassword
//                 ? "text"
//                 : "password"
//             }
//             placeholder="Confirm your password"
//           />

//           <button
//             type="button"
//             className="password-button"
//             onClick={() =>
//               setShowConfirmPassword(
//                 !showConfirmPassword
//               )
//             }
//           >
//             {showConfirmPassword ? (
//               <EyeOff size={18} />
//             ) : (
//               <Eye size={18} />
//             )}
//           </button>

//         </div>


//         {/* Terms */}

//         <label className="terms-checkbox">

//           <input type="checkbox" />

//           <span>
//             I agree to the{" "}
//             <a href="#">
//               Terms & Conditions
//             </a>{" "}
//             and{" "}
//             <a href="#">
//               Privacy Policy
//             </a>
//           </span>

//         </label>


//         {/* Register button */}

//         <motion.button
//           type="submit"
//           className="login-button"
//           whileHover={{ scale: 1.02 }}
//           whileTap={{ scale: 0.97 }}
//         >
//           Create Account
//         </motion.button>

//       </form>


//       {/* ================= DIVIDER ================= */}

//       <div className="divider">
//         <span>or continue with</span>
//       </div>


//       {/* ================= SOCIAL ================= */}

//       <div className="social-buttons">

//         <button type="button">
//           <span className="google-icon">
//             G
//           </span>

//           Google
//         </button>

//         <button type="button">

//           <span>
//             ●
//           </span>

//           Apple

//         </button>

//       </div>


//       {/* ================= LOGIN LINK ================= */}

//       <p className="signup-text">

//         Already have an account?

//         <Link to="/auth/login">
//           Login
//         </Link>

//       </p>

//     </motion.div>
//   );
// }

// export default Register;







/// 2nd updated ui ////////////////////////





import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Check,
  ShieldCheck,
} from "lucide-react";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [termsAccepted, setTermsAccepted] =
    useState(false);

  const getPasswordStrength = () => {
    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    return score;
  };

  const strength = getPasswordStrength();

  const getStrengthText = () => {
    if (!password) return "";
    if (strength <= 1) return "Weak password";
    if (strength === 2) return "Fair password";
    if (strength === 3) return "Good password";
    return "Strong password";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (!termsAccepted) {
      alert("Please accept the Terms & Conditions.");
      return;
    }

    // Add your registration API here later
    console.log("Registration submitted");
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

        <Link to="/auth/login">
          Login
        </Link>

        <Link
          to="/auth/register"
          className="active-tab"
        >
          Sign Up
        </Link>

      </div>

      {/* ================= HEADER ================= */}
      <div className="login-header">

        <motion.div
          className="welcome-icon"
          initial={{ scale: 0, rotate: 20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            delay: 0.2,
            type: "spring",
            stiffness: 200,
          }}
        >
          ✨
        </motion.div>

        <h2>
          Create your account
          <span>.</span>
        </h2>

        <p>
          Join Nexora and start your smarter shopping journey.
        </p>

      </div>

      {/* ================= FORM ================= */}
      <form
        className="auth-form register-form"
        onSubmit={handleSubmit}
      >

        {/* NAME */}
        <div className="form-group">

          <label htmlFor="register-name">
            Full name
          </label>

          <div className="input-wrapper">

            <User size={19} />

            <input
              id="register-name"
              type="text"
              placeholder="Enter your full name"
              autoComplete="name"
              required
            />

          </div>

        </div>

        {/* EMAIL */}
        <div className="form-group">

          <label htmlFor="register-email">
            Email address
          </label>

          <div className="input-wrapper">

            <Mail size={19} />

            <input
              id="register-email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
            />

          </div>

        </div>

        {/* PASSWORD */}
        <div className="form-group">

          <label htmlFor="register-password">
            Password
          </label>

          <div className="input-wrapper">

            <Lock size={19} />

            <input
              id="register-password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              autoComplete="new-password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

            <button
              type="button"
              className="password-button"
              onClick={() =>
                setShowPassword((previous) => !previous)
              }
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>

          </div>

          {/* PASSWORD STRENGTH */}
          <AnimatePresence>
            {password && (
              <motion.div
                className="password-strength"
                initial={{
                  opacity: 0,
                  height: 0,
                }}
                animate={{
                  opacity: 1,
                  height: "auto",
                }}
                exit={{
                  opacity: 0,
                  height: 0,
                }}
              >

                <div className="strength-bars">

                  {[1, 2, 3, 4].map((item) => (
                    <span
                      key={item}
                      className={
                        item <= strength
                          ? "strength-active"
                          : ""
                      }
                    />
                  ))}

                </div>

                <div className="strength-info">
                  <span>
                    {getStrengthText()}
                  </span>

                  {strength === 4 && (
                    <ShieldCheck size={15} />
                  )}
                </div>

              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* CONFIRM PASSWORD */}
        <div className="form-group">

          <label htmlFor="confirm-password">
            Confirm password
          </label>

          <div
            className={`input-wrapper ${
              confirmPassword &&
              password !== confirmPassword
                ? "input-error"
                : ""
            }`}
          >

            <Lock size={19} />

            <input
              id="confirm-password"
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              placeholder="Confirm your password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              required
            />

            <button
              type="button"
              className="password-button"
              onClick={() =>
                setShowConfirmPassword(
                  (previous) => !previous
                )
              }
            >
              {showConfirmPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>

          </div>

          {confirmPassword &&
            password !== confirmPassword && (
              <motion.small
                className="error-message"
                initial={{
                  opacity: 0,
                  y: -5,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
              >
                Passwords do not match.
              </motion.small>
            )}

          {confirmPassword &&
            password === confirmPassword && (
              <motion.small
                className="success-message"
                initial={{
                  opacity: 0,
                  y: -5,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
              >
                ✓ Passwords match
              </motion.small>
            )}

        </div>

        {/* TERMS */}
        <label className="terms-checkbox">

          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) =>
              setTermsAccepted(e.target.checked)
            }
          />

          <span className="custom-checkbox">
            {termsAccepted && <Check size={13} />}
          </span>

          <span>
            I agree to the{" "}
            <a href="#terms">
              Terms & Conditions
            </a>{" "}
            and{" "}
            <a href="#privacy">
              Privacy Policy
            </a>
          </span>

        </label>

        {/* REGISTER BUTTON */}
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

          <span>Create my account</span>

          <ArrowRight size={19} />

        </motion.button>

      </form>

      {/* ================= DIVIDER ================= */}
      <div className="divider">

        <span />

        <p>or continue with</p>

        <span />

      </div>

      {/* ================= SOCIAL ================= */}
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

      {/* ================= LOGIN ================= */}
      <p className="signup-text">

        Already have an account?

        <Link to="/auth/login">
          Login
          <ArrowRight size={15} />
        </Link>

      </p>

    </motion.div>
  );
}

export default Register;

