import { useRouter } from 'next/router';
import * as React from 'react';
import { getAllPodIds, getPodData } from 'src/helpers/pods';
import { Box, Typography, Paper, LinearProgress } from '@mui/material';
// import Highlighter from 'react-highlight-words';
import YoutubeEmbed from 'src/components/Youtube/Embed';
import Search from 'src/components/Search/Search';

interface Item {
	item: string;
}

interface Snippet {
	text: string;
	start: string;
}

const SingleItemPage = ({ item }: Item) => {
	const router = useRouter();
	const id = router.query.podId;

	const [searchTerm, setSearchTerm] = React.useState('');

	const handleClear = () => setSearchTerm('');

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	if (!item) {
		return <LinearProgress />;
	}

	return (
		<Box
			sx={{
				mx: 3,
				px: 3,
				py: 2,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				width: '100%',
			}}
		>
			<Box
				sx={{
					mx: 6,
					px: 3,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
				className="youtube-container"
			>
				{id && typeof id === 'string' && <YoutubeEmbed videoId={id} />}
			</Box>
			<Box sx={{ width: '100%' }}>
				<Paper elevation={4} sx={{ mx: 6, p: 1 }}>
					<Search
						handleSearchChange={handleSearch}
						handleClear={handleClear}
						searchTerm={searchTerm}
					/>
				</Paper>
			</Box>
			<Box sx={{ px: 4, mx: 2 }}>
				<Paper
					elevation={4}
					sx={{ width: '100%', maxHeight: 380, overflow: 'auto', p: 4, my: 3 }}
				>
					<Typography variant="body1" component="p">
						{item}
					</Typography>
				</Paper>
			</Box>
		</Box>
	);
};

export async function getStaticPaths() {
	const paths = getAllPodIds();

	return {
		paths,
		fallback: true,
	};
}

export async function getStaticProps({
	params,
}: {
	params: { podId: string };
}) {
	const itemString = getPodData(params.podId);
	const jsonItem = JSON.parse(itemString);
	let transcriptString = '';
	jsonItem[0].forEach((snip: Snippet) => {
		const { text } = snip;
		transcriptString += ' ' + text;
	});

	return {
		props: {
			item: transcriptString,
		},
	};
}

export default SingleItemPage;
