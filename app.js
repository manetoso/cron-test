import express from 'express';
import cron from 'node-cron';
import cors from 'cors';
import {
  getGithubCount,
  getInstagramCount,
  getLinkedInCount,
  getTwitterCount,
} from './utils/scrapper';

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3005;

app.get('/social-media', async (req, res) => {
  const iCount = await getInstagramCount();
  const tCount = await getTwitterCount();
  const gCount = await getGithubCount();
  const lCount = await getLinkedInCount();
  res.status(200).json({
    Instagram: iCount,
    Twitter: tCount,
    Github: gCount,
    LinkedIn: lcount,
  });
});

app.all('*', function (_req, res) {
  return res.status(404).json({
    message: 'Page not found!',
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT} 🚀`);
});

cron.schedule('0 * * * * *', () => {
  const today = new Date();
  const minutes = today.getMinutes();
  const hours = today.getHours();
  console.log(
    `Running cron job at ${hours > 12 ? hours - 12 : hours}:${minutes} ${
      hours > 12 ? 'PM' : 'AM'
    }`
  );
});
