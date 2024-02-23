function byteToSize(bytes) {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

  if (bytes === 0) {
    return "n/a";
  }

  const size = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);

  if (size === 0) {
    return `${bytes} ${sizes[size]})`;
  }

  return `${(bytes / 1024 ** size).toFixed(1)} ${sizes[size]}`;
}

export default byteToSize;
