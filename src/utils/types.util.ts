export type QueryError = {
    code: string;
    errno: number;
    sqlState: string;
    sqlMessage: string;
    sql: string;
};
