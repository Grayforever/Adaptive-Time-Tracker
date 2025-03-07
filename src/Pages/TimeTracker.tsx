import TimeEntryForm from "@/components/forms/time-entry-form";
import AppLayout from "@/components/ui/Layout/AppLayout";
import NavBar from "@/components/ui/Layout/NavBar";

const TimeTracker = () => {
  return(
    <AppLayout >
      <NavBar></NavBar>
      <TimeEntryForm />
    </AppLayout>
  );
};

export default TimeTracker;
