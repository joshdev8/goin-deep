import { Box, Typography, Paper, Button } from '@mui/material';
import Image from 'next/image';

type Thumbnails = {
	url: string;
	width: number;
	height: number;
};

interface PodItemProps {
	id: string;
	title: string;
	description: string;
	publishedAt: string;
	videoId: string;
	thumbnails: {
		default: Thumbnails;
		medium: Thumbnails;
		high: Thumbnails;
		standard?: Thumbnails;
		maxres: Thumbnails;
	};
}

const PodItem = (props: PodItemProps) => {
	const { title, description, publishedAt, videoId, thumbnails, id } = props;

	const date = new Date(publishedAt);

	const formattedDate = date.toLocaleDateString('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	});

	// TODO: add a test for this
	// only return text before 'Get 20%' of description
	const truncatedDescription2 = description.slice(0, description.indexOf('Get 20%'));

	return (
		<Box key={id} sx={{ m: 2 }}>
			<Paper
				elevation={3}
				sx={{
					textAlign: 'center',
					color: 'text.secondary',
					width: '100%',
					height: '100%',
					p: 2,
				}}
			>
				<Typography variant="h6" component="h2">
					{title}
				</Typography>
				<Typography variant="body1" component="p">
					{formattedDate}
				</Typography>
				<Box
					sx={{
						width: '100%',
						height: '100%',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						my: 2,
					}}
				>
					<Image
						width={`${thumbnails?.high?.width || thumbnails.medium.width}`}
						height={`${thumbnails?.high?.height || thumbnails.medium.height}`}
						src={`${thumbnails?.high?.url || thumbnails.medium.url}`}
						alt={title}
					/>
					{/* <YoutubeEmbed videoId={videoId} /> */}
				</Box>
				<Typography variant="body1" component="p">
					{truncatedDescription2}
				</Typography>
				<Button
					target="_blank"
					rel="noopener noreferrer"
					href={`https://www.youtube.com/watch?v=${videoId}`}
					sx={{ my: 2 }}
					variant="contained"
				>
					Watch on Youtube
				</Button>
			</Paper>
		</Box>
	);
};

export default PodItem;
