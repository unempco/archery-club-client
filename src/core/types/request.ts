export type JSONValue =
  | string
  | number
  | boolean
  | null
  | { [x: string]: JSONValue }
  | Array<JSONValue>;

export type JsonRecord = Record<string, JSONValue>;

export interface RequestOptions {
  query?: JsonRecord;
  body?: JsonRecord;
  signal?: AbortSignal;
}

/**
 * Specifies the type for the fetch request options for getItem and getAllItems requests.
 */
export type GetOptions = Omit<RequestOptions, 'body'>;
export type MutationOptions = RequestOptions;
