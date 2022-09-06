import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PodList from 'src/components/Pod/PodList';

import sampleData from 'public/content/sample.json';

interface PodData {
	data: {
		items: {
			id: string;
			snippet: {
				title: string;
				description: string;
				imageUrl: string;
				imageAlt: string;
				publishedAt: string;
				resourceId: { videoId: string };
				thumbnails: {
					default: {
						url: string;
						width: number;
						height: number;
					};
					medium: {
						url: string;
						width: number;
						height: number;
					};
					high: {
						url: string;
						width: number;
						height: number;
					};
					standard?: {
						url: string;
						width: number;
						height: number;
					};
					maxres: {
						url: string;
						width: number;
						height: number;
					};
				};
			};
		}[];
	};
}

const Home = (props: PodData) => {
	const {
		data: { items },
	} = props;
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
				<PodList items={items} />
			</Box>
		</Container>
	);
};

export default Home;

export async function getStaticProps() {
	return {
		props: { data: sampleData }, // will be passed to the page component as props
	};
}
