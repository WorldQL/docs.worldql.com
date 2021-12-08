// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {any} */
const npm2yarn = require('@docusaurus/remark-plugin-npm2yarn');
const codetabs = require('docusaurus-remark-plugin-codetabs');

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'WorldQL Docs',
    tagline: 'Real-time spatial database and message broker built for games',
    url: 'https://docs.worldql.com',
    baseUrl: '/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',
    organizationName: 'WorldQL', // Usually your GitHub org/user name.
    projectName: 'docs.worldql.com', // Usually your repo name.
    deploymentBranch: "gh-pages",
    trailingSlash: false,

    presets: [
        [
            '@docusaurus/preset-classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                    // Please change this to your repo.
                    editUrl: 'https://github.com/WorldQL/docs.worldql.com/tree/trunk',
                    routeBasePath: '/',
                    remarkPlugins: [
                        [npm2yarn, {sync: true}],
                        [codetabs, {sync: true}],
                    ],
                },
                pages: {
                    remarkPlugins: [
                        [npm2yarn, {sync: true}],
                        [codetabs, {sync: true}],
                    ],
                },
                blog: {
                    showReadingTime: true,
                    // Please change this to your repo.
                    //editUrl:
                    //'https://github.com/facebook/docusaurus/edit/main/website/blog/',
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            }),
        ],
    ],

    themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            navbar: {
                title: 'WorldQL Docs',
                logo: {
                    alt: 'My Site Logo',
                    src: 'img/logo.svg',
                },
                items: [],
            },
            footer: {
                style: 'light',
                links: [
                    {
                        title: 'Community',
                        items: [
                            {
                                label: 'Discord',
                                href: 'https://discord.gg/tDZkXQPzEw',
                            },
                            {
                                label: 'Twitter',
                                href: 'https://twitter.com/WorldQL',
                            },
                        ],
                    },
                    {
                        title: 'More',
                        items: [
                            {
                                label: 'Blog',
                                href: 'https://www.worldql.com/posts/',
                            },
                            {
                                label: 'GitHub',
                                href: 'https://github.com/WorldQL/',
                            },
                        ],
                    },
                ],
                copyright: `Copyright © ${new Date().getFullYear()} WorldQL Corporation`,
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
            },
        }),
};

module.exports = config;
