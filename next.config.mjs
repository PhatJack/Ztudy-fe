/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			// https://res.cloudinary.com/study-together/image/upload/v1633660000/ztudy/1-1.png
			{
				protocol: "https",
				port: "",
				pathname: "/**",
				hostname: "res.cloudinary.com"
			},
			// https://study-together-static-prod.st-static.com/solo-thumbnails/1-1.png
			{
				protocol: "https",
				port: "",
				pathname: "/**",
				hostname: "study-together-static-prod.st-static.com"
			}
		]
	}
};

export default nextConfig;
