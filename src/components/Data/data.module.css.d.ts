declare namespace DataModuleCssNamespace {
  export interface IDataModuleCss {
    btn: string;
    info: string;
    "info-wrapper": string;
    infoItem: string;
    title: string;
    wrapper: string;
  }
}

declare const DataModuleCssModule: DataModuleCssNamespace.IDataModuleCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: DataModuleCssNamespace.IDataModuleCss;
};

export = DataModuleCssModule;
