const withAntdLess = require("next-plugin-antd-less");

/** @type {import('next').NextConfig} */
const nextConfig = withAntdLess(
  {
    reactStrictMode: false,

    /**
     * From Static structure: /about.html
     * To Static structure: /about/index.html
     *
     * But this also make all client url end with a `/`, so we will turn it off
     * https://nextjs.org/docs/api-reference/next.config.js/exportPathMap#adding-a-trailing-slash
     */
    // trailingSlash: false,

    // images: { loader: "custom" },
    images: { 
      loader: "imgix",
      path: "",
    },

    // sassOptions: {
    //   includePaths: [path.join(__dirname, 'styles')],
    // },

    /**
     * Custom webpack config
     * https://nextjs.org/docs/api-reference/next.config.js/custom-webpack-config
     */
    webpack: (config, { isServer }) => {
      const rules = config.module.rules;

      inject_git_commit_id_to_page(rules)

      return config;
    },

  }
)


function inject_git_commit_id_to_page(rules) {
  /**
   * Inject git commit id into debug page
   */
  const git_commit_id = require("child_process")
    .execSync("git rev-parse --short HEAD")
    .toString()
    .trim();
  const stringReplaceLoaderRule = {
    test: /pages\/lucis-debug\/index\.tsx$/,
    loader: "string-replace-loader",
    options: {
      search: "LUCIS_VERSION_COMMIT_ID",
      replace: git_commit_id,
    },
  };
  rules.push(stringReplaceLoaderRule);
}

function show_testnet_text_on_header(rules) {
  /**
   * Show testnet text on the header
   */
  const git_branch = require("child_process")
    .execSync("cat .git/HEAD")
    // .execSync('git branch --show-current')
    .toString()
    .trim();
  rules.push({
    test: /components\/ui\/header\/Header\.tsx$/,
    loader: "string-replace-loader",
    options: {
      search: '"IS_TESTNET"',
      replace: (git_branch === "ref: refs/heads/trial").toString(),
    },
  });
}

module.exports = nextConfig
