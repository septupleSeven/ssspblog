import React, { useCallback, useMemo } from "react";
import { siteConfigType } from "../../../../shared/types/api-types";
import {
  RootStateSiteConfig,
  SiteConfigDispatch,
} from "@/app/store/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { initialStateSiteConfig } from "@/app/types/slice-types";
import { changeStyle, setConfigValue } from "@/app/store/redux/slice";

const SelectList = ({ id: elId, name, values }: siteConfigType) => {
  const siteConfigStore = useSelector<RootStateSiteConfig>(
    (state) => state.siteConfig,
  ) as initialStateSiteConfig;
  const dispatch = useDispatch<SiteConfigDispatch>();

  const handleSelectChange = useCallback(
    (elId: string, targetVal: string) => {
      dispatch(setConfigValue({ configId: elId, value: targetVal }));
      dispatch(changeStyle({ configId: elId }));
    },
    [dispatch],
  );

  const SelectOptions: JSX.Element[] = useMemo(
    () =>
      values.map((el, idx) => {
        return (
          <option key={`${idx}-${el.val}`} value={el.val}>
            {el.name}
          </option>
        );
      }),
    [values],
  );

  return (
    <li className={`flex flex-col gap-y-[10px] semi-mobile:gap-y-[5px] text-[1.0625rem] semi-mobile:text-[0.9375rem]`}>
      <p>{name}</p>
      <select
        className="w-full appearance-none rounded-md bg-select-chevron-light bg-[length:24px] bg-[right_10px_center] bg-no-repeat px-[10px] py-[12px] text-primary-black dark:bg-select-chevron-dark dark:text-primary-white semi-mobile:py-[10px] semi-mobile:bg-[length:20px]"
        name=""
        id=""
        value={siteConfigStore.config[elId]}
        onChange={(e) => {
          handleSelectChange(elId, e.target.value);
        }}
      >
        {SelectOptions}
      </select>
    </li>
  );
};

export default SelectList;
