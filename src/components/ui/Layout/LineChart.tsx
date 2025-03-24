import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
  } from "@/components/ui/chart"
import { useMemo } from "react";

  interface chartdetails{
        //@ts-expect-error Michael please fix this

    data
    datavaluestring:string[]
    xAxisKey:string
    xAxisFullText?:boolean
}
const chartConfig = {
    profit: {
        label: 'var',
        color: "hsl(var(--chart-1))"
    },
  } satisfies ChartConfig;

const LineGraphChart:React.FC<chartdetails> = ({data,datavaluestring,xAxisKey,xAxisFullText}) => {

  const randomColors = useMemo(() => {
    return datavaluestring.reduce((colors, item) => {
          //@ts-expect-error Michael please fix this

      colors[item] =
        "#" +
        Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, "0");
      return colors;
    }, {});
  }, [datavaluestring]);

    
  return (
    <ChartContainer config={chartConfig} className="w-full">
          <LineChart
            accessibilityLayer
            data={data}
            margin={!xAxisFullText?{
              top: 10,
              left: 45,
              right: 45,
            }:{
              left: 60,
              right: 60,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={xAxisKey}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={!xAxisFullText?(value) => value.slice(0, 3):(value) => value}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            {
              datavaluestring.map((item ,index) => 
              (
                <Line
                key={item+index} // Add a unique key for each element in the map
                dataKey={item}
                type="monotone"
                  //@ts-expect-error Michael please fix this

                stroke={randomColors[item]}
                strokeWidth={2}
                dot={false}
                >
                     <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
                </Line>
            ))
            }
          </LineChart>
        </ChartContainer>
  )
}

export default LineGraphChart