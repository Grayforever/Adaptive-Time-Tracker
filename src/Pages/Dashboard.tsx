import LineGraphChart from "@/components/ui/Layout/LineChart";

const Dashboard = () => {
  const barChart = [
    { month: "Monday", sales: 186,fill:'blue' },
    { month: "Tuesday", sales: 305,fill:'blue' },
    { month: "Wednesday", sales: 237,fill:'blue' },
    { month: "Thursday", sales: 73,fill:'blue' },
    { month: "Friday", sales: 209,fill:'blue' },
    { month: "Saturday", sales: 214,fill:'blue' },
  ]

  return (
      <div className="p-5">
        <div className="px-[2vw] py-[3vh] flex">
          <h3 className="text-gray-400 text-1xl md:text-3xl">Dashboard</h3>

          <div className="ml-auto">
            
          </div>
        </div>
        <div className="bg-white w-full px-[2vw] py-[3vw] rounded-3xl">
        <LineGraphChart  data={barChart} datavaluestring={['sales']} xAxisKey={"month"}xAxisFullText={true} />
        </div>
      </div>
      );
};

export default Dashboard;
