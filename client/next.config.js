/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['logos.covalenthq.com', 'covalenthq.com', 'image-proxy.svc.prod.covalenthq.com','ipfs.io','cloudflare-ipfs.com']
  }
}

module.exports = nextConfig
