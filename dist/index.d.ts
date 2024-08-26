export interface BatchAsyncRequestsOptions {
    chunkSize?: number;
    debug?: boolean;
}
export declare const batchAsyncRequests: <T, A = void>(data: T[], method: (data: T[]) => Promise<A[] | void>, { chunkSize, debug }: BatchAsyncRequestsOptions) => Promise<A[]>;
