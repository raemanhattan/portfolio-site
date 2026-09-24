import type { NextConfig } from "next";

// Each project keeps its own repo, frontend, and deploy target. This shell
// owns the domain and rewrites a project's path to that project's own
// deployment, so it's never aware it's being embedded here.
const CONTRACT_VALUE_ORIGIN =
  process.env.CONTRACT_VALUE_ORIGIN ?? "http://localhost:3001";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // contract-value-agent's frontend runs with NEXT_PUBLIC_BASE_PATH=
      // /contract-value, so its own page and asset URLs already carry the
      // prefix — pass the path through unchanged rather than stripping it.
      {
        source: "/contract-value",
        destination: `${CONTRACT_VALUE_ORIGIN}/contract-value`,
      },
      {
        source: "/contract-value/:path*",
        destination: `${CONTRACT_VALUE_ORIGIN}/contract-value/:path*`,
      },
    ];
  },
};

export default nextConfig;
