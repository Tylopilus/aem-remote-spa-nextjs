/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 *
 */

const { DOMParser } = require('@xmldom/xmldom');

export default async function handler(req, res) {
  let { path } = req.query;

  console.log(process.env.NODE_ENV);
  const url =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  console.log(url);
  const pageRes = await fetch(url + (path || ''));
  const pageText = await pageRes.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(pageText, 'text/html');
  const nextPropsContent = doc.getElementById('__NEXT_DATA__').textContent;
  let data = {};
  try {
    data = JSON.parse(nextPropsContent);
  } catch (e) {
    // return empty object
  }
  res.status(200).json(data);
}
