export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  try {
    const boundary = req.headers['content-type'].split('boundary=')[1];
    const body = req;

    const response = await fetch('https://0x0.st', {
      method: 'POST',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${boundary}`
      },
      body: body
    });

    const text = await response.text();

    if (text.startsWith('https://')) {
      res.status(200).json({ url: text.trim() });
    } else {
      res.status(400).json({ error: text });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}