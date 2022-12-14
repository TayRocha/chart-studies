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