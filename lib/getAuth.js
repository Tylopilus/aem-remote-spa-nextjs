export function getBasicAuth() {
  return Buffer.from(
    `${process.env.USER_NAME}:${process.env.USER_PASSWORD}`,
    'utf8'
  ).toString('base64');
}
