import React, {type PropsWithChildren} from 'react';
import {
  SafeAreaView, Text, View,
} from 'react-native';
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
  date: string;
  profits: number;
  debts: number;
};

export const lastYear: DataType[]  = [
  {id: "1", date:"2020/1/1",  profits: 0, debts: 0},
  {id: "2", date:"2020/2/1",  profits: 0, debts: 0},
  {id: "3", date:"2020/3/1",  profits: 0, debts: 0},
  {id: "4", date:"2021/4/1",  profits: 0, debts: 0},
  {id: "5", date:"2021/5/1",  profits: 0, debts: 0},
  {id: "6", date:"2021/6/1",  profits: 0, debts: 0},
  {id: "7", date:"2021/7/1",  profits: 0, debts: 0},
  {id: "8", date:"2021/8/1",  profits: 0, debts: 0},
  {id: "9", date:"2021/9/1",  profits: 0, debts: 0},
  {id: "10", date:"2021/10/1",  profits: 0, debts: 0},
  {id: "11", date:"2021/11/1",  profits: 0, debts: 0},
  {id: "12", date:"2021/12/1",  profits: 0, debts: 0},
]
export const data: DataType[]  = [
  {id: "1", date:"2020/1/1",  profits: 0, debts: 0},
  {id: "2", date:"2020/2/1",  profits: 0, debts: 0},
  {id: "3", date:"2020/3/1",  profits: 0, debts: 0},
  {id: "4", date:"2021/4/1",  profits: 0, debts: 0},
  {id: "5", date:"2021/5/1",  profits: 0, debts: 0},
  {id: "6", date:"2021/6/1",  profits: 0, debts: 0},
  {id: "7", date:"2021/7/1",  profits: 0, debts: 0},
  {id: "8", date:"2021/8/1",  profits: 0, debts: 0},
  {id: "9", date:"2021/9/1",  profits: 0, debts: 0},
  {id: "10", date:"2021/10/1",  profits: 0, debts: 0},
  {id: "11", date:"2021/11/1",  profits: 0, debts: 0},
  {id: "12", date:"2021/12/1",  profits: 0, debts: 0},
  {id: "13", date:"2022/1/1",  profits: 10000, debts: 3000},
  {id: "14", date:"2022/2/1",  profits: 9000, debts: 5000},
  {id: "15", date:"2022/3/1",  profits: 12000, debts: 1000},
  {id: "16", date:"2022/4/1",  profits: 10000, debts: 6000},
  {id: "17", date:"2022/5/1",  profits: 8000, debts: 4000},
  {id: "18", date:"2022/6/1",  profits: 6000, debts: 4000},
  {id: "19", date:"2022/7/1",  profits: 3000, debts: 4000},
  {id: "20", date:"2022/8/1",  profits: 2000, debts: 1000},
  {id: "21", date:"2022/9/1",  profits: 5000, debts: 1000},
  {id: "22", date:"2022/10/1",  profits: 8000, debts: 3000},
  {id: "23", date:"2022/11/1",  profits: 10000, debts: 3000},
  {id: "24", date:"2022/12/1",  profits: 10000, debts: 2000},
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
