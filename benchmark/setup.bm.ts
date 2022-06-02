import { execSync } from "child_process";
import { createActor, XDR } from "../src/xdr";

const stdio = process.env.DEBUG ? "inherit" : "ignore";

before(async () => {
    const xdr : XDR = createActor();
    const { data } = await xdr.get_icp_xdr_conversion_rate();
    console.log(`XDR: ${parseFloat(data.xdr_permyriad_per_icp.toString()) / 10_000}T Cycles/ICP.`);

    execSync(`dfx stop`, { stdio: "ignore" });
    execSync(`dfx start --background`, { stdio });
    execSync(`dfx deploy`, { stdio });
});

after(() => {
    execSync(`dfx stop`, { stdio: "ignore" });
});
