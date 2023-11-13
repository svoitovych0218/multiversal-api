import { IAssetRequest } from "./types";

const random = (from: number, to: number) => {
    if (to <= from) {
        throw new Error('from should be less than to');
    }
    const rd = Math.random();
    return from + rd * (to - from);
}

enum Rotation {
    x = 1,
    y = 2,
    z = 3
}

interface Result {
    x: number;
    y: number;
    z: number;
    xSize: number;
    ySize: number;
    zSize: number;
    rotation: Rotation;
}

const getNext = (
    x: number, 
    y: number, 
    z: number, 
    xSize: number, 
    ySize: number, 
    zSize: number, 
    depth: number, 
    rotation: Rotation, 
    result: Result[]) => {
    if (depth === 0) {
        // create;
        // probability koeficient. 0.3 means that only 30% of the space will be filled
        const probabilityRd = random(0, 1);
        if (probabilityRd <= 0.3) {
            result.push({
                x, y, z, xSize, ySize, zSize, rotation
            });
        }
    } else {
        const directionRd = random(0, 1);
        if (directionRd < 0.33) {
            //X
            const sizeRd = Math.round(random(xSize * 0.2, xSize * 0.6));
            getNext(x, y, z, sizeRd, ySize, zSize, depth - 1, Rotation.x, result);
            getNext(x + sizeRd, y, z, xSize - sizeRd, ySize, zSize, depth - 1, Rotation.x, result);
        } else if (directionRd < 0.66) {
            //Y
            const sizeRd = Math.round(random(ySize * 0.2, ySize * 0.6));
            getNext(x, y, z, xSize, sizeRd, zSize, depth - 1, Rotation.y, result);
            getNext(x, y + sizeRd, z, xSize, ySize - sizeRd, zSize, depth - 1, Rotation.y, result);
        } else {
            //Z
            const sizeRd = Math.round(random(zSize * 0.2, zSize * 0.6));
            getNext(x, y, z, xSize, ySize, sizeRd, depth - 1, Rotation.z, result);
            getNext(x, y, z + sizeRd, xSize, ySize, zSize - sizeRd, depth - 1, Rotation.z, result);
        }
    }
}

export const mondrianAlgorithm = (size: number, depth: number) => {
    const result: Result[] = [];

    getNext(0, 0, 0, size, size, size, depth, Rotation.x, result);

    console.log('Items to create count: ', result.length);

    const key = {
        _id: 'General-Builder-Inventory',
        SK: 'Inventory-Item-0c579fef-6df2-4273-93dc-7b6411181057'
    }

    const itemSize = 6650;

    const assets: IAssetRequest[] = result.map(s => {
        const positionX = s.x + s.xSize / 2 - size / 2;
        const positionY = s.y + s.ySize / 2 - size / 2;
        const positionZ = s.z + s.zSize / 2 - size / 2;

        const xScale = s.xSize / itemSize * 99;
        const yScale = s.ySize / itemSize * 99;
        const zScale = s.zSize / itemSize * 99;

        const res: IAssetRequest = {
            ...key,
            position: `X=${+positionX.toFixed(3)} Y=${+positionY.toFixed(3)} Z=${+positionZ.toFixed(3)}`,
            rotation: "P=0.000000 Y=0.000000 R=0.000000",
            scale: `X=${+xScale.toFixed(3)} Y=${+yScale.toFixed(3)} Z=${+zScale.toFixed(3)}`
        }

        return res;
    });

    return assets;
}