import { load } from "@std/dotenv";
import { assertEquals, assertExists, fail } from "@std/assert";
import {
  BaseBearerTokenAuthenticationProvider,
  createJPostDigiAddrClient,
  FetchRequestAdapter,
  JPostDigiAddrAccessTokenProvider,
} from "../mod.ts";

await load({
  envPath: "./.env",
  export: true,
});

Deno.test({
  name: "search itemList",
  async fn() {
    const clientId = Deno.env.get("JPOST_DIGIADDR_CLIENT_ID");
    if (!clientId) {
      throw new Error(
        "environment variable JPOST_DIGIADDR_CLIENT_ID is not set",
      );
    }
    const secretKey = Deno.env.get("JPOST_DIGIADDR_CLIENT_SECRET");
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

    if (!resp) {
      fail("Response is undefined");
    }

    assertEquals(resp.count, 1);
    assertEquals(resp.page, 1);
    assertEquals(resp.limit, 10);
    assertEquals(resp.searchtype, "dgacode");
    resp.addresses?.forEach((address) => {
      assertEquals(address.dgacode, "A7E2FK2");
    });

    const addressZipResp = await client.api.v1.addresszip.post(
      {
        prefName: "東京都",
        cityName: "千代田区",
        flgGetcity: 0,
        flgGetpref: 0,
        page: 1,
        limit: 10,
      },
    );

    if (!addressZipResp) {
      fail("Response is undefined");
    }

    assertExists(addressZipResp.count);
    assertEquals(addressZipResp.page, 1);
    assertEquals(addressZipResp.limit, 10);
    assertEquals(addressZipResp.level, 2);
    addressZipResp.addresses?.forEach((address) => {
      assertEquals(address.prefName, "東京都");
      assertEquals(address.cityName, "千代田区");
    });
  },
});
