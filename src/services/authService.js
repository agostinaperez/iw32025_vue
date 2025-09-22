//este es mi mock API
export function loginAPI({ email, password }) {
  return new Promise((resolve, reject) => {
    // delay trucho para simular llamada a API
    setTimeout(() => {
      // expresion regular pa la validacion
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return reject({ message: 'Formato de email inválido' });
      }
      if (!password || password.length < 6) {
        return reject({ message: 'La contraseña debe tener al menos 6 caracteres' });
      }

      // si todo ok, devuelvo token y user
      const token = btoa(`${email}:${Date.now()}`); //es como la encriptacion q usaba posta en iw2
      const user = { email };

      resolve({ token, user });
    }, 900); // 900ms de delay para UX de carga
  });
}

export function verifyToken(token) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // si existe token lo doy x valido
      if (token) {
        // sacpo el email del token (q es un base64 trucho)
        try {
          const decoded = atob(token);
          const email = decoded.split(':')[0];
          resolve({ valid: true, user: { email } });
        } catch {
          resolve({ valid: false });
        }
      } else resolve({ valid: false }); // no token, no valido
    }, 400);
  });
}