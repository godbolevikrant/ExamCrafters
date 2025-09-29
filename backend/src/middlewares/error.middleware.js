export function notFound(req, res, _next) {
  res.status(404).json({ message: 'Not Found' });
}

export function errorHandler(err, _req, res, _next) {
  // eslint-disable-next-line no-console
  console.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
}


