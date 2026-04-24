import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';

const spring = { type: 'spring', stiffness: 280, damping: 22 };
const defaultLogin = { email: '', password: '' };
const defaultSignup = { fullName: '', email: '', password: '', confirmPassword: '' };

function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');
  const [loginForm, setLoginForm] = useState(defaultLogin);
  const [signupForm, setSignupForm] = useState(defaultSignup);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const activeForm = mode === 'login' ? loginForm : signupForm;

  const setField = (field, value) => {
    if (mode === 'login') {
      setLoginForm((current) => ({ ...current, [field]: value }));
      return;
    }
    setSignupForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!activeForm.email || !activeForm.password) {
      setError('Please complete the required fields.');
      return;
    }
    if (mode === 'signup' && signupForm.password !== signupForm.confirmPassword) {
      setError('Passwords must match.');
      return;
    }

    setError('');
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setLoading(false);
    setSuccess(true);
    setTimeout(() => navigate('/shop'), 1500);
  };

  return (
    <motion.main className="login-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <AnimatePresence>
        {success && (
          <motion.div className="success-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="success-card" initial={{ scale: 0.92 }} animate={{ scale: 1 }} transition={spring}>
              <svg viewBox="0 0 120 120" className="success-check" role="presentation">
                <motion.circle
                  cx="60"
                  cy="60"
                  r="42"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8 }}
                />
                <motion.path
                  d="M40 62l14 14 28-32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.7, delay: 0.35 }}
                />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="login-layout">
        <motion.div
          className="login-visual"
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="login-visual-copy">
            <h1>Wear the difference. Every single day.</h1>
          </div>
          <motion.div className="floating-fruit apple-shape" animate={{ y: [0, -18, 0] }} transition={{ duration: 7, repeat: Infinity }} />
          <motion.div className="floating-fruit peach-shape" animate={{ y: [0, 16, 0] }} transition={{ duration: 8, repeat: Infinity }} />
        </motion.div>

        <motion.div
          className="login-form-panel"
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.form
            className="auth-card"
            onSubmit={handleSubmit}
            animate={error ? { x: [0, -10, 10, -6, 6, 0] } : { x: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div className="auth-logo-wrap">
              <Logo />
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                className="auth-fields"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
              >
                {mode === 'signup' && (
                  <label>
                    <span>Full Name</span>
                    <motion.input
                      value={signupForm.fullName}
                      onChange={(event) => setField('fullName', event.target.value)}
                      placeholder="Ava Orchard"
                      whileFocus={{ borderColor: 'var(--peach)' }}
                    />
                  </label>
                )}
                <label>
                  <span>Email</span>
                  <motion.input
                    type="email"
                    value={activeForm.email}
                    onChange={(event) => setField('email', event.target.value)}
                    placeholder="you@example.com"
                    whileFocus={{ borderColor: 'var(--peach)' }}
                  />
                </label>
                <label>
                  <span>Password</span>
                  <motion.input
                    type="password"
                    value={activeForm.password}
                    onChange={(event) => setField('password', event.target.value)}
                    placeholder="Enter your password"
                    whileFocus={{ borderColor: 'var(--peach)' }}
                  />
                </label>
                {mode === 'signup' && (
                  <label>
                    <span>Confirm Password</span>
                    <motion.input
                      type="password"
                      value={signupForm.confirmPassword}
                      onChange={(event) => setField('confirmPassword', event.target.value)}
                      placeholder="Confirm your password"
                      whileFocus={{ borderColor: 'var(--peach)' }}
                    />
                  </label>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="auth-row">
              <label className="checkbox-row">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <button type="button" className="inline-link">
                Forgot password?
              </button>
            </div>

            {error && <p className="form-error">{error}</p>}

            <motion.button
              type="submit"
              className="primary-button full-width"
              whileHover={{ scale: 0.97 }}
              whileTap={{ scale: 0.95 }}
              transition={spring}
            >
              {loading ? <span className="spinner" /> : mode === 'login' ? 'Login' : 'Sign Up'}
            </motion.button>

            <div className="social-buttons">
              <button type="button" className="social-button">Continue with Google</button>
              <button type="button" className="social-button">Continue with Apple</button>
            </div>

            <p className="switch-copy">
              {mode === 'login' ? 'Need an account?' : 'Already have an account?'}
              <button
                type="button"
                className="inline-link"
                onClick={() => {
                  setMode((current) => (current === 'login' ? 'signup' : 'login'));
                  setError('');
                }}
              >
                {mode === 'login' ? 'Sign up' : 'Log in'}
              </button>
            </p>
          </motion.form>
        </motion.div>
      </section>
    </motion.main>
  );
}

export default LoginPage;
