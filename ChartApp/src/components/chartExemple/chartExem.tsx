import { scaleLinear } from 'd3-scale';
import { curveMonotoneX, line } from 'd3-shape';
import * as React from 'react';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { DataType } from '../../../App';
import Bar from '../bar/bar';
import BottomLabels from '../bottomLabels/bottomLabels';
import InfoCard from '../infocard/infoCard';
import Point from '../point/point';
import * as c from '../mathChart';

export interface ISChartProps extends React.PropsWithChildren{
  data: DataType[];
}
type netWorthType = {
  month: number,
  value: number
}

export default function SChart ({data}: ISChartProps) {
  const [selectedBar, setselectedBar] = useState(-1);
  const [lastYearDataAvailable] = useState(false)
  
  const years = new Set(data.map(item => c.getYear(item.date)))
  const yearsLabels = () => {
    let points: number[] = []
    let year: number[] = []
    years.forEach((y) => {
      year.push(y)
      points.push(data.findIndex((d) => c.getYear(d.date) == y))
    })
    return points.map((p, i) => i+1 < points.length? 
    {year:year[i], bars:points[i+1] - p, x:p} : 
    {year: year[i], bars:data.length - p, x:p});
  }
  console.log(yearsLabels())
  
  const max = Math.max(...data.map(val => Math.max(val.profits, val.debts)));
  const min = Math.min(...data.map(val => Math.min(val.profits, val.debts)));
  const yScale = scaleLinear().domain([0, max]).range([0 , c.maxHeightData]);
  const xScale = scaleLinear().domain([1, 24]).range([0, c.widthContentChart(data.length) - c.widthBar]);
  const xLineScale = scaleLinear().domain([1, 24]).range([c.x1Line, c.x2Line(data.length)]);
  const yLineScale = scaleLinear().domain([(max * -1), max]).range([c.heightLine, c.safeAreaChart]);
  const netWorth: netWorthType[] = data.map((item, i) => {return {month:i + 1, value:item.profits - item.debts}});
  netWorth.unshift({month:0,value: 0});
  netWorth.push({month: c.widthContentChart(data.length), value: 0});
  
  const curvedLine = line<netWorthType>()
  .x((d, i) => i == 0 || i == 25 ? d.month : xLineScale(d.month))
  .y(d => yLineScale(d.value))
  .curve(curveMonotoneX)(netWorth) as string;
  
  const onPress=(x: number)=>{
    const filterArray = data.filter((item, i) => xScale(i + 1) < x);
    console.log("filter")
    const itemSelected = filterArray && filterArray.pop()
    console.log("pop")
    setselectedBar(data.indexOf(itemSelected!))
    console.log(itemSelected)
  }
  return (
    <View style={{ width: c.widthWrapper-8, borderColor:"#D6DEF1", borderWidth: 8, borderRadius:8, backgroundColor:"#D6DEF1"}}>
    <ScrollView contentOffset={{x:(c.widthWrapper - 16)*2, y: 0}} snapToInterval={c.widthWrapper - 16} decelerationRate={"fast"} showsHorizontalScrollIndicator={false} horizontal={true} scrollEnabled={true} style={{maxWidth: c.widthContentDisplayed, width: c.widthContentDisplayed, borderRadius:8, overflow: "hidden"}}>
      <Svg width={c.widthContentChart(data.length)} height={c.heightBar + 26} style={{borderRadius:8}}>
          
        {data.map((item, i) => (
          <Bar key={`bar-${i}`} 
          selected={selectedBar} 
          x={xScale(i + 1)} 
          yPositive={yScale(item.profits)} 
          yNegative={yScale(item.debts)} 
          barId={i} 
          label={c.LABEL[c.getMonth(item.date)]}
          onPress={(e) => onPress(e.nativeEvent.locationX)}/>
        ))}

        <Path 
        onPress={(e) => {onPress(e.nativeEvent.locationX)}} 
        fill='none' 
        stroke={"#191919"} 
        d={`${curvedLine}`} 
        strokeWidth={2}/>

        { data.map((item, i) => (
          <Point 
          key={`point-${i}`} 
          selected={selectedBar} 
          x={xLineScale(i + 1)} 
          y={yLineScale(item.profits - item.debts)} pointId={i}/>
        ))

        }
        {yearsLabels().map((label, i)=>(
          <BottomLabels key={`bottom-label-${i}`} bars={label.bars} x={xScale(label.x + 1)} year={label.year}/>
        ))}
        {
          !lastYearDataAvailable &&
          <>
            <InfoCard xWrapper={0} xCard={20} widthWrapper={c.widthWrapper} heightWrapper={c.heightBar}/>
            <InfoCard xWrapper={c.widthWrapper} xCard={c.widthWrapper + 4} widthWrapper={c.widthWrapper} heightWrapper={c.heightBar}/>
          </>
        }
      </Svg>
    </ScrollView>
    </View>
  );
}
