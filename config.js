// @ts-check

const config = {
    endpoint: "https://p3kkan.documents.azure.com:443/",
    key: "zrcZZTlBsQJrMaSXx4lCfIXBHGjGVeRgEYWy4SHGTHnIlVdO6JSYDXM7ea5nbIETa0GzgMmvmweBseAsZUmECA==",
    databaseId: "P3kkan",
    containerId: "bangers",
    partitionKey: { kind: "Hash", paths: ["/bangers"] }
  };
  
  
  module.exports = config;
