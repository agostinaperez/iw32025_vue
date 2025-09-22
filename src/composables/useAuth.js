//logica q puedo reutilizar, me maneja los estados del auth
import { reactive, readonly } from 'vue';
import { loginAPI, verifyToken } from '../services/authService';

const STORAGE_KEY = 'mi_app_auth_v1';

// estado interno
const state = reactive({
  token: null,
  user: null,
  loading: false
});

function saveToStorage() {
  const payload = { token: state.token, user: state.user };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

function clearStorage() {
  localStorage.removeItem(STORAGE_KEY);
}

export async function login({ email, password }) {
  state.loading = true;
  try {
    const res = await loginAPI({ email, password });
    state.token = res.token;
    state.user = res.user;
    saveToStorage();
    return { ok: true };
  } catch (err) {
    return { ok: false, message: err?.message || 'Error en login' };
  } finally {
    state.loading = false;
  }
}

export function logout() {
  state.token = null;
  state.user = null;
  clearStorage();
}

export function isAuthenticated() {
  return !!state.token;
}

export function getUser() {
  return readonly(state.user);
}

export function isLoading() {
  return state.loading;
}

// Restaurar estado desde localStorage (llamar en main.js antes de montar app)
export async function restoreSession() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return false;

  try {
    const { token } = JSON.parse(raw);
    if (!token) return false;

    // verificamos token en el mock
    const res = await verifyToken(token);
    if (res.valid) {
      state.token = token;
      state.user = res.user;
      return true;
    } else {
      clearStorage();
      return false;
    }
  } catch {
    clearStorage();
    return false;
  }
}

// Exportamos el estado (readonly para que fuera no lo modifique directamente)
export const authState = readonly(state);

export function useAuth() {
  return {
    state: authState,
    login,
    logout,
    isAuthenticated,
    getUser,
    isLoading
  };
}
