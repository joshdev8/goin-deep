import fs from 'fs';
import path from 'path';

const PODS_DIR = 'content';
const PODS_DIRECTORY = path.join(process.cwd(), 'public', PODS_DIR);

const getDirectories = (source: fs.PathLike) =>
	fs
		.readdirSync(source, { withFileTypes: true })
		.filter(dirent => dirent.isDirectory())
		.map(dirent => dirent.name);

export const getAllPodIds = () => {
	const podIds = getDirectories(PODS_DIRECTORY);
	console.log('podIds', podIds);
	return podIds;
};

export const getAllPaths = () => {
	const podIds = getAllPodIds();
	console.log('podIds: ', podIds);
	if (podIds && podIds.length > 0) {
		const allPods = podIds.map(pod => {
			return PODS_DIRECTORY + '/' + pod + '.json';
		});
		return allPods;
	}
};

export const getPodData = (podId: string) => {
	const fullPodDirectory = PODS_DIRECTORY + '/' + podId + '.json';
	console.log('fileContents', fullPodDirectory);
	const fileContents = fs.readFileSync(fullPodDirectory, 'utf8');
	return fileContents;
};
