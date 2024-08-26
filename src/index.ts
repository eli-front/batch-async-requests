export interface BatchAsyncRequestsOptions {
  chunkSize?: number;
  debug?: boolean;
}

export const batchAsyncRequests = async <T, A = void>(
  data: T[],
  method: (data: T[]) => Promise<A[] | void>,
  { chunkSize = 2000, debug = false }: BatchAsyncRequestsOptions
): Promise<A[]> => {
  let out: A[] = [];
  for (let i = 0; i < data.length; i += chunkSize) {
    if (debug) console.log(`Processing chunk ${i / chunkSize + 1} of ${Math.ceil(data.length / chunkSize)}`);
    const chunk = data.slice(i, i + chunkSize);
    const result = await method(chunk);
    if (!result) continue;
    out = [...out, ...result];
  }
  return out;
};
