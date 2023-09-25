# multiversal-api

Firstly you need to choose the metaverse you are goint to building in.

```
node --loader ts-node/esm apiBuilderAlgorithm/showMyMetaverses.ts
```

![image](https://github.com/svoitovych0218/multiversal-api/assets/25226807/7c6e32de-79b8-4be4-b2b5-36e8650e1d88)

Then if you want to cleanup previous content you should use following script.
```
node --loader ts-node/esm apiBuilderAlgorithm/cleanup.ts
```
make sure you receive a completed result

![image](https://github.com/svoitovych0218/multiversal-api/assets/25226807/cbe25cca-f0f8-41c0-b121-529fe7716362)

And the main script to build some assets into metaverse
```
node --loader ts-node/esm apiBuilderAlgorithm/apiAssetBuildDemo.ts
```
![image](https://github.com/svoitovych0218/multiversal-api/assets/25226807/e03fa12c-11e2-447d-9a08-8bfceff60f4b)

Make sure, if you already have some content in metaverse it will be appended. To rewrite content - please cleanup metaverse firstly.
