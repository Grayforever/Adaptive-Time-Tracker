import TaskSheet from "@/components/tables/time-sheet";
import TaskEntryForm from "../components/forms/time-entry-form/taskEntryForm";

const TimeTracker = () => {
  return (
    <div>
      <TaskEntryForm />
      <TaskSheet />
    </div>
  );
};

export default TimeTracker;
