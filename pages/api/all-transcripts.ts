// // make call to s3 bucket and return all transcripts

// import { NextApiRequest, NextApiResponse } from 'next'
// import { S3Client, ListObjectsCommand } from "@aws-sdk/client-s3";
// import { config } from "dotenv";
// import { Transcript } from 'src/types/types';

// type data = {
// 	transcripts: Transcript[]
// }

// export default async function handler(req: NextApiRequest, res: NextApiResponse<data>) {
// 	config();
// 	const { BUCKET_NAME, AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env;

// 	const s3Client = new S3Client({
// 		region: AWS_REGION,
// 		credentials: {
// 			accessKeyId: AWS_ACCESS_KEY_ID,
// 			secretAccessKey: AWS_SECRET_ACCESS_KEY
// 		}
// 	});

// 	const params = {
// 		Bucket: BUCKET_NAME,
// 		Prefix: 'transcripts'
// 	};

// 	const command = new ListObjectsCommand(params);
// 	const response = await s3Client.send(command);
// 	if (response && response.Contents) {
// 		const transcripts: Transcript[] = response.Contents.map((transcript: Transcript) => {
// 		return {
// 			key: transcript.Key,
// 			lastModified: transcript.LastModified
// 		}
// 	}
// 	res.status(200).json({ transcripts })
// }
