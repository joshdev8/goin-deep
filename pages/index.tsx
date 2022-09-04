import * as React from 'react';
import type { NextPage } from 'next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from 'src/components/Link';
import Image from 'next/image';
import YoutubeEmbed from 'src/components/Youtube/Embed';

import sampleData from 'content/sample.json';

const Home: NextPage = () => {
	console.log(sampleData);
	const { items } = sampleData;
	const itemList = items.map(item => {
		const {
			id,
			snippet: {
				title,
				thumbnails,
				description,
				publishedAt,
				resourceId: { videoId },
			},
		} = item;
		return (
			<Box key={id}>
				<Typography variant="h6" component="h2">
					{title}
				</Typography>
				<Typography variant="body1" component="p">
					{publishedAt}
				</Typography>
				<Box
					sx={{
						width: '100%',
						height: '100%',
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					{/* <img src={`${thumbnails.medium.url}`} alt="{title}" /> */}
					<YoutubeEmbed embedId={videoId} />
				</Box>
				<Typography variant="body1" component="p">
					{description}
				</Typography>
				<Link href={`https://www.youtube.com/watch?v=m-${videoId}`}>Watch</Link>
			</Box>
		);
	});

	return (
		<Container maxWidth="lg">
			<Box
				sx={{
					my: 4,
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Typography variant="h4" component="h1" gutterBottom>
					Goin Deep with Chad and JT
				</Typography>
				{itemList}
			</Box>
		</Container>
	);
};

export default Home;
