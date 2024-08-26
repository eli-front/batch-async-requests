# `batchAsyncRequests` Documentation

## Overview

The `batchAsyncRequests` function is a utility that processes asynchronous requests in batches. This function takes an array of data and applies a given method to chunks of that data, handling each chunk asynchronously. It is useful for optimizing large sets of requests and reducing the load on APIs or other services by limiting the number of simultaneous requests.

### Type Definitions

#### `BatchAsyncRequestsOptions`

```ts
export interface BatchAsyncRequestsOptions {
  chunkSize?: number;
  debug?: boolean;
}
```

`BatchAsyncRequestsOptions` defines the optional settings for controlling the behavior of the `batchAsyncRequests` function.

- **`chunkSize?: number`**: (Optional) Specifies the number of items in each chunk. The default value is `2000`.
- **`debug?: boolean`**: (Optional) Enables debug logging. If set to `true`, the function will log details about the chunk being processed.

### Function Signature

```ts
export const batchAsyncRequests = async <T, A = void>(
  data: T[],
  method: (data: T[]) => Promise<A[] | void>,
  { chunkSize = 2000, debug = false }: BatchAsyncRequestsOptions
): Promise<A[]>;
```

### Parameters

- **`data: T[]`**: The array of data that will be processed in batches.
- **`method: (data: T[]) => Promise<A[] | void>`**: The asynchronous function to be applied to each chunk of data. The method should return either a promise that resolves to an array of type `A` or `void` if no result is returned for the chunk.
- **`options: BatchAsyncRequestsOptions`**: (Optional) An object containing optional settings such as `chunkSize` and `debug`.

### Returns

- **`Promise<A[]>`**: A promise that resolves to a concatenated array of results from each chunk. If the method returns `void` for a chunk, no results will be added to the output array for that chunk.

### Example Usage

```ts
// Define an example method that simulates an asynchronous operation
const asyncMethod = async (chunk: number[]): Promise<number[]> => {
  return chunk.map((item) => item * 2);
};

// Call batchAsyncRequests with the data and method
const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const options = { chunkSize: 3, debug: true };

batchAsyncRequests(data, asyncMethod, options).then((result) => {
  console.log(result); // [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
});
```

### Behavior

1. The input array, `data`, is divided into smaller chunks based on the `chunkSize` option. If `chunkSize` is not specified, it defaults to `2000`.
2. The `method` is executed asynchronously for each chunk of data.
3. If the `debug` option is enabled (`debug: true`), the function logs the chunk number being processed to the console.
4. The results of each chunk (if any) are collected and concatenated into a single output array, which is returned as a promise.

### Notes

- **Chunk Processing**: This method is suitable for scenarios where large datasets need to be processed, but you want to avoid overloading the system by processing the entire dataset at once. For example, batch requests to an API.
- **Error Handling**: The function does not include error handling by default. You may want to wrap your method in a `try/catch` block to handle any errors.

