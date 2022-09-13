/** @type {import('next').NextConfig} */

// import path module
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: ['i.ytimg.com'],
	},
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},
	webpack(config) {
		config.resolve.fallback = {
			...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
			// by next.js will be dropped. Doesn't make much sense, but how it is
			fs: false, // the solution
		};

		return config;
	},
};

module.exports = nextConfig;
