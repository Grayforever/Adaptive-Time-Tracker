import { Cell, Label, Pie, PieChart } from "recharts";

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
  } from "@/components/ui/chart"

  interface chartdetails{
    data
    datavalue:string
    datakeystring:string
    sumtotal:number
    totalText:string
}
const chartConfig = {
    profit: {
        label: 'var',
        color: "hsl(var(--chart-1))"
    },
    date: {
      label: 'var',
      color: "hsl(var(--chart-2))"
  },
  } satisfies ChartConfig;

const DoughnutChat:React.FC<chartdetails> = ({data,datakeystring,datavalue,sumtotal,totalText}) => {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
    
  return (
    <ChartContainer
          config={chartConfig}
          className="w-full"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey={datavalue}
              nameKey={datakeystring}
              innerRadius={60}
              strokeWidth={5}
            >

              {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.fill ? entry?.fill:COLORS[index % COLORS.length]} /> // Apply colors
                  ))}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {sumtotal.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          {totalText}
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
  )
}

export default DoughnutChat