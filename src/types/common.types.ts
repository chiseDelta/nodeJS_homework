export interface IError extends Error {
  status: number;
}

export interface IMessage {
  message: string;
}

interface IIndex {
  [index: string]: any;
}

export type IRequest = IIndex;
