/* tslint:disable */
/* eslint-disable */
// Generated by Microsoft Kiota
// @ts-ignore
import {
  type BadRequest,
  createBadRequestFromDiscriminatorValue,
  createNotFoundFromDiscriminatorValue,
  createSearchcodeSearchResFromDiscriminatorValue,
  createUnauthorizedFromDiscriminatorValue,
  type NotFound,
  type SearchcodeSearchRes,
  type Unauthorized,
} from "../../../../models/index.ts";
// @ts-ignore
import {
  type BaseRequestBuilder,
  type Parsable,
  type ParsableFactory,
  type RequestConfiguration,
  type RequestInformation,
  type RequestsMetadata,
} from "@microsoft/kiota-abstractions";

/**
 * Builds and executes requests for operations under /api/v1/searchcode/{search_code}
 */
export interface WithSearch_codeItemRequestBuilder
  extends BaseRequestBuilder<WithSearch_codeItemRequestBuilder> {
  /**
   * 郵便番号、事業所個別郵便番号、デジタルアドレスの統一検索エンドポイント。いずれかを指定して検索を行い、住所情報を返す。  検索時に、ページ番号や取得件数を指定。指定がない場合はデフォルト値が適用される。  パラメーター:- `page`: ページ番号 (デフォルト値:1)- `limit`: 取得する最大レコード数 (デフォルト値:1、最大値:1000)- `choikitype`: 返却する町域フィールド (指定がない場合はchoikitype=1とみなす)  - `1`: 括弧なし  - `2`: 括弧あり- `searchtype`: 検索対象 (指定がない場合はsearchtype=1とみなす)  - `1`: 郵便番号、事業所個別郵便番号、デジタルアドレスを検索  - `2`: 郵便番号、デジタルアドレスを検索
   * @param requestConfiguration Configuration for the request such as headers, query parameters, and middleware options.
   * @returns {Promise<SearchcodeSearchRes>}
   * @throws {BadRequest} error when the service returns a 400 status code
   * @throws {Unauthorized} error when the service returns a 401 status code
   * @throws {NotFound} error when the service returns a 404 status code
   * @throws {BadRequest} error when the service returns a 500 status code
   */
  get(
    requestConfiguration?:
      | RequestConfiguration<
        WithSearch_codeItemRequestBuilderGetQueryParameters
      >
      | undefined,
  ): Promise<SearchcodeSearchRes | undefined>;
  /**
   * 郵便番号、事業所個別郵便番号、デジタルアドレスの統一検索エンドポイント。いずれかを指定して検索を行い、住所情報を返す。  検索時に、ページ番号や取得件数を指定。指定がない場合はデフォルト値が適用される。  パラメーター:- `page`: ページ番号 (デフォルト値:1)- `limit`: 取得する最大レコード数 (デフォルト値:1、最大値:1000)- `choikitype`: 返却する町域フィールド (指定がない場合はchoikitype=1とみなす)  - `1`: 括弧なし  - `2`: 括弧あり- `searchtype`: 検索対象 (指定がない場合はsearchtype=1とみなす)  - `1`: 郵便番号、事業所個別郵便番号、デジタルアドレスを検索  - `2`: 郵便番号、デジタルアドレスを検索
   * @param requestConfiguration Configuration for the request such as headers, query parameters, and middleware options.
   * @returns {RequestInformation}
   */
  toGetRequestInformation(
    requestConfiguration?:
      | RequestConfiguration<
        WithSearch_codeItemRequestBuilderGetQueryParameters
      >
      | undefined,
  ): RequestInformation;
}
/**
 * 郵便番号、事業所個別郵便番号、デジタルアドレスの統一検索エンドポイント。いずれかを指定して検索を行い、住所情報を返す。  検索時に、ページ番号や取得件数を指定。指定がない場合はデフォルト値が適用される。  パラメーター:- `page`: ページ番号 (デフォルト値:1)- `limit`: 取得する最大レコード数 (デフォルト値:1、最大値:1000)- `choikitype`: 返却する町域フィールド (指定がない場合はchoikitype=1とみなす)  - `1`: 括弧なし  - `2`: 括弧あり- `searchtype`: 検索対象 (指定がない場合はsearchtype=1とみなす)  - `1`: 郵便番号、事業所個別郵便番号、デジタルアドレスを検索  - `2`: 郵便番号、デジタルアドレスを検索
 */
export interface WithSearch_codeItemRequestBuilderGetQueryParameters {
  /**
   * 返却するフィールドを指定 (指定がない場合はchoikitype=1とみなす)- `1`: 括弧無し町域フィールド- `2`: 括弧有り町域フィールド
   */
  choikitype?: number;
  /**
   * プロバイダーのユーザーID (クエリパラメーター)
   */
  ecUid?: string;
  /**
   * 取得最大レコード数 (デフォルト値:1、最大値:1000)
   */
  limit?: number;
  /**
   * ページ番号 (デフォルト値:1)
   */
  page?: number;
  /**
   * 検索方法を指定 (指定がない場合はsearchtype=1とみなす)- `1`: 郵便番号、事業所個別郵便番号、デジタルアドレスを検索する- `2`: 郵便番号、デジタルアドレスを検索する (事業所個別郵便番号は検索対象外)
   */
  searchtype?: number;
}
/**
 * Uri template for the request builder.
 */
export const WithSearch_codeItemRequestBuilderUriTemplate =
  "{+baseurl}/api/v1/searchcode/{search_code}{?choikitype*,ec_uid*,limit*,page*,searchtype*}";
/**
 * Mapper for query parameters from symbol name to serialization name represented as a constant.
 */
const WithSearch_codeItemRequestBuilderGetQueryParametersMapper: Record<
  string,
  string
> = {
  "ecUid": "ec_uid",
};
/**
 * Metadata for all the requests in the request builder.
 */
export const WithSearch_codeItemRequestBuilderRequestsMetadata:
  RequestsMetadata = {
    get: {
      uriTemplate: WithSearch_codeItemRequestBuilderUriTemplate,
      responseBodyContentType: "application/json",
      errorMappings: {
        400: createBadRequestFromDiscriminatorValue as ParsableFactory<
          Parsable
        >,
        401: createUnauthorizedFromDiscriminatorValue as ParsableFactory<
          Parsable
        >,
        404: createNotFoundFromDiscriminatorValue as ParsableFactory<Parsable>,
        500: createBadRequestFromDiscriminatorValue as ParsableFactory<
          Parsable
        >,
      },
      adapterMethodName: "send",
      responseBodyFactory: createSearchcodeSearchResFromDiscriminatorValue,
      queryParametersMapper:
        WithSearch_codeItemRequestBuilderGetQueryParametersMapper,
    },
  };
/* tslint:enable */
/* eslint-enable */
