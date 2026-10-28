import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import { LogOut, ShieldCheck, User } from 'lucide-react';
import { loginSuccess, logout } from '../../redux/slices/authSlice';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID?.trim();

const parseJwt = (token) => {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(decodeURIComponent(atob(base64).split('').map((char) => (
      `%${('00' + char.charCodeAt(0).toString(16)).slice(-2)}`
    )).join('')));
  } catch {
    return null;
  }
};

const loadGoogleScript = (onLoaded) => {
  if (window.google?.accounts?.id) {
    onLoaded();
    return;
  }

  const existingScript = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
  if (existingScript) {
    existingScript.addEventListener('load', onLoaded, { once: true });
    return;
  }

  const script = document.createElement('script');
  script.src = 'https://accounts.google.com/gsi/client';
  script.async = true;
  script.defer = true;
  script.onload = onLoaded;
  document.head.appendChild(script);
};

const GoogleLoginBtn = () => {
  const dispatch = useDispatch();
  const buttonRef = useRef(null);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [googleError, setGoogleError] = useState(false);

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID || isAuthenticated || !buttonRef.current) return undefined;

    loadGoogleScript(() => {
      if (!window.google?.accounts?.id || !buttonRef.current) {
        setGoogleError(true);
        return;
      }

      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: ({ credential }) => {
          const profile = credential ? parseJwt(credential) : null;
          if (!profile?.sub || !profile.email) {
            setGoogleError(true);
            return;
          }

          dispatch(loginSuccess({
            id: profile.sub,
            name: profile.name || 'Google User',
            email: profile.email,
            picture: profile.picture || null,
          }));
        },
      });

      window.google.accounts.id.renderButton(buttonRef.current, {
        type: 'icon',
        theme: 'outline',
        size: 'medium',
        shape: 'circle',
      });
    });

    return undefined;
  }, [dispatch, isAuthenticated]);

  if (isAuthenticated && user) {
    return (
      <Dropdown align="end">
        <Dropdown.Toggle variant="transparent" className="d-flex align-items-center gap-2 p-1 border-0 shadow-none">
          {user.picture ? (
            <img src={user.picture} alt={user.name} className="rounded-circle" style={{ width: 32, height: 32, objectFit: 'cover' }} />
          ) : <User size={20} />}
          <span className="d-none d-md-inline small">{user.name.split(' ')[0]}</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Header>
            <div className="fw-bold">{user.name}</div>
            <small>{user.email}</small>
            <div className="mt-1 text-success small"><ShieldCheck size={13} className="me-1" />Curator Admin</div>
          </Dropdown.Header>
          <Dropdown.Divider />
          <Dropdown.Item onClick={() => dispatch(logout())} className="text-danger">
            <LogOut size={15} className="me-2" />Sign Out
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  if (!GOOGLE_CLIENT_ID || googleError) return null;
  return <div ref={buttonRef} className="google-auth-container" aria-label="Sign in with Google" />;
};

export default GoogleLoginBtn;
