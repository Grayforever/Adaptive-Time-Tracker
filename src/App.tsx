import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Button } from "./components/ui/button";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col justify-center items-center h-[100vh]">
        <div>
          <div className="flex  green-800 font-bold text-6xl">It's 12:30AM</div>
          <p className="text-center pt-1.5 font-medium">
            Ans I have no idea of what I'm doing
          </p>
        </div>
        <Button className="mt-4">Just Click Here</Button>
      </div>
    </QueryClientProvider>
  );
}

export default App;
