export default function createConfig(
  packageName,
  packageDependencies,
  umd = {},
  cjs = {},
  es = {},
) {
  return [
    {
      input,
      plugins,
      output: {
        file: "/public/index.umd.js", // تغییر به /public
        format: "umd",
        exports: "named",
        name: packageName,
        sourcemap: true,
        ...umd,
      },
    },
    {
      input,
      plugins,
      external: packageDependencies,
      output: [
        {
          file: "/public/index.cjs.js", // تغییر به /public
          format: "cjs",
          exports: "named",
          name: packageName,
          sourcemap: true,
          ...cjs,
        },
        {
          file: "/public/index.es.js", // تغییر به /public
          format: "es",
          exports: "named",
          name: packageName,
          sourcemap: true,
          ...es,
        },
      ],
    },
  ];
}
