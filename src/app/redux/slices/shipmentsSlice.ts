'use client';
import { IPackage, IShipment, TierType } from "@/app/types";
import { ObjectType } from "@react-spring/web";
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = {
    items: [
        {
            path: "Barcelona - Valencia",
            date: "15 Jun, 2:00 PM",
            capacity: 90,
            available: 20,
            kg: 200,
            id: "V435322",
            truck: "Iveco 80E18",
            loadedPackages: [],
            tiers: {
                upper: [
                    {
                        id: 1,
                        maxCapacity: 3,
                        maxWeight: 20,
                        packages: []
                    },
                    {
                        id: 2,
                        maxCapacity: 3,
                        maxWeight: 20,
                        packages: []
                    },
                    {
                        id: 3,
                        maxCapacity: 3,
                        maxWeight: 20,
                        packages: []
                    },
                    {
                        
                        id: 4,
                        maxCapacity: 3,
                        maxWeight: 20,
                        packages: []
                    },
                ],
                middle: [
                    {
                        id: 5,
                        maxCapacity: 5,
                        maxWeight: 50,
                        packages: []
                    },
                    {
                        id: 6,
                        maxCapacity: 5,
                        maxWeight: 50,
                        packages: []
                    },
                    {
                        id: 7,
                        maxCapacity: 5,
                        maxWeight: 50,
                        packages: []
                    },
                    {
                        id: 8,
                        maxCapacity: 5,
                        maxWeight: 50,
                        packages: []
                    },
                ],
                lower: [
                    {
                        id: 9,
                        maxCapacity: 8,
                        maxWeight: 150,
                        packages: []
                    },
                    {
                        id: 10,
                        maxCapacity: 8,
                        maxWeight: 150,
                        packages: []
                    },
                    {
                        id: 11,
                        maxCapacity: 8,
                        maxWeight: 150,
                        packages: []
                    },
                    {
                        id: 12,
                        maxCapacity: 8,
                        maxWeight: 150,
                        packages: []
                    },
                ]
            },
        },
        {
            path: "Barcelona - Seville",
            date: "15 Jun, 8:00 PM",
            capacity: 50,
            available: 200,
            kg: 400,
            id: "S890324",
            truck: "Iveco 80E18",
            loadedPackages: [],
            tiers: {
                upper: [
                    {
                        id: 1,
                        maxCapacity: 3,
                        maxWeight: 20,
                        packages: []
                    },
                    {
                        id: 2,
                        maxCapacity: 3,
                        maxWeight: 20,
                        packages: []
                    },
                    {
                        id: 3,
                        maxCapacity: 3,
                        maxWeight: 20,
                        packages: []
                    },
                    {
                        
                        id: 4,
                        maxCapacity: 3,
                        maxWeight: 20,
                        packages: []
                    },
                ],
                middle: [
                    {
                        id: 5,
                        maxCapacity: 5,
                        maxWeight: 50,
                        packages: []
                    },
                    {
                        id: 6,
                        maxCapacity: 5,
                        maxWeight: 50,
                        packages: []
                    },
                    {
                        id: 7,
                        maxCapacity: 5,
                        maxWeight: 50,
                        packages: []
                    },
                    {
                        id: 8,
                        maxCapacity: 5,
                        maxWeight: 50,
                        packages: []
                    },
                ],
                lower: [
                    {
                        id: 9,
                        maxCapacity: 8,
                        maxWeight: 150,
                        packages: []
                    },
                    {
                        id: 10,
                        maxCapacity: 8,
                        maxWeight: 150,
                        packages: []
                    },
                    {
                        id: 11,
                        maxCapacity: 8,
                        maxWeight: 150,
                        packages: []
                    },
                    {
                        id: 12,
                        maxCapacity: 8,
                        maxWeight: 150,
                        packages: []
                    },
                ]
            },
        },
        {
            path: "Barcelona - Seville",
            date: "15 Jun, 8:00 PM",
            capacity: 25,
            available: 225,
            kg: 300,
            id: "S423426",
            truck: "Iveco 90E14",
            loadedPackages: [],
            tiers: {
                upper: [
                    {
                        id: 1,
                        maxCapacity: 3,
                        maxWeight: 20,
                        packages: []
                    },
                    {
                        id: 2,
                        maxCapacity: 3,
                        maxWeight: 20,
                        packages: []
                    },
                    {
                        id: 3,
                        maxCapacity: 3,
                        maxWeight: 20,
                        packages: []
                    },
                    {
                        
                        id: 4,
                        maxCapacity: 3,
                        maxWeight: 20,
                        packages: []
                    },
                ],
                middle: [
                    {
                        id: 5,
                        maxCapacity: 5,
                        maxWeight: 50,
                        packages: []
                    },
                    {
                        id: 6,
                        maxCapacity: 5,
                        maxWeight: 50,
                        packages: []
                    },
                    {
                        id: 7,
                        maxCapacity: 5,
                        maxWeight: 50,
                        packages: []
                    },
                    {
                        id: 8,
                        maxCapacity: 5,
                        maxWeight: 50,
                        packages: []
                    },
                ],
                lower: [
                    {
                        id: 9,
                        maxCapacity: 8,
                        maxWeight: 150,
                        packages: []
                    },
                    {
                        id: 10,
                        maxCapacity: 8,
                        maxWeight: 150,
                        packages: []
                    },
                    {
                        id: 11,
                        maxCapacity: 8,
                        maxWeight: 150,
                        packages: []
                    },
                    {
                        id: 12,
                        maxCapacity: 8,
                        maxWeight: 150,
                        packages: []
                    },
                ]
            },
        },
        {
            path: "Barcelona - Cordoba",
            date: "15 Jun, 10:00 PM",
            capacity: 20,
            available: 160,
            kg: 200,
            id: "C998426",
            truck: "Iveco 90E21",
            loadedPackages: [],
            tiers: {
                upper: [
                    {
                        id: 1,
                        maxCapacity: 3,
                        maxWeight: 20,
                        packages: []
                    },
                    {
                        id: 2,
                        maxCapacity: 3,
                        maxWeight: 20,
                        packages: []
                    },
                    {
                        id: 3,
                        maxCapacity: 3,
                        maxWeight: 20,
                        packages: []
                    },
                    {
                        
                        id: 4,
                        maxCapacity: 3,
                        maxWeight: 20,
                        packages: []
                    },
                ],
                middle: [
                    {
                        id: 5,
                        maxCapacity: 5,
                        maxWeight: 50,
                        packages: []
                    },
                    {
                        id: 6,
                        maxCapacity: 5,
                        maxWeight: 50,
                        packages: []
                    },
                    {
                        id: 7,
                        maxCapacity: 5,
                        maxWeight: 50,
                        packages: []
                    },
                    {
                        id: 8,
                        maxCapacity: 5,
                        maxWeight: 50,
                        packages: []
                    },
                ],
                lower: [
                    {
                        id: 9,
                        maxCapacity: 8,
                        maxWeight: 150,
                        packages: []
                    },
                    {
                        id: 10,
                        maxCapacity: 8,
                        maxWeight: 150,
                        packages: []
                    },
                    {
                        id: 11,
                        maxCapacity: 8,
                        maxWeight: 150,
                        packages: []
                    },
                    {
                        id: 12,
                        maxCapacity: 8,
                        maxWeight: 150,
                        packages: []
                    },
                ]
            },
        },
        {
            path: "Barcelona - Valencia",
            date: "15 Jun, 10:30 PM",
            capacity: 20,
            available: 160,
            kg: 200,
            id: "B943234",
            truck: "Iveco 90E21",
            loadedPackages: [],
            tiers: {
                upper: [
                    {
                        id: 1,
                        maxCapacity: 3,
                        maxWeight: 20,
                        packages: []
                    },
                    {
                        id: 2,
                        maxCapacity: 3,
                        maxWeight: 20,
                        packages: []
                    },
                    {
                        id: 3,
                        maxCapacity: 3,
                        maxWeight: 20,
                        packages: []
                    },
                    {
                        
                        id: 4,
                        maxCapacity: 3,
                        maxWeight: 20,
                        packages: []
                    },
                ],
                middle: [
                    {
                        id: 5,
                        maxCapacity: 5,
                        maxWeight: 50,
                        packages: []
                    },
                    {
                        id: 6,
                        maxCapacity: 5,
                        maxWeight: 50,
                        packages: []
                    },
                    {
                        id: 7,
                        maxCapacity: 5,
                        maxWeight: 50,
                        packages: []
                    },
                    {
                        id: 8,
                        maxCapacity: 5,
                        maxWeight: 50,
                        packages: []
                    },
                ],
                lower: [
                    {
                        id: 9,
                        maxCapacity: 8,
                        maxWeight: 150,
                        packages: []
                    },
                    {
                        id: 10,
                        maxCapacity: 8,
                        maxWeight: 150,
                        packages: []
                    },
                    {
                        id: 11,
                        maxCapacity: 8,
                        maxWeight: 150,
                        packages: []
                    },
                    {
                        id: 12,
                        maxCapacity: 8,
                        maxWeight: 150,
                        packages: []
                    },
                ]
            },
        },
    ],
    packages: {
        items: [
            {
                checked: false,
                name: 'CN12537221M',
                weight: 52,
                date: "10 Jun, 8:00 AM",
            },
            {
                checked: false,
                name: 'CN85473293M',
                weight: 20,
                date: "11 Jun, 10:00 AM",
            },
            {
                checked: false,
                name: 'CN25783949M',
                weight: 54,
                date: "11 Jun, 12:30 AM",
            },
            {
                checked: false,
                name: 'CN83456231M',
                weight: 50,
                date: "11 Jun, 02:30 AM",
            },
            {
                checked: false,
                name: 'CN57385217M',
                weight: 100,
                date: "11 Jun, 06:30 AM",
            },
            {
                checked: false,
                name: 'CN38410234M',
                weight: 44,
                date: "11 Jun, 08:44 AM",
            },
            {
                checked: false,
                name: 'CN19345643M',
                weight: 22,
                date: "12 Jun, 09:44 AM",
            },
            {
                checked: false,
                name: 'CN67328521M',
                weight: 14,
                date: "12 Jun, 10:06 AM",
            },
            {
                checked: false,
                name: 'CN67678521M',
                weight: 56,
                date: "12 Jun, 10:13 AM",
            },
            {
                checked: false,
                name: 'CN54093456M',
                weight: 10,
                date: "12 Jun, 11:16 AM",
            },
            {
                checked: false,
                name: 'CN02574575M',
                weight: 5,
                date: "12 Jun, 11:20 AM",
            },
        ],
        selectedPackages: 0,
        packagesWeight: 0
    },
    renderItems: [],
    activeTruckId: '',
    sortBy: 'capacity'
}

