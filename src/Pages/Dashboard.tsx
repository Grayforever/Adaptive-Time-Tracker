import DoughnutChat from "@/components/ui/Layout/DoughnutChart";
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
  const chartdata = [
    {
      data:"Profit",
      value:200,
      fill:'#4dd94d'
    },
    {
      data:"Loss",
      value:100,
      fill: "#ed3f40"
    },
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
        <div className="bg-white flex flex-wrap w-full px-[2vw] py-[3vw] my-4 rounded-3xl">
            <div className="w-full md:w-1/2 text-center">
              <h3 className="text-1xl md:text-2xl text-gray-500">Project By Duration</h3>
              <DoughnutChat data={chartdata} datavalue={"value"} datakeystring={"data"} sumtotal={300} totalText={"Sales Margin"}/></div>
            <div className="w-full md:w-1/2 text-center p-4">
              <ul className="">
                <li>◾️ Test Project</li>
                <li>◾️ Test Project</li>
              </ul>
            </div>
        </div>
      </div>
      );
};

export default Dashboard;
