import { execSync } from 'child_process';

const processText=(text: string) =>{
  const command = `python ./src/python/speechToText.py "${text}" `;
  const result = execSync(command, { encoding: 'utf-8' });
  return "./test.wav";
}


export {processText};
