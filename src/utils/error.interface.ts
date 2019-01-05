export default interface CustomError extends Error {
    status: number;
}