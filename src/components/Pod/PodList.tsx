import { Box } from '@mui/material';
import PodItem from 'src/components/Pod/PodItem';

type Thumbnails = {
	url: string;
	width: number;
	height: number;
};

interface PodItem {
	id: string;
	snippet: {
		title: string;
		description: string;
		publishedAt: string;
		resourceId: { videoId: string };
		thumbnails: {
			default: Thumbnails;
			medium: Thumbnails;
			high: Thumbnails;
			standard?: Thumbnails;
			maxres: Thumbnails;
		};
	};
}

interface PodListProps {
	items: PodItem[];
}

const PodList = (props: PodListProps) => {
	const { items } = props;

	return (
		<Box sx={{ m: 2 }}>
			{items.map((item: PodItem) => {
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
					<PodItem
						key={id}
						id={id}
						title={title}
						description={description}
						publishedAt={publishedAt}
						videoId={videoId}
						thumbnails={thumbnails}
					/>
				);
			})}
		</Box>
	);
};

export default PodList;