export const shipmentsSlice = createSlice({
    name: "shipments",
    initialState,
    reducers: {
        onCheck(state, action: PayloadAction<{ name: string, state: boolean }>) {
            state.packages.items = state.packages.items.map((item: IPackage) => {
                if (item.name === action.payload.name) {
                    return {
                        ...item,
                        checked: action.payload.state,
                    }
                }
                return item;
            });
        },
        onLoadPackages(state, action: PayloadAction<{ items: IPackage[], weight: number, layer: string, id: number }>) {
            const { layer } = action.payload;
            const currentTruck: IShipment[] = state.renderItems;
            const currentTiers: TierType[] = currentTruck[0].tiers[layer as keyof ObjectType<string>];
                                    
            action.payload.items.forEach((item: IPackage) => currentTruck[0].loadedPackages.push(item));
            currentTiers.forEach((tier: TierType) => {
                if (tier.id === action.payload.id) {
                    action.payload.items.forEach(item => {
                        tier.packages.push(item);
                    })
                }
            });
            
            currentTruck[0].available -= action.payload.weight;

            const capacityValue = 100 - currentTruck[0].available * 100 / currentTruck[0].kg;
            currentTruck[0].capacity = Math.floor(capacityValue);
        },
        setTruckId(state, action: PayloadAction<string>) {
            state.activeTruckId = action.payload;
        },
        setItems(state, action) {
            state.items = action.payload;
        },
        pushItem(state, action) {
            state.items.push(action.payload);
        },
        setRenderItems(state, action) {
            state.renderItems = action.payload;
            console.log(state.renderItems);
        },
        setSelectedPackages(state, action: PayloadAction<number>) {
            state.packages.selectedPackages = action.payload;
        },
        setPackagesWeight(state, action: PayloadAction<number[]>) {
            state.packages.packagesWeight = action.payload.reduce((acc, item) => item + acc, 0);
        },
        onRemovePackage(state, action: PayloadAction<IPackage[]>) {
            action.payload.forEach((item: IPackage) => {
                state.packages.items = state.packages.items.filter(pack => pack.checked !== item.checked);
            })
        },
        setSort(state, action) {
            state.sortBy = action.payload;
        }
    }
})

export const { onCheck, onLoadPackages, setTruckId, setItems, setSelectedPackages, setPackagesWeight, onRemovePackage, setRenderItems, setSort, pushItem } = shipmentsSlice.actions;