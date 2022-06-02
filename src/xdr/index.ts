import { Actor, ActorSubclass, HttpAgent } from "@dfinity/agent";

const canisterId = "rkp4c-7iaaa-aaaaa-aaaca-cai";

const idlFactory = ({ IDL }) => {
    const IcpXdrConversionRate = IDL.Record({
        xdr_permyriad_per_icp: IDL.Nat64,
        timestamp_seconds: IDL.Nat64,
    });
    const IcpXdrConversionRateCertifiedResponse = IDL.Record({
        certificate: IDL.Vec(IDL.Nat8),
        data: IcpXdrConversionRate,
        hash_tree: IDL.Vec(IDL.Nat8),
    });
    return IDL.Service({
        'get_icp_xdr_conversion_rate': IDL.Func(
            [],
            [IcpXdrConversionRateCertifiedResponse],
            ["query"]
        ),
    });
};

export interface IcpXdrConversionRate {
    xdr_permyriad_per_icp: bigint;
    timestamp_seconds: bigint;
}
export interface IcpXdrConversionRateCertifiedResponse {
    certificate: Array<number>;
    data: IcpXdrConversionRate;
    hash_tree: Array<number>;
}

export interface XDR {
    'get_icp_xdr_conversion_rate': () => Promise<IcpXdrConversionRateCertifiedResponse>;
}

export function createActor<T>() : ActorSubclass<T> {
    const agent = new HttpAgent({
        host: 'https://ic0.app',
    });
    return Actor.createActor(idlFactory, {
        agent,
        canisterId,
    });
};