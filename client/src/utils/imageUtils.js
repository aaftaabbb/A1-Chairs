const optimizeImage = (url, w = 800) => {
  if (!url || typeof url !== 'string') return url;
  const marker = '/image/upload/';
  const idx = url.indexOf(marker);
  if (idx === -1) return url;
  const head = url.slice(0, idx + marker.length);
  const rest = url.slice(idx + marker.length);
  return `${head}f_auto,q_auto,w_${w},c_limit/${rest}`;
};

export default optimizeImage;