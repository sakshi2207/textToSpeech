import express,{Request,Response} from "express";
import { Transform } from 'stream';
import cors from "cors";
import bodyParser from "body-parser";
import fs from 'fs';
import {processText} from "./utils/helper"

const app = express();
const PORT = 8000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/convert', async (req: Request, res: Response) => {
  // let text = req.query.text as string;
  // console.log("text",text);
  //   if(!text ) return res.status(500).send({error:"Text cannot be empty"});
  //   let inputs = processText(text)
  //   console.log("text",inputs);
    // const transformStream = new Transform({
    //   transform(chunk, encoding, callback) {
    //     callback(null, JSON.stringify(chunk));
    //   },
    // });
    // inputs.pipe(transformStream).pipe(res);
    const audioFilePath = './src/utils/test.wav';

    const audioStream = fs.createReadStream(audioFilePath);

    res.setHeader('Content-Type', 'audio/wav');
    res.setHeader('Content-Disposition', 'attachment; filename="audio.wav"');
    res.set('Content-Type', 'application/json');

    audioStream.pipe(res);
  });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



