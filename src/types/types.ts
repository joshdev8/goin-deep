export interface Transcript {
	content: {
		[key: string]: {
			text: string;
			start: number;
			duration: number;
		};
	};
}

export interface PodData {
	data: {
		items: {
			id: string;
			snippet: {
				title: string;
				description: string;
				imageUrl: string;
				imageAlt: string;
				publishedAt: string;
				resourceId: { videoId: string };
				thumbnails: {
					default: {
						url: string;
						width: number;
						height: number;
					};
					medium: {
						url: string;
						width: number;
						height: number;
					};
					high: {
						url: string;
						width: number;
						height: number;
					};
					standard?: {
						url: string;
						width: number;
						height: number;
					};
					maxres: {
						url: string;
						width: number;
						height: number;
					};
				};
			};
		}[];
	};
}

export type Thumbnails = {
	url: string;
	width: number;
	height: number;
};

export interface Pod {
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
