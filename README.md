# multiversal-api

Firstly you need to choose the metaverse you are going to be building in.

```
node --loader ts-node/esm apiBuilderAlgorithm/showMyMetaverses.ts
```

![image](https://github.com/svoitovych0218/multiversal-api/assets/25226807/ec4b291f-324e-43b8-9c70-6f106c312b36)

Then if you want to cleanup previous content you should use following script.
```
node --loader ts-node/esm apiBuilderAlgorithm/cleanup.ts
```
make sure you receive a completed result

![image](https://github.com/svoitovych0218/multiversal-api/assets/25226807/c90a592b-bb73-4ead-a533-df8943399a34)

The script to build helux into the metaverse
```
node --loader ts-node/esm apiBuilderAlgorithm/apiAssetBuildDemo.ts helux
```
![image](https://github.com/svoitovych0218/multiversal-api/assets/25226807/f3cd225d-3018-44c7-be3e-e51b7cd8fc7c)

And short video demonstration
https://app.screencast.com/YAlMmV9VYwXkE


The script to fill the metaverse space via modrian algorithm
```
node --loader ts-node/esm apiBuilderAlgorithm/apiAssetBuildDemo.ts modrian
```

https://app.screencast.com/sCp8OZDhOtcIe

Make sure, if you already have some content in metaverse it will be appended. To rewrite content - please cleanup metaverse firstly.

List of inventory items you can use to build with API
https://docs.google.com/spreadsheets/d/1w80gfLpTa63wfZd2weSij8_eKe9-YMVPkFp4o1ybsEQ/edit?usp=sharing

Also there is API to receive inventory items as JSON
```
node --loader ts-node/esm apiBuilderAlgorithm/showGeneralInventoryItems.ts
```
![image](https://github.com/svoitovych0218/multiversal-api/assets/25226807/47201afa-3de7-4676-9203-717b9cbbc86f)

