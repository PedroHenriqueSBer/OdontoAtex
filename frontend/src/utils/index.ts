import { IResultServiceProps } from "props";

export const resolveResponse = <t>(
  resolve: (value: t | PromiseLike<t>) => void,
  reject: (string?: any) => void,
  response: IResultServiceProps<t>
) => 
  response.error ? reject(response.message) : resolve(response.data)
