/** @type {import('next').NextConfig} */
import bundleAnalyzer  from '@next/bundle-analyzer'
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				port: "",
				pathname: "/**",
				hostname: "res.cloudinary.com",
			},
			{
				protocol: "https",
				port: "",
				pathname: "/**",
				hostname: "study-together-static-prod.st-static.com",
			},
			{
				protocol: "https",
				port: "",
				pathname: "/**",
				hostname: "img.youtube.com",
			},
		],
	},
};

const withBundleAnalyzer = bundleAnalyzer({
	enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer(nextConfig);