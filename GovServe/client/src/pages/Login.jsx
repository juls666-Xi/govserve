import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0a0a0f;
    --surface: #111118;
    --border: rgba(255,255,255,0.07);
    --accent: #6c63ff;
    --accent2: #ff6584;
    --text: #f0f0f8;
    --muted: #6b6b80;
    --success: #4ade80;
    --error: #ff6b6b;
    --input-bg: rgba(255,255,255,0.04);
    --glow: rgba(108, 99, 255, 0.35);
  }

  body {
    background: var(--bg);
    font-family: 'DM Sans', sans-serif;
    color: var(--text);
    min-height: 100vh;
  }

  .login-root {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    background: var(--bg);
  }

  /* Ambient background orbs */
  .orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
    animation: drift 8s ease-in-out infinite;
  }
  .orb-1 {
    width: 420px; height: 420px;
    background: radial-gradient(circle, rgba(108,99,255,0.18) 0%, transparent 70%);
    top: -100px; left: -100px;
    animation-delay: 0s;
  }
  .orb-2 {
    width: 320px; height: 320px;
    background: radial-gradient(circle, rgba(255,101,132,0.14) 0%, transparent 70%);
    bottom: -80px; right: -80px;
    animation-delay: -4s;
  }
  .orb-3 {
    width: 200px; height: 200px;
    background: radial-gradient(circle, rgba(74,222,128,0.08) 0%, transparent 70%);
    top: 50%; right: 20%;
    animation-delay: -2s;
  }

  @keyframes drift {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(20px, -20px) scale(1.05); }
    66% { transform: translate(-15px, 15px) scale(0.97); }
  }

  /* Grid texture overlay */
  .grid-overlay {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
    background-size: 40px 40px;
    pointer-events: none;
  }

  /* Card */
  .card {
    position: relative;
    width: 440px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 24px;
    padding: 48px 44px;
    box-shadow:
      0 0 0 1px rgba(108,99,255,0.08),
      0 24px 64px rgba(0,0,0,0.5),
      inset 0 1px 0 rgba(255,255,255,0.06);
    animation: cardIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  @keyframes cardIn {
    from { opacity: 0; transform: translateY(24px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  /* Logo mark */
  .logo-wrap {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 36px;
    animation: fadeUp 0.5s 0.1s cubic-bezier(0.16,1,0.3,1) both;
  }
  .logo-icon {
    width: 36px; height: 36px;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 4px 16px var(--glow);
  }
  .logo-icon svg { width: 18px; height: 18px; }
  .logo-name {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 18px;
    letter-spacing: -0.3px;
  }
  .logo-badge {
    margin-left: auto;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--muted);
    background: var(--input-bg);
    border: 1px solid var(--border);
    padding: 3px 8px;
    border-radius: 20px;
  }

  /* Headings */
  .heading {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 28px;
    letter-spacing: -0.5px;
    line-height: 1.2;
    animation: fadeUp 0.5s 0.15s cubic-bezier(0.16,1,0.3,1) both;
  }
  .subheading {
    margin-top: 8px;
    font-size: 14px;
    color: var(--muted);
    font-weight: 300;
    line-height: 1.5;
    animation: fadeUp 0.5s 0.2s cubic-bezier(0.16,1,0.3,1) both;
  }

  /* Divider */
  .divider {
    width: 32px;
    height: 2px;
    background: linear-gradient(90deg, var(--accent), var(--accent2));
    border-radius: 2px;
    margin: 20px 0 28px;
    animation: fadeUp 0.5s 0.22s cubic-bezier(0.16,1,0.3,1) both;
  }

  /* Form */
  .form { display: flex; flex-direction: column; gap: 18px; }

  .field {
    display: flex;
    flex-direction: column;
    gap: 7px;
    animation: fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) both;
  }
  .field:nth-child(1) { animation-delay: 0.25s; }
  .field:nth-child(2) { animation-delay: 0.3s; }

  label {
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.6px;
    text-transform: uppercase;
    color: var(--muted);
  }

  .input-wrap {
    position: relative;
    display: flex;
    align-items: center;
  }

  .input-icon {
    position: absolute;
    left: 14px;
    color: var(--muted);
    pointer-events: none;
    transition: color 0.2s;
  }
  .input-icon svg { width: 16px; height: 16px; display: block; }

  input {
    width: 100%;
    background: var(--input-bg);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 13px 14px 13px 42px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14.5px;
    color: var(--text);
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
  }
  input::placeholder { color: var(--muted); }
  input:focus {
    border-color: rgba(108,99,255,0.5);
    background: rgba(108,99,255,0.06);
    box-shadow: 0 0 0 3px rgba(108,99,255,0.12);
  }
  input.error-input {
    border-color: rgba(255,107,107,0.5);
    box-shadow: 0 0 0 3px rgba(255,107,107,0.1);
  }

  .toggle-pw {
    position: absolute;
    right: 14px;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--muted);
    padding: 0;
    line-height: 0;
    transition: color 0.2s;
  }
  .toggle-pw:hover { color: var(--text); }
  .toggle-pw svg { width: 16px; height: 16px; }

  /* Error message */
  .error-msg {
    font-size: 12px;
    color: var(--error);
    display: flex;
    align-items: center;
    gap: 5px;
    animation: shake 0.35s ease;
  }
  @keyframes shake {
    0%,100% { transform: translateX(0); }
    20% { transform: translateX(-4px); }
    60% { transform: translateX(4px); }
  }

  /* Options row */
  .options-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: -4px;
    animation: fadeUp 0.5s 0.35s cubic-bezier(0.16,1,0.3,1) both;
  }
  .remember {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    font-size: 13px;
    color: var(--muted);
    user-select: none;
  }
  .remember input[type="checkbox"] {
    width: 16px; height: 16px;
    padding: 0;
    accent-color: var(--accent);
    cursor: pointer;
    border-radius: 4px;
  }
  .forgot {
    font-size: 13px;
    color: var(--accent);
    text-decoration: none;
    transition: opacity 0.2s;
  }
  .forgot:hover { opacity: 0.7; }

  /* Submit button */
  .btn-submit {
    margin-top: 6px;
    width: 100%;
    padding: 14px;
    background: linear-gradient(135deg, var(--accent) 0%, #8b5cf6 100%);
    border: none;
    border-radius: 12px;
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 15px;
    letter-spacing: 0.2px;
    color: #fff;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
    box-shadow: 0 4px 24px rgba(108,99,255,0.35);
    animation: fadeUp 0.5s 0.4s cubic-bezier(0.16,1,0.3,1) both;
  }
  .btn-submit::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
    opacity: 0;
    transition: opacity 0.2s;
  }
  .btn-submit:hover::after { opacity: 1; }
  .btn-submit:hover { transform: translateY(-1px); box-shadow: 0 8px 32px rgba(108,99,255,0.45); }
  .btn-submit:active { transform: translateY(0); }
  .btn-submit:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

  /* Spinner */
  .spinner {
    display: inline-block;
    width: 16px; height: 16px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    vertical-align: middle;
    margin-right: 8px;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* API error banner */
  .api-error {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    background: rgba(255,107,107,0.08);
    border: 1px solid rgba(255,107,107,0.2);
    border-radius: 10px;
    padding: 12px 14px;
    font-size: 13px;
    color: var(--error);
    animation: fadeUp 0.3s ease;
  }
  .api-error svg { width: 15px; height: 15px; flex-shrink: 0; margin-top: 1px; }

  /* Success banner */
  .success-banner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding: 24px 0;
    text-align: center;
    animation: fadeUp 0.4s ease;
  }
  .success-icon {
    width: 56px; height: 56px;
    background: rgba(74,222,128,0.12);
    border: 1px solid rgba(74,222,128,0.25);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    animation: popIn 0.4s cubic-bezier(0.16,1,0.3,1);
  }
  @keyframes popIn {
    from { transform: scale(0.5); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
  .success-icon svg { width: 26px; height: 26px; color: var(--success); }
  .success-title {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 20px;
  }
  .success-sub { font-size: 13px; color: var(--muted); }

  /* Separator */
  .sep {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 4px 0;
    animation: fadeUp 0.5s 0.42s cubic-bezier(0.16,1,0.3,1) both;
  }
  .sep-line { flex: 1; height: 1px; background: var(--border); }
  .sep-text { font-size: 12px; color: var(--muted); }

  /* OAuth buttons */
  .oauth-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    animation: fadeUp 0.5s 0.45s cubic-bezier(0.16,1,0.3,1) both;
  }
  .btn-oauth {
    display: flex; align-items: center; justify-content: center; gap: 8px;
    padding: 11px 14px;
    background: var(--input-bg);
    border: 1px solid var(--border);
    border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    color: var(--text);
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s, transform 0.15s;
  }
  .btn-oauth:hover { background: rgba(255,255,255,0.07); border-color: rgba(255,255,255,0.12); transform: translateY(-1px); }
  .btn-oauth svg { width: 16px; height: 16px; }

  /* Footer */
  .card-footer {
    margin-top: 24px;
    text-align: center;
    font-size: 13px;
    color: var(--muted);
    animation: fadeUp 0.5s 0.5s cubic-bezier(0.16,1,0.3,1) both;
  }
  .card-footer a { color: var(--accent); text-decoration: none; font-weight: 500; }
  .card-footer a:hover { text-decoration: underline; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 480px) {
    .card { width: 100%; margin: 16px; padding: 36px 28px; border-radius: 20px; }
  }
`;

const EyeIcon = ({ open }) =>
  open ? (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0110 0v4"/>
  </svg>
);

const AlertIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.email) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6) e.password = "Min 6 characters";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    if (apiError) setApiError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) return setErrors(errs);

    setLoading(true);
    setApiError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Invalid credentials. Please try again.");
      }

      if (remember) localStorage.setItem("rememberedEmail", form.email);
      setSuccess(true);
    } catch (err) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="login-root">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="grid-overlay" />

        <div className="card">
          <div className="logo-wrap">
            <div className="logo-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </svg>
            </div>
            <span className="logo-name">Portal</span>
            <span className="logo-badge">GovServe</span>
          </div>

          {success ? (
            <div className="success-banner">
              <div className="success-icon"><CheckIcon /></div>
              <p className="success-title">Welcome back!</p>
              <p className="success-sub">You've been signed in successfully.</p>
            </div>
          ) : (
            <>
              <h1 className="heading">Sign in</h1>
              <p className="subheading">Enter your credentials to access your account.</p>
              <div className="divider" />

              <form className="form" onSubmit={handleSubmit} noValidate>
                {apiError && (
                  <div className="api-error">
                    <AlertIcon />
                    <span>{apiError}</span>
                  </div>
                )}

                <div className="field">
                  <label htmlFor="email">Email</label>
                  <div className="input-wrap">
                    <span className="input-icon"><MailIcon /></span>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange}
                      className={errors.email ? "error-input" : ""}
                    />
                  </div>
                  {errors.email && (
                    <span className="error-msg"><AlertIcon /> {errors.email}</span>
                  )}
                </div>

                <div className="field">
                  <label htmlFor="password">Password</label>
                  <div className="input-wrap">
                    <span className="input-icon"><LockIcon /></span>
                    <input
                      id="password"
                      name="password"
                      type={showPw ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="••••••••"
                      value={form.password}
                      onChange={handleChange}
                      className={errors.password ? "error-input" : ""}
                    />
                    <button
                      type="button"
                      className="toggle-pw"
                      onClick={() => setShowPw((v) => !v)}
                      aria-label={showPw ? "Hide password" : "Show password"}
                    >
                      <EyeIcon open={showPw} />
                    </button>
                  </div>
                  {errors.password && (
                    <span className="error-msg"><AlertIcon /> {errors.password}</span>
                  )}
                </div>

                <div className="options-row">
                  <label className="remember">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                    />
                    Remember me
                  </label>
                  <a href="/forgot-password" className="forgot">Forgot password?</a>
                </div>

                <button type="submit" className="btn-submit" disabled={loading}>
                  {loading && <span className="spinner" />}
                  {loading ? "Signing in…" : "Sign In"}
                </button>

                <div className="sep">
                  <div className="sep-line" /><span className="sep-text">or continue with</span><div className="sep-line" />
                </div>

                <div className="oauth-row">
                  <button type="button" className="btn-oauth">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Google
                  </button>
                  <button type="button" className="btn-oauth">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </button>
                </div>
              </form>
            </>
          )}

          <p className="card-footer">
            Don't have an account? <a href="/register">Create one</a>
          </p>
        </div>
      </div>
    </>
  );
}
