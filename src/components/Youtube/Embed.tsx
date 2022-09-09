import YouTube, { YouTubeProps } from 'react-youtube';
import { isMobile } from 'react-device-detect';

interface YoutubeEmbedProps {
	videoId: string;
}

const YoutubeEmbed = (props: YoutubeEmbedProps) => {
	const onPlayerReady: YouTubeProps['onReady'] = event => {
		// access to player in all event handlers via event.target
		event.target.pauseVideo();
	};
	const opts: YouTubeProps['opts'] = {
		height: isMobile ? '195' : '390',
		width: isMobile ? '320' : '640',
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
