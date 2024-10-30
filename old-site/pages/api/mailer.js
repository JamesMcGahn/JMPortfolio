import axios from 'axios';

export default async function mailer(req, res) {
  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        const value = req.body.data;
        const token = process.env.MAILER_TOKEN;
        const user = process.env.MAILER_USER;
        const service = process.env.MAILER_SERVICE;

        const mailerSend = await axios.post(
          'https://api.emailjs.com/api/v1.0/email/send',
          {
            service_id: `${service}`,
            template_id: 'template_5ubdfn4',
            user_id: `${user}`,
            accessToken: `${token}`,
            template_params: value,
          },
        );
        res.status(201).json({ success: true, mailer: mailerSend.status });
      } catch (err) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
