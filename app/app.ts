// lib/app.ts
import express from 'express';
import cors from 'cors';
import path from 'path';
import {ProfileModel} from './model';

const app: express.Application = express();
const frontDir: string = path.resolve(__dirname, '..', 'front', 'build');

app.use(cors());
app.use(express.static(frontDir));

app.get('/q', async (req, res) => {
  const profiles = await ProfileModel.findByName(req.query.name);
  res.json({data: profiles});
});

app.get('/', (req, res) => res.sendFile(path.resolve(frontDir, 'index.html')));

app.listen(3200, function () {
  console.log('Example app listening on port 3200!');
});
