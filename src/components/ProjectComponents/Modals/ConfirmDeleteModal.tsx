import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react"; // Import a spinner icon
import { ConfirmModalProps } from "@/types";

function ConfirmModal({
  isOpen,
  onConfirm,
  onCancel,
  message,
  isLoading, // Add isLoading prop to track deletion progress
}: ConfirmModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={() => {}} modal>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            <span>Are you sure you want to delete </span>
            <br />
            <span className="text-black">{message}</span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          {/* Cancel Button */}
          <Button variant="outline" onClick={onCancel} disabled={isLoading}>
            Cancel
          </Button>

          {/* Delete Button with Loader */}
          <Button
            onClick={onConfirm}
            className="ml-2 bg-red-500 hover:bg-red-600 text-white"
            disabled={isLoading} // Disable the button while loading
          >
            {isLoading ? (
              <Loader2 className="animate-spin h-4 w-4 mr-2" /> // Show spinner when loading
            ) : (
              "Delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmModal;