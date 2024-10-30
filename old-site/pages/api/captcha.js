import axios from 'axios';

export default async function captcha(req, res) {
  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        const value = req.body.data.response;
        const captchasec = process.env.CAPTCHA_KEY;
        const captchaSend = await axios.post(
          `https://www.google.com/recaptcha/api/siteverify?secret=${captchasec}&response=${value}`,
          {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          },
        );

        res
          .status(200)
          .json({ success: true, captcha: captchaSend.data.success });
      } catch (err) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
