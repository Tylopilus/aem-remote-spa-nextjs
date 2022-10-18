export function getBasicAuth() {
  return Buffer.from(
    `${process.env.AUTH_NAME}:${process.env.AUTH_NAME}`,
    'utf8'
  ).toString('base64');
}
