"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.batchAsyncRequests = void 0;
const batchAsyncRequests = (data_1, method_1, _a) => __awaiter(void 0, [data_1, method_1, _a], void 0, function* (data, method, { chunkSize = 2000, debug = false }) {
    let out = [];
    for (let i = 0; i < data.length; i += chunkSize) {
        if (debug)
            console.log(`Processing chunk ${i / chunkSize + 1} of ${Math.ceil(data.length / chunkSize)}`);
        const chunk = data.slice(i, i + chunkSize);
        const result = yield method(chunk);
        if (!result)
            continue;
        out = [...out, ...result];
    }
    return out;
});
exports.batchAsyncRequests = batchAsyncRequests;
