const presets = [
  '@babel/preset-react',
  [
    '@babel/preset-env',
    {
      targets: {
        chrome: '40',
      },
      useBuiltIns: 'entry',
      // 폴리필 관련설정 - 지원하는 브라우저에서 필요한 폴리필만 포함시킴
    },
  ],
];
const plugins = [
  [
    'module-resolver',
    {
      alias: {
        '~/*': './src',
      },
    },
  ],
  '@babel/plugin-transform-arrow-functions',
  '@babel/plugin-transform-template-literals',
];

module.exports = { presets, plugins };
