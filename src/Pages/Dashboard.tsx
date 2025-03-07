import HorizontalBarChart from "@/components/ui/Layout/HorizontalBarChart";

const Dashboard = () => {
  const barChart = [
    { month: "Monday", sales: 186 },
    { month: "Tuesday", sales: 305 },
    { month: "Wednesday", sales: 237 },
    { month: "Thursday", sales: 73 },
    { month: "Friday", sales: 209 },
    { month: "Saturday", sales: 214 },
  ]

  return <>
     <HorizontalBarChart data={barChart} datavaluestring={"sales"} datakeystring={"month"} />
  </>;
};

export default Dashboard;
