export type Result<D, E extends Error> = DataResult<D> | ErrorResult<E>;

export interface DataResult<D> {
    data: D;
    error?: never;
}

export interface ErrorResult<E extends Error> {
    data?: never;
    error: E;
}
