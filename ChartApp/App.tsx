import React, {type PropsWithChildren} from 'react';
import {
  SafeAreaView, Text, View,
} from 'react-native';
import * as d3 from 'd3';
import StackedBarChart from './src/components/chart/chart';
import Chart from './src/components/chartExemple/chartExem';
import { center } from '@shopify/react-native-skia';
import SChart from './src/components/chartExemple/chartExem';
import { NumberValue } from 'd3';

export type DataPoint = {
  id: string;
  date: string;
  profits: number;
  debts: number;
};
export type DataType = {
  id: string;
  date: NumberValue;
  profits: number;
  debts: number;
};

export const originalData: DataPoint[]  = [
  {id: "1", date:"2022-janeiro",  profits: 10000, debts: 3000},
  {id: "1", date:"2022-janeiro",  profits: 10000, debts: 3000},
  {id: "2", date:"2022-fevereiro",  profits: 10000, debts: 3000},
  {id: "3", date:"2022-marco",  profits: 10000, debts: 3000},
  {id: "4", date:"2022-abril",  profits: 10000, debts: 3000},
  {id: "5", date:"2022-maio",  profits: 10000, debts: 3000},
  {id: "6", date:"2022-junho",  profits: 10000, debts: 3000},
  {id: "7", date:"2022-julho",  profits: 10000, debts: 3000},
  {id: "8", date:"2022-agosto",  profits: 10000, debts: 3000},
  {id: "9", date:"2022-setembro",  profits: 10000, debts: 3000},
  {id: "10", date:"2022-outubro",  profits: 10000, debts: 3000},
  {id: "11", date:"2022-novembro",  profits: 10000, debts: 3000},
  {id: "12", date:"2022-dezembro",  profits: 10000, debts: 3000},
]
export const data: DataType[]  = [
  {id: "1", date:2022-1-1,  profits: 10000, debts: 3000},
  {id: "2", date:2022-2-1,  profits: 9000, debts: 5000},
  {id: "3", date:2022-3-1,  profits: 12000, debts: 1000},
  {id: "4", date:2022-4-1,  profits: 10000, debts: 6000},
  {id: "5", date:2022-5-1,  profits: 8000, debts: 4000},
  {id: "6", date:2022-6-1,  profits: 6000, debts: 4000},
  {id: "7", date:2022-7-1,  profits: 3000, debts: 4000},
  {id: "8", date:2022-8-1,  profits: 2000, debts: 1000},
  {id: "9", date:2022-9-1,  profits: 5000, debts: 1000},
  {id: "10", date:2022-10-1,  profits: 8000, debts: 3000},
  {id: "11", date:2022-11-1,  profits: 10000, debts: 3000},
  {id: "12", date:2022-12-1,  profits: 10000, debts: 2000},
]
export type DataMediaType = {
  date: number;
  value: number;
};
export const dataMedia = [
  {date: 0, value: 0},
  {date: 1, value: -7000},
  {date: 2, value: 10000},
  {date: 3, value: 8000},
  {date: 4, value: 9000},
  {date: 5, value: 10000},
  {date: 6, value: 1900},
  {date: 7, value: -7000},
  {date: 8, value: 10000},
  {date: 9, value: 8000},
  {date: 10, value: 9000},
  {date: 11, value: 10000},
  {date: 12, value: 1900},
  {date: 13, value: 0},
]
const App = () => {
  
  return (
    <SafeAreaView style={{flex:1 , justifyContent:"center"}}>
      <View style={{display: 'flex', width: '100%', alignItems: "center"}}>
      <SChart data={data}/>
      </View>
    </SafeAreaView>
  );
};

export default App;
