export const DBConfig = {
  name: "hackerEarthECS",
  version: 1,
  objectStoresMeta: [
    {
      store: "books",
      storeConfig: { keyPath: "id", autoIncrement: true },
      storeSchema: [
        {
          name: "bookID",
          keypath: "bookID",
          options: { unique: true },
        },
      ],
    },
  ],
};
