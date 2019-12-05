// lib/app.ts
import express from 'express';
import cors from 'cors';
import path from 'path';
import { spawn } from 'child_process';
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

const loadProfiles = function (): void {
  // console.log(__dirname, 'SPAWN');
  const cp = spawn('node', [path.resolve(__dirname, '..', 'scripts', 'load_profiles.js')]);

  cp.stdout.on('data', data => console.log(`Spawn data: ${data}`))
  cp.stderr.on('data', data => console.log(`Spawn error1: ${data}`))
  cp.on('close', code => console.log(`Spawn close ${code}`))
  cp.on('error', err => console.log('Spawn error2: ', err))

  setTimeout(loadProfiles, 60 * 1000)
};

loadProfiles();
