import {
  BaseBearerTokenAuthenticationProvider,
  createJPostDigiAddrClient,
  FetchRequestAdapter,
  JPostDigiAddrAccessTokenProvider,
} from "@fuji44/jpost-digiaddr";

const clientId = process.env.JPOST_DIGIADDR_CLIENT_ID;
if (!clientId) {
  throw new Error("environment variable JPOST_DIGIADDR_CLIENT_ID is not set");
}
const secretKey = process.env.JPOST_DIGIADDR_CLIENT_SECRET;
if (!secretKey) {
  throw new Error(
    "environment variable JPOST_DIGIADDR_CLIENT_SECRET is not set",
  );
}

const testServerBaseUrl = "https://stub-qz73x.da.pf.japanpost.jp";
const provider = new BaseBearerTokenAuthenticationProvider(
  new JPostDigiAddrAccessTokenProvider(
    clientId,
    secretKey,
    testServerBaseUrl,
  ),
);
const adapter = new FetchRequestAdapter(provider);
adapter.baseUrl = testServerBaseUrl;
const client = createJPostDigiAddrClient(adapter);
const resp = await client.api.v1.searchcode.bySearch_code("A7E2FK2").get({
  queryParameters: { page: 1, limit: 10 },
});

resp?.addresses?.forEach((address) => {
  console.log(
    `Address: ${address.address}, Zip: ${address.zip}, City: ${address.city}`,
  );
});
