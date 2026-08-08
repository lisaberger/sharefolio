export type {
    CreateRepository,
    ReadRepository,
    ReadAllRepository,
    UpdateRepository,
    DeleteRepository,
} from './types/crud-repository';
export type { Result, DataResult, ErrorResult } from './types/result';
export type { IdentifiablePayload } from './types/identifiable-payload';
export type { DataPayload } from './types/data-payload';
export type { AppEnvironment } from './types/app-environment';

export {
    isDataResult,
    isErrorResult,
    isErrorResultOneOf,
    toDataResult,
    toErrorResult,
} from './utilities/result-helper';

export { EnvironmentController } from './controller/environment-controller';
