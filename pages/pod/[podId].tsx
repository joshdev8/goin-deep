import { useRouter } from 'next/router';
import * as React from 'react';
import { getAllPodIds, getPodData } from 'src/helpers/pods';
import { Box, Typography, Paper, List, LinearProgress } from '@mui/material';
// import Highlighter from 'react-highlight-words';
import YoutubeEmbed from 'src/components/Youtube/Embed';
import Search from 'src/components/Search/Search';

interface Item {
	item: string;
}

// const fancyTimeFormat = (duration: number) => {
// 	// Hours, minutes and seconds
// 	const hrs = ~~(duration / 3600);
// 	const mins = ~~((duration % 3600) / 60);
// 	const secs = ~~duration % 60;

// 	// Output like "1:01" or "4:03:59" or "123:03:59"
// 	let ret = '';

// 	if (hrs > 0) {
// 		ret += '' + hrs + ':' + (mins < 10 ? '0' : '');
// 	}

// 	ret += '' + mins + ':' + (secs < 10 ? '0' : '');
// 	ret += '' + secs;
// 	return ret;
// };

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

	// const itemText = itemJson[0].map((snip: Snippet) => {
	// 	const { text, start } = snip;
	// 	const fancyTime = fancyTimeFormat(parseInt(start));
	// 	return (
	// 		<Box key={start}>
	// 			<Typography
	// 				sx={{ color: 'darkgray' }}
	// 				variant="subtitle1"
	// 				component="p"
	// 			>
	// 				{fancyTime}
	// 			</Typography>
	// 			<Typography variant="body1" component="p">
	// 				{text}
	// 			</Typography>
	// 		</Box>
	// 	);
	// });

	// React.useEffect(() => {
	// 	setTranscriptionText(getTranscription());
	// 	if (searchTerm && searchTerm.length > 0) {
	// 		const foundText = transcriptionText.match(searchTerm);
	// 		console.log(foundText);
	// 		setTranscriptionText(foundText);
	// 	}
	// }, [searchTerm])

	if (!item) {
		return <LinearProgress />;
	}

	return (
		<Box
			sx={{
				m: 3,
				p: 3,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				width: '100%',
			}}
		>
			<Box
				sx={{
					m: 4,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
				className="youtube-container"
			>
				{id && typeof id === 'string' && <YoutubeEmbed videoId={id} />}
			</Box>
			<Box sx={{ width: '100%' }}>
				<Paper elevation={3} sx={{ m: 4 }}>
					{/* <Highlighter
					searchWords={[searchTerm]}
					autoEscape={true}
					textToHighlight={searchTerm}
				/> */}
					<Box sx={{ p: 2 }}>
						<Search
							handleChange={handleSearch}
							handleClear={handleClear}
							searchTerm={searchTerm}
						/>
					</Box>
				</Paper>
			</Box>
			<Box>
				<Paper
					elevation={3}
					sx={{ width: '100%', maxHeight: 500, overflow: 'auto', p: 4, m: 2 }}
				>
					<List>
						<Typography variant="body1" component="p">
							{item}
						</Typography>
					</List>
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
	const textContent = jsonItem[0].map((snip: Snippet) => {
		const { text } = snip;
		return text;
	});

	return {
		props: {
			item: textContent,
		},
	};
}

export default SingleItemPage;
