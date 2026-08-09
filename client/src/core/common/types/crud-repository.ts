import type { Result } from './result';
import type { IdentifiablePayload } from './identifiable-payload';

export type CreateRepository<Payload, Entity, Errors extends Error> = {
    create(payload: Payload): Promise<Result<Entity, Errors>>;
};

export type ReadRepository<Payload, Entity, Errors extends Error> = {
    read(payload: Payload): Promise<Result<Entity, Errors>>;
};

export type ReadAllRepository<Entity, Errors extends Error> = {
    readAll(): Promise<Result<Entity[], Errors>>;
};

export type UpdateRepository<Payload, Entity, Errors extends Error> = {
    update(
        payload: Payload & IdentifiablePayload
    ): Promise<Result<Entity, Errors>>;
};

export type DeleteRepository<Errors extends Error> = {
    delete(identifier: string): Promise<Result<void, Errors>>;
};
