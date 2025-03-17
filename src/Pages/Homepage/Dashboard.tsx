import { getAllProjects } from "@/API/Projects/ProjectAPis";
import { useSockets } from "@/API/Websockets/WebSocketsInterface";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import DoughnutChat from "@/components/ui/Layout/DoughnutChart";
import LineGraphChart from "@/components/ui/Layout/LineChart";
import { ProjectTableProps } from "@/types";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [projectList, setProjectList] = useState<ProjectTableProps[]>([]);
  const [chartdata, setchartdata] = useState<{ status: string; value: number }[]>([]);
  const [barChart, setbarChart] = useState<{ month: string; project: number }[]>([]);
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];


  useEffect(() => {
    callGetRequest();
  }, []);

  useEffect(() => {
    GroupProjectByStatusToChart();
  }, [projectList]);

    const [message, setMessage] = useState("");
    const [isOpened, setisOpened] = useState(false);
  
    const value = useSockets()
    useEffect(()=>{
      if(value?.message){
        setisOpened(true)
        setMessage(value?.message)
      }
    },[value])

  const GroupProjectByStatusToChart = () => {
    setchartdata(() => {
      const newList = projectList.reduce(
        (prev: { status: string; value: number,fill:string }[], curr) => {
          const existingItem = prev.find((item) => item.status === curr.status);

          if (existingItem) {
            existingItem.value += 1;
          } else {
            prev.push({
              status: curr.status,
              value: 1,
              fill:  curr.status=="Active"?"#42cd51":"#f53a3a"
            });
          }
          return prev;
        },
        []
      );
      return newList;
    });

    //set line Graph
    setbarChart(()=>{
      const projectsByMonth = projectList.reduce((acc:{ month: string; project: number }[], project) => {
        const date = new Date(project.created_at);
        const monthName = monthNames[date.getMonth()] +" "+ date.getDate();
      
        const existingEntry = acc.find(entry => entry.month === monthName);
        if (existingEntry) {
          existingEntry.project += 1;
        } else {
          acc.push({ month: monthName, project: 1 });
        }
      
        return acc;
      }, []);
      return projectsByMonth
    })
  };

  const callGetRequest = async () => {
    try {
      const apiResponse = await getAllProjects();
      console.log(apiResponse)
      if(apiResponse){
        const { data } = apiResponse
        setProjectList(data);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };
  return (
    <div className="p-5">
      <div className="px-[2vw] py-[3vh] flex">
        <h3 className="text-gray-400 text-1xl md:text-3xl">Dashboard</h3>

        <div className="ml-auto"></div>
      </div>
      <div className="bg-white w-full px-[2vw] py-[3vw] rounded-3xl">
        <LineGraphChart
          data={barChart}
          datavaluestring={["project"]}
          xAxisKey={"month"}
          xAxisFullText={true}
        />
      </div>
      <div className="bg-white flex flex-wrap w-full px-[2vw] py-[3vw] my-4 rounded-3xl">
        <div className="w-full md:w-1/2 text-center">
          <h3 className="text-1xl md:text-2xl text-gray-500">
            Project By Status
          </h3>
          <DoughnutChat
            data={chartdata}
            datavalue={"value"}
            datakeystring={"status"}
            sumtotal={projectList.length}
            totalText={"Projects"}
          />
        </div>
        <div className="w-full md:w-1/2 text-center">
          <div className="flex flex-wrap max-h-[296px] overflow-y-auto">
          {
            projectList.map((item)=>{
              return (
               <div className="relative mx-[3vw] my-[2vh]" key={item.id}>
                 <p className="text-2xl text-left" style={{color:item.color}}><strong>{item.name}</strong></p>
                  <p className="text-left text-gray-500">
                  <span><small>{item.status}</small></span> &nbsp;
                    <span><small>Time: {item.duration}</small></span> &nbsp;
                    {/* <span><small>{item.public?'Public':"Private"}</small></span>&nbsp; */}
                    {/* <span><small>{item.status}</small></span> */}
                    </p>
               </div>
              )
            })
          }

          </div>
        </div>
      </div>

              {/* Adding the Websockets Prompt */}
              <AlertDialog open={isOpened} onOpenChange={setisOpened}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Have You Heard👂?</AlertDialogTitle>
            <AlertDialogDescription>
              {message}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Dashboard;
