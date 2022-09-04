import React from 'react';
import { Box } from '@mui/material';

interface YoutubeProps {
	embedId: string;
}

const YoutubeEmbed = (props: YoutubeProps) => (
	<Box
		className="video-responsive"
		sx={{
			overflow: 'hidden',
			pb: '56.25%',
			position: 'relative',
			height: 0,
			'& iframe, & object, & embed': {
				left: 0,
				top: 0,
				height: '100%',
				width: '100%',
				position: 'absolute',
			},
		}}
	>
		<iframe
			width="853"
			height="480"
			src={`https://www.youtube.com/embed/${props.embedId}`}
			frameBorder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowFullScreen
			title="Embedded youtube"
		/>
	</Box>
);

export default YoutubeEmbed;
