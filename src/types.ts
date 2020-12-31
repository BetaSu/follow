export interface IRouterProps {
  path: string;
}

export interface Response {
  status: number;
}

/**
 * 纯Object对象（JSON）
 */
export interface PlainObject {
  [propsName: string]: any;
}
