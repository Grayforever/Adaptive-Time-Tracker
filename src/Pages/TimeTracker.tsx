import TimeEntryForm from "@/components/forms/time-entry-form";
import NavBar from "@/components/ui/Layout/NavBar";

const TimeTracker = () => {
  return (
    <div>
      <NavBar></NavBar>
      <TimeEntryForm />
    </div>
  );
};

export default TimeTracker;
