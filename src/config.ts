import { ICollectionType, IConfig } from "./lib/app/types";

const CONFIG: IConfig = {
    coinDenom: "ustars",
    name: "Embeddable House",
    chainId: "elgafar-1",
    createdDate: "2024-03-31T19:01:01.148Z",
    modifiedDate: "2024-03-31T19:01:01.148Z",
    id: "andromeda",
    collections: [
        {
            auction:
                "andr1u559qq4vgw86w42uqe9f3y64u574dk3e4xfs8axemyc907wv209smtvs5s",
            cw721: "andr16tmz2awqcynuc3ay3hwqzmy3nknqg6vd5zhhxawlsns6gs0v0kzsnxxzga",
            name: "Rivia",
            type: ICollectionType.AUCTION,
            id: "embeddables-auction-1",
            featured: "ANDR1"
        },

    ],
};

export default CONFIG;
