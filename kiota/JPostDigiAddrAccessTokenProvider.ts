import {
  type AccessTokenProvider,
  AllowedHostsValidator,
  AnonymousAuthenticationProvider,
  createJPostDigiAddrClient,
  FetchRequestAdapter,
} from "../mod.ts";

export class JPostDigiAddrAccessTokenProvider implements AccessTokenProvider {
  private tokenInfo?: {
    token: string;
    expiresAt: Date;
  };
  constructor(
    private readonly clientId: string,
    private readonly secretKey: string,
    private readonly baseUrl?: string,
  ) {}
  getAllowedHostsValidator(): AllowedHostsValidator {
    const allowedHosts = new Set(["https://api.da.pf.japanpost.jp"]);
    if (this.baseUrl) {
      allowedHosts.add(this.baseUrl);
    }
    return new AllowedHostsValidator(allowedHosts);
  }
  async getAuthorizationToken(): Promise<string> {
    if (this.tokenInfo && this.tokenInfo.expiresAt > new Date()) {
      return this.tokenInfo.token;
    }
    const authProvider = new AnonymousAuthenticationProvider();
    const authAdapter = new FetchRequestAdapter(authProvider);
    if (this.baseUrl) {
      authAdapter.baseUrl = this.baseUrl;
    }
    const authClient = createJPostDigiAddrClient(authAdapter);
    const tokenResp = await authClient.api.v1.j.token.post({
      clientId: this.clientId,
      secretKey: this.secretKey,
      grantType: "client_credentials",
    });
    if (!tokenResp?.token || !tokenResp?.expiresIn) {
      throw new Error("Failed to get token");
    }
    this.tokenInfo = {
      token: tokenResp.token,
      expiresAt: new Date(Date.now() + tokenResp.expiresIn * 1000),
    };
    return tokenResp.token;
  }
}
