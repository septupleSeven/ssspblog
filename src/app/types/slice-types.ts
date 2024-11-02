export type initialStatePaging = {
  page: number;
  group: number;
};

export type initialStateSiteConfig = {
  modalOpen: boolean;
  config: {
    [key: string]: string;
  };
};

export type payloadObj = {
  isCategory: boolean;
  value: number;
};

export type pagingOptionType = "initalize" | "vanilla" | "nextGroup";

export interface BasePagingSetting {
  option: pagingOptionType;
  isCate: boolean;
}

export type PagingSetting =
  | (BasePagingSetting & {
      option: "initalize";
      state: Record<string, initialStatePaging>;
      pathname: string;
      keyName: keyof initialStatePaging;
    })
  | (BasePagingSetting & {
      option: "vanilla";
      val: number;
    })
  | (BasePagingSetting & {
      option: "nextGroup";
      state: Record<string, initialStatePaging>;
      pathname: string;
      keyName: keyof initialStatePaging;
      size: number;
      val: number;
    });
