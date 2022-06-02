import Prim "mo:⛔";

import Buffer_std "mo:std/Buffer";
import Buffer_base "mo:base/Buffer";

actor {
    public query func balance() : async  Nat {
        Prim.cyclesBalance();
    };

    public shared func stdBuffer(xs : [Nat]) : async () {
        let b = Buffer_std.init<Nat>(xs.size());
        for (x in xs.vals()) Buffer_std.add(b, x);
    };

    public shared func baseBuffer(xs : [Nat]) : async () {
        let b = Buffer_base.Buffer<Nat>(xs.size());
        for (x in xs.vals()) b.add(x);
    };
};
