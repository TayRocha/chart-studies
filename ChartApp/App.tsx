import React, {type PropsWithChildren} from 'react';
import {
  SafeAreaView, Text, View,
} from 'react-native';
import * as d3 from 'd3';
import StackedBarChart from './src/components/chart/chart';
import Chart from './src/components/chartExemple/chartExem';
import { center } from '@shopify/react-native-skia';

export type DataPoint = {
  date: number;
  value: number;
  categ: string;
};

export const originalData: DataPoint[]  = [
  {date: 1, value: 10000, categ: "assets"},
  {date: 1, value: 3000, categ: "debts"},
  {date: 2, value: 12000, categ: "assets"},
  {date: 2, value: 2000, categ: "debts"},
  {date: 3, value: 13000, categ: "assets"},
  {date: 3, value: 5000, categ: "debts"},
  {date: 4, value: 10000, categ: "assets"},
  {date: 4, value: 1000, categ: "debts"},
  {date: 5, value: 15000, categ: "assets"},
  {date: 5, value: 3000, categ: "debts"},
  {date: 6, value: 20000, categ: "assets"},
  {date: 6, value: 1000, categ: "debts"},
]
export type DataMediaType = {
  date: number;
  value: number;
};
export const dataMedia = [
  {date: 1, value: -7000},
  {date: 2, value: 10000},
  {date: 3, value: 8000},
  {date: 4, value: 9000},
  {date: 5, value: 12000},
  {date: 6, value: 1900},
]
const App = () => {
  
  return (
    <SafeAreaView style={{flex:1 , justifyContent:"center"}}>
      <View style={{display: 'flex', width: '100%', alignItems: "center"}}>
      <StackedBarChart data={originalData}/>
      </View>
    </SafeAreaView>
  );
};

export default App;
