import YouTube, { YouTubeProps } from 'react-youtube';

interface YoutubeEmbedProps {
	videoId: string;
}

const YoutubeEmbed = (props: YoutubeEmbedProps) => {
	const onPlayerReady: YouTubeProps['onReady'] = event => {
		// access to player in all event handlers via event.target
		event.target.pauseVideo();
	};
	const opts: YouTubeProps['opts'] = {
		height: '195',
		width: '320',
		playerVars: {
			// https://developers.google.com/youtube/player_parameters
			autoplay: 1,
		},
	};

	return (
		<YouTube videoId={props.videoId} opts={opts} onReady={onPlayerReady} />
	);
};

export default YoutubeEmbed;
