import React from 'react'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "../chart";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

interface chartdetails{
    data
    datavaluestring:string
    datakeystring:string
}
const chartConfig = {
    desktop: {
      label: '',
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig

const HorizontalBarChart:React.FC<chartdetails> = ({data,datakeystring,datavaluestring}) => {
   
  return (
    <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={data}
            layout="vertical"
            margin={{
              left: 20,
            }}
          >
            <XAxis type="number" dataKey={datavaluestring} hide />
            <YAxis
              dataKey={datakeystring}
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar  dataKey={datavaluestring} fill="var(--color-desktop)" radius={5} />
          </BarChart>
        </ChartContainer>
  )
}

export default HorizontalBarChart