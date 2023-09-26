import { IAssetRequest } from "./types";

export const getRoof = () => {
    const key = {
        _id: 'General-Builder-Inventory',
        SK: 'Inventory-Item-8901bca8-cefc-4e9b-8336-fe7aa33bba97'
    }

    const assets: IAssetRequest[] = [];

    // const sizeXY = 40000;
    // const sizeZ = 5000;
    // const zLimit = 500000;
    const yLimit = 500000;
    const xLimit = 500000;

    let delta = 40000;

    let x = 475000;
    let y = 475000;
    let z = 493000;

    while (y >= -(yLimit - delta / 2)) {
        while (x >= - (xLimit - delta / 2)) {
            const newAssetToBuild: IAssetRequest = {
                ...key,
                position: `X=${+x.toFixed(3)} Y=${+y.toFixed(3)} Z=${+z.toFixed(3)}`,
                rotation: "P=0.000000 Y=90.000000 R=-0.000000",
                scale: "X=100.00000000 Y=100.00000000 Z=100.00000000"
            }

            assets.push(newAssetToBuild);

            x -= delta;
        }

        y -= delta;
        x = 475000;
    }

    return assets;
}

export const getFloor = () => {
    const key = {
        _id: 'General-Builder-Inventory',
        SK: 'Inventory-Item-8901bca8-cefc-4e9b-8336-fe7aa33bba97'
    }

    const assets: IAssetRequest[] = [];

    // const sizeXY = 40000;
    // const sizeZ = 5000;
    // const zLimit = 500000;
    const yLimit = 500000;
    const xLimit = 500000;

    let delta = 40000;

    let x = 475000;
    let y = 475000;
    let z = -493000;

    while (y >= -(yLimit - delta / 2)) {
        while (x >= - (xLimit - delta / 2)) {
            const newAssetToBuild: IAssetRequest = {
                ...key,
                position: `X=${+x.toFixed(3)} Y=${+y.toFixed(3)} Z=${+z.toFixed(3)}`,
                rotation: "P=0.000000 Y=90.000000 R=-0.000000",
                scale: "X=100.00000000 Y=100.00000000 Z=100.00000000"
            }

            assets.push(newAssetToBuild);

            x -= delta;
        }

        y -= delta;
        x = 475000;
    }

    return assets;
}

export const getMiddleCol = () => {
    const key = {
        _id: 'General-Builder-Inventory',
        SK: 'Inventory-Item-8901bca8-cefc-4e9b-8336-fe7aa33bba97'
    }

    const assets: IAssetRequest[] = [];

    const zLimit = 500000;

    let delta = 40000;

    let x = 0;
    let y = 0;
    let z = -480000;

    while (z < zLimit) {
        const newAssetToBuild: IAssetRequest = {
            ...key,
            position: `X=${+x.toFixed(3)} Y=${+y.toFixed(3)} Z=${+z.toFixed(3)}`,
            rotation: "P=0.000000 Y=90.000000 R=-0.000000",
            scale: "X=100.00000000 Y=100.00000000 Z=100.00000000"
        }

        assets.push(newAssetToBuild);

        z += delta;
    }

    return assets;
}

export const getHelix = (opposite: boolean = false) => {
    //https://docs.google.com/spreadsheets/d/1w80gfLpTa63wfZd2weSij8_eKe9-YMVPkFp4o1ybsEQ/edit?usp=sharing
    //you can choose any combination of inventory items from this list
    const key = {
        _id: 'General-Builder-Inventory',
        SK: 'Inventory-Item-8901bca8-cefc-4e9b-8336-fe7aa33bba97'
    }

    const assets: IAssetRequest[] = [];

    const r = 10; // Radius
    const spacing = 1;  // Vertical spacing
    const c = 0.1; // angle step

    for (let i = 1; i <= 100; i++) {
        const t = i * c;
        const x = (r * (opposite ? Math.sin(t) : Math.cos(t))) * 40000;
        const y = (r * (opposite ? Math.cos(t) : Math.sin(t))) * 40000;
        const z = (spacing * t) * 100000 - 505000;

        const newAssetToBuild: IAssetRequest = {
            ...key,
            position: `X=${+x.toFixed(3)} Y=${+y.toFixed(3)} Z=${+z.toFixed(3)}`,
            rotation: "P=0.000000 Y=90.000000 R=-0.000000",
            scale: "X=100.00000000 Y=100.00000000 Z=100.00000000"
        }

        assets.push(newAssetToBuild);
    }
    return assets;
}