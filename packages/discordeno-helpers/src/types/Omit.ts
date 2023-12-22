// https://stackoverflow.com/questions/51804810/how-to-remove-fields-from-a-typescript-interface-via-extension
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
