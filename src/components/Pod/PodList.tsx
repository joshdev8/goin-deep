import React, { useEffect, useMemo } from 'react';
import { Box } from '@mui/material';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import PodItem from 'src/components/Pod/PodItem';
import Link from 'src/components/Link';
import Search from 'src/components/Search/Search';
import { Transcript, Pod } from 'src/types/types';
import { fancyTimeFormat } from 'src/helpers/time';
// import { useQuery } from '@tanstack/react-query';
import Typography from '@mui/material/Typography';

interface Props {
	items: Pod[];
}

const PodList = ({ items }: Props) => {
	const [searchTerm, setSearchTerm] = React.useState('');
	const [filteredItems, setFilteredItems] = React.useState<Pod[]>(items);
	const [allPodData, setAllPodData] = React.useState<Transcript[]>([]);
	const [filteredTextFound, setFilteredTextFound] = React.useState<[]>([]);

	const handleClear = () => {
		setSearchTerm('');
		setFilteredItems(items);
		setFilteredTextFound([]);
	};

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.value === '') {
			setFilteredItems(items);
			setFilteredTextFound([]);
			setSearchTerm('');
		} else {
			setSearchTerm(event.target.value);
		}
	};

	// const {
	// 	data,
	// 	isLoading,
	// 	error,
	// }: {
	// 	error: Error | null;
	// 	isLoading: boolean;
	// 	data?: { body: Transcript[] } | null;
	// } = useQuery(
	// 	['transcripts'],
	// 	async () =>
	// 		await fetch(
	// 			'https://goin-deep.s3.amazonaws.com/all-transcripts.json'
	// 		).then(res => res),
	// 	{
	// 		refetchOnWindowFocus: false,
	// 		cacheTime: 0,
	// 	}
	// );

	const fetchAllPodDataa = async () => {
		const data = await fetch(
			'https://goin-deep.s3.amazonaws.com/all-transcripts.json'
		).then(res => res.json());
		return data;
	};

	useEffect(() => {
		fetchAllPodDataa().then(data => {
			setAllPodData(data);
		});
	}, []);

	const allPodDataMap = useMemo(() => {
		return allPodData.map(pod => {
			for (const [key, value] of Object.entries(pod)) {
				const { content } = value;
				const videoId = key;
				return { videoId, content };
			}
		});
	}, [allPodData]);

	// TODO: move this into a testable helper
	useEffect(() => {
		if (
			searchTerm &&
			searchTerm.length > 2 &&
			allPodDataMap &&
			allPodDataMap.length > 0
		) {
			// filter allPodDataMap array for item that has content.text that includes searchTerm and return text value
			const textContentFound = allPodDataMap.filter(pod => {
				const { content, videoId: vidId } = pod;
				const filteredContent = content.filter(item => {
					const { text } = item;
					return text.toLowerCase().includes(searchTerm.toLowerCase());
				});
				if (filteredContent.length > 0) {
					setFilteredTextFound({ vidId, filteredContent });
					return filteredContent;
				}
			});

			// filter items array for item that has videoId that matches filteredPodData.videoId
			const filteredItems = items.filter(item => {
				const {
					snippet: {
						resourceId: { videoId },
					},
				} = item;
				const filteredPodData = textContentFound.filter(pod => {
					const { videoId: podVideoId } = pod;
					return videoId === podVideoId;
				});
				return filteredPodData.length > 0;
			});
			setFilteredItems(filteredItems);
		} else {
			setFilteredItems(items);
		}
	}, [searchTerm, items, allPodData, allPodDataMap]);

	const { vidId, filteredContent } = filteredTextFound;
	const searchResults =
		filteredContent && filteredContent.length > 0 ? (
			<Box>
				<ul>
					{filteredContent.map((item, index) => {
						const { text, start } = item;
						return (
							<Box key={index}>
								<li>VideoId: {vidId}</li>
								<Typography variant="subtitle2">Text: {text}</Typography>
								<li>Time: {fancyTimeFormat(start)}</li>
							</Box>
						);
					})}
				</ul>
			</Box>
		) : null;

	return (
		<Box
			sx={{
				m: 2,
				mx: 1,
				width: '100%',
				height: '100%',
			}}
			className="outer-list"
		>
			{/* {error && <div>Something went wrong: {error.message}</div>} */}
			<Box className="search-container" sx={{ width: '100%' }}>
				<Search
					placeholderText="SEARCH"
					handleSearchChange={handleSearchChange}
					handleClear={handleClear}
					searchTerm={searchTerm}
				/>
				<Box>{searchResults}</Box>
			</Box>
			{filteredItems.length > 0 ? (
				<Box className="list-container" sx={{ height: '100%', width: '100%' }}>
					<AutoSizer>
						{({ height, width }: { height: number; width: number }) => {
							return (
								<List
									height={height}
									itemCount={filteredItems.length}
									itemSize={600}
									width={width}
									className="pod-list-items"
								>
									{({
										index,
										style,
									}: {
										index: number;
										style: React.CSSProperties | undefined;
									}) => (
										<div
											style={style}
											key={filteredItems[index].snippet.resourceId.videoId}
										>
											<Link
												href={{
													pathname: '/pod/[podId]',
													query: {
														podId:
															filteredItems[index].snippet.resourceId.videoId,
													},
												}}
												passHref
												sx={{ width: '100%' }}
												underline="none"
											>
												<PodItem
													id={filteredItems[index].id}
													title={filteredItems[index].snippet.title}
													description={filteredItems[index].snippet.description}
													publishedAt={filteredItems[index].snippet.publishedAt}
													videoId={
														filteredItems[index].snippet.resourceId.videoId
													}
													thumbnails={filteredItems[index].snippet.thumbnails}
												/>
											</Link>
										</div>
									)}
								</List>
							);
						}}
					</AutoSizer>
				</Box>
			) : (
				<Box sx={{ textAlign: 'center', m: 2 }}>No items found</Box>
			)}
		</Box>
	);
};

export default PodList;
