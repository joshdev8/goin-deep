import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PodList from 'src/components/Pod/PodList';
import { useQuery } from '@tanstack/react-query';
import { LinearProgress } from '@mui/material';
import { Pod } from 'src/types/types';

const Home = () => {
	const {
		data,
		isLoading,
		error,
	}: {
		error: Error | null;
		isLoading: boolean;
		data?: { items: Pod[] } | null;
	} = useQuery(
		['pod'],
		() =>
			fetch('https://goin-deep.s3.amazonaws.com/sample.json').then(res =>
				res.json()
			),
		{
			refetchOnWindowFocus: false,
		}
	);

	const markup = isLoading ? (
		<div>
			<div>Filling up the stoke tank...</div>
			<LinearProgress />
		</div>
	) : error ? (
		<div>Error: {error.message}</div>
	) : data && data.items ? (
		<PodList items={data.items} />
	) : null;

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
					Episode List
				</Typography>
				{markup}
			</Box>
		</Container>
	);
};

export default Home;
