import { _SERVICE } from "../src/declarations/buffer/buffer.did";
import { createActor } from "../src/declarations/buffer";
import { ActorSubclass } from "@dfinity/agent";
import canisterIds from "../.dfx/local/canister_ids.json";
import Table from "cli-table";

function createArray(size: number): bigint[] {
    let array: bigint[] = [];
    for (let i = 0n; i < size; i += 1n) {
        array.push(i);
    }
    return array;
};

describe("Buffer", () => {
    let list: ActorSubclass<_SERVICE>;
    before(() => {
        list = createActor(canisterIds.buffer.local, {
            agentOptions: {
                host: "http://127.0.0.1:8000",
            }
        });
    });

    it("std", async () => {
        var table = new Table({
            head: ['Size', 'Cycles/Element (avg)', 'Total Cost'],
        });

        const before = await list.balance();
        await list.stdBuffer([]);
        const base = before - await list.balance();
        let last = base;
        for (let n = 1; n < 2 ** 12; n *= 2) {
            const a = createArray(n);
            const before = await list.balance();
            await list.stdBuffer(a);
            const diff = before - await list.balance();
            table.push([n, ((diff - base) / BigInt(n)), diff]);
            last = diff;
        };

        console.log(table.toString());
    });

    it("base", async () => {
        var table = new Table({
            head: ['Size', 'Cycles/Element (avg)', 'Total Cost'],
        });

        const before = await list.balance();
        await list.stdBuffer([]);
        const base = before - await list.balance();
        let last = base;
        for (let n = 1; n < 2 ** 12; n *= 2) {
            const a = createArray(n);
            const before = await list.balance();
            await list.baseBuffer(a);
            const diff = before - await list.balance();
            table.push([n, ((diff - base) / BigInt(n)), diff]);
            last = diff;
        };

        console.log(table.toString());
    });
})