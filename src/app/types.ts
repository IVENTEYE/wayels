export type TairType = {
    id: number,
    maxCapacity: number,
    maxWeight: number,
    packages: IPackage[]
}

export interface IShipment {
    path: string;
    date: string;
    capacity: number;
    available: number;
    kg: number;
    id: string;
    truck: string;
    loadedPackages: IPackage[];
    tiers: {
        upper: TairType[],
        middle: TairType[],
        lower: TairType[],
    };
}

export interface IPackage {
    checked: boolean;
    name: string;
    weight: number;
    date: string;
}

export interface IPackages {
    items: IPackage[],
    selectedPackages: number,
    packagesWeight: number,
}