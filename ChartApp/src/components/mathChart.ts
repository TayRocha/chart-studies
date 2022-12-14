import { Dimensions } from "react-native";

export const { width, height } = Dimensions.get("window");
export const marginHorizontal = 32;
export const widthWrapper = width - (marginHorizontal * 2);
export const heightWrapper = 248;
export const widthContentDisplayed = widthWrapper - 16;
export const heightBar = 240;
export const heightContentBar = 200;
export const quantBarDisplayed = 6;
export const widthBar = (widthContentDisplayed/ quantBarDisplayed);
export const widthContentChart = (n:number) => widthBar * n;
export const yAxis = heightContentBar / 2;
export const x1Line = widthBar/2 - 4;
export const x2Line = (n:number) => widthContentChart(n) - (widthBar/2 + 4);
export const safeAreaChart = 20; //percentual
export const heightLine = heightContentBar -(safeAreaChart * 2) + 16;
export const maxHeightData = (heightContentBar/2 * (100 - safeAreaChart)) / 100;
export const year = 2022;
export const padding = 8;
export const textBarHeight = heightContentBar + 28;
export const LABEL:{[key:number]:string} = {
    1: "jan",
    2: "fev",
    3: "mar",
    4: "abr",
    5: "mai",
    6: "jun",
    7: "jul",
    8: "ago",
    9: "set",
    10: "out",
    11: "nov",
    12: "dez"
  }
export const getMonth = (date:string) => {
    const d = date.split("/", 3);
    return parseInt(d[1]);
}
export const getYear = (date:string) => {
    const d = date.split("/", 3);
    return parseInt(d[0]);
}
