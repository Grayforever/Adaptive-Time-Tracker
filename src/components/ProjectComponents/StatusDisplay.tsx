import { Loader2 } from "lucide-react";

interface LoadingProps {
  message?: string;
}

export const Loading = ({ message = "Loading..." }: LoadingProps) => (
  <div className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-sm  bg-opacity-30">

    <div className="bg-white rounded-lg shadow-lg p-6 text-center max-w-xs">
      <Loader2 className="animate-spin h-8 w-8 text-blue-500 mx-auto mb-4" />
      <p className="text-gray-700">{message}</p>
    </div>
  </div>
);


interface SuccessProps {
  message?: string;
  onClose: () => void;
}

export const Success = ({ message = "Success!", onClose }: SuccessProps) => (
  <div className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-sm  bg-opacity-30">
    <div className="bg-white rounded-lg shadow-lg p-6 text-center max-w-xs">
      <p className="text-green-500 font-semibold">{message}</p>
      <button
        onClick={onClose}
        className="mt-4 px-4 py-2 bg-green-100 text-green-600 rounded hover:bg-green-200 transition-colors"
      >
        Close
      </button>
    </div>
  </div>
);

interface ErrorProps {
  message?: string;
  onClose: () => void;
}

export const Error = ({ message = "An error occurred.", onClose }: ErrorProps) => (
  <div className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-sm  bg-opacity-30">
    <div className="bg-white rounded-lg shadow-lg p-6 text-center max-w-xs">
      <p className="text-red-500 font-semibold">{message}</p>
      <button
        onClick={onClose}
        className="mt-4 px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors"
      >
        Close
      </button>
    </div>
  </div>
);