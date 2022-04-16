const withAntdLess = require("next-plugin-antd-less");

/** @type {import('next').NextConfig} */
const nextConfig = withAntdLess(
  {
    reactStrictMode: false,

    images: { loader: "custom" },

    webpack: (config, { isServer }) => {
      const rules = config.module.rules
      rules.push({
        test: /components\/Header\.tsx$/,
        loader: "string-replace-loader",
        options: {
          search: '"IS_TESTNET"',
          //replace: (git_branch === "ref: refs/heads/trial").toString(),
        },
      });

      return config;
      
    },

  }
)

module.exports = nextConfig
