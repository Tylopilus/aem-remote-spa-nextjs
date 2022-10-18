export function getBasicAuth() {
  return Buffer.from(
    `${process.env.AUTH_NAME}:${process.env.AUTH_PASSWORD}`,
    'utf8'
  ).toString('base64');
}
