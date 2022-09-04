// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { exec } from 'child_process';

type Data = {
	name: string;
};

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
// const { videoIds } = req.body;
console.log(res);

// call youtube_transcript_api to get the transcript for all videoIds

exec(
	'youtube_transcript_api m-fCxv9cpYA --languages en --format text',
	(error, stdout, stderr) => {
		if (error) {
			console.log(`error: ${error.message}`);
			return;
		}
		if (stderr) {
			console.log(`stderr: ${stderr}`);
			return;
		}
		console.log(`stdout: ${stdout}`);
		return stdout;
	}
);
}
