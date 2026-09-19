export function setCookie(res, name, value, opts = {}) {
  const parts = [`${name}=${encodeURIComponent(value)}`];
  parts.push('Path=' + (opts.path || '/'));
  parts.push('Max-Age=' + (opts.maxAge != null ? opts.maxAge : 60 * 60 * 24 * 30));
  parts.push('SameSite=' + (opts.sameSite || 'Lax'));
  if (opts.httpOnly !== false) parts.push('HttpOnly');
  if (opts.secure !== false) parts.push('Secure');
  const cookieStr = parts.join('; ');
  const prev = res.getHeader('Set-Cookie');
  if (prev) {
    res.setHeader('Set-Cookie', Array.isArray(prev) ? [...prev, cookieStr] : [prev, cookieStr]);
  } else {
    res.setHeader('Set-Cookie', cookieStr);
  }
}

export function clearCookie(res, name) {
  res.setHeader('Set-Cookie', `${name}=; Path=/; Max-Age=0`);
}

export function parseCookies(req) {
  const header = req.headers.cookie;
  const out = {};
  if (!header) return out;
  header.split(';').forEach((pair) => {
    const idx = pair.indexOf('=');
    if (idx === -1) return;
    const k = pair.slice(0, idx).trim();
    const v = pair.slice(idx + 1).trim();
    out[k] = decodeURIComponent(v);
  });
  return out;
}
