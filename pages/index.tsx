import * as React from 'react';
import type { NextPage } from 'next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from 'src/components/Link';

const Home: NextPage = () => {
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
				<Link href="/about" color="secondary">
					Go to the about page
				</Link>
			</Box>
		</Container>
	);
};

export default Home;
