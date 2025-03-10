/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				port: "",
				pathname: "/**",
				hostname: "res.cloudinary.com"
			}
		]
	}
};

export default nextConfig;
