module.exports = {
  presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }]
  ],
  plugins: [
      ["@babel/plugin-transform-class-properties", { loose: true }],
      ["@babel/plugin-transform-private-methods", { loose: true }],
      ["@babel/plugin-transform-private-property-in-object", { loose: true }]
  ]
};