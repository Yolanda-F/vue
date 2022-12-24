declare interface IResponse<T = any> {
  code: number | string;
  data: T;
  msg: string;
  // status: string | number;
}
declare interface requestType {
  url: string | undefined;
  timeId: number;
}
