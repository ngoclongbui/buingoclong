import React, { useEffect, useState } from "react";
import classes from "./converter.module.css";
import TokenSelected from "./TokenSelected";
import dataJson from "../assets/data/listData.json";
import listLogo from "../assets/listLogo";
import SwapButton from "./SwapButton";
import TokensToChoice from "./TokensToChoice";
import Result from "./Result";
import { Selection } from "../enums/converterEnum";
import ClickOutsideHandler from "./ClickOutsideHandler";
import Loading from "./Loading";
import WarningIcon from "../assets/WarningIcon";

const getData = (): { [key: string]: Token } => {
  const data: { [key: string]: Token } = {};
  for (let i = 0; i < dataJson.length; i++) {
    const token = dataJson[i];
    data[token.currency] = {
      name: token.currency,
      price: token.price,
      LogoComponent: listLogo[token.currency],
    };
  }
  return data;
};

export default function Converter(): React.JSX.Element {
  const [dataToken, setDataToken] = useState<{ [key: string]: Token }>({});
  const [sourceCurrency, setSourceCurrency] = useState<Token | null>(null);
  const [targetCurrency, setTargetCurrency] = useState<Token | null>(null);
  const [selection, setSelection] = useState<Selection | null>(null);
  const [quantity, setQuantity] = useState<string>("1");
  const [err, setErr] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      const data = getData();
      setDataToken(data);
      setSourceCurrency(data["ETH"]);
      setTargetCurrency(data["BUSD"]);
    }, 1500);
  }, []);

  const handleRevert = (): void => {
    if (!targetCurrency || !sourceCurrency) return;
    setSourceCurrency(targetCurrency);
    setTargetCurrency(sourceCurrency);
  };

  const handleTokenSelect = (token: Token): void => {
    if (!selection) return;
    if (selection === Selection.Source) {
      setSourceCurrency(token);
      setSelection(null);
    } else {
      setTargetCurrency(token);
      setSelection(null);
    }
  };

  const handleClickOutside = (): void => {
    setSelection(null);
  };

  const handleChangeSelection = (item: Selection | null): void => {
    setSelection(() => {
      if (selection && selection === item) {
        return null;
      } else {
        return item;
      }
    });
  };

  const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let value = e.target.value.replaceAll(",", "");
    const isDecimal = value.includes(".");
    if (!/^[0-9.]*$/.test(value) || (isDecimal && value.split(".").length > 2)) {
      if (!err) setErr(true);
      return;
    }
    const numberValue = Number(value);
    if (numberValue < 0 || value === "") return setQuantity("0");
    if (value.length > 1 && numberValue > 0 && !isDecimal) value = value.replace(/^0+/, "");
    if (value.length > 1 && numberValue === 0 && !isDecimal) value = "0";
    setErr(false);
    setQuantity(value);
  };

  const convertToLocaleNumber = (string: string): string => {
    const isDecimal = string.includes(".");
    if (isDecimal) {
      const [left, right] = string.split(".");
      return Number(left).toLocaleString("en-US") + "." + right;
    } else {
      return Number(string).toLocaleString("en-US");
    }
  };

  const value: number | string =
    sourceCurrency && targetCurrency ? (sourceCurrency?.price * Number(quantity)) / targetCurrency?.price : "...";
  const quantityLocale: string = convertToLocaleNumber(quantity);
  const valueLocal: string = typeof value === "number" ? convertToLocaleNumber(value.toString()) : value;

  return (
    <div className={classes.converter}>
      <input className={classes.input} value={quantityLocale} onChange={handleChangeQuantity} />
      <div className={`${classes.err} ${err ? classes.active : ""}`}>
        <WarningIcon color="red" />
        <span style={{ marginLeft: 10 }}>Can only use numbers and not negatives</span>
      </div>
      <ClickOutsideHandler onClickOutside={handleClickOutside}>
        <div className={classes.selectFrame}>
          {sourceCurrency ? (
            <TokenSelected
              value={sourceCurrency}
              type={Selection.Source}
              selection={selection}
              handleChangeSelection={handleChangeSelection}
            />
          ) : (
            <Loading />
          )}
          <SwapButton onClick={handleRevert} />
          {targetCurrency ? (
            <TokenSelected
              value={targetCurrency}
              type={Selection.Target}
              selection={selection}
              handleChangeSelection={handleChangeSelection}
            />
          ) : (
            <Loading />
          )}
        </div>
        {selection ? (
          <TokensToChoice dataToken={dataToken} handleTokenSelect={handleTokenSelect} />
        ) : (
          <Result value={valueLocal} />
        )}
      </ClickOutsideHandler>
    </div>
  );
}
