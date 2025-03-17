export interface Project {
  id: string;
  name: string;
  assignee: string;
  priority: "Normal" | "Urgent" | "High";
}

export interface ConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
}

export interface ConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
}

export interface EditProjectProps {
  isOpen: boolean;
  onUpdate: (updatedProject: Project) => void;
  onCancel: () => void;
  projectInitialState: Project | null;
}

export interface ProjectCardProps {
  name: string;
  priority: string;
  color: string;
  assignee: string;
  deleteCard: () => void;
  editCard: () => void;
}

export interface ProjectTableProps {
  color:string
  created_at:Date
  created_by:number
  duration:string
  favorite:boolean
  id?:number
  name:string
  public:boolean
  status:string
  updated_at:Date
}

export interface ProjectCardProps {
  name: string;
  priority: string;
  color: string;
  assignee: string;
  deleteCard: () => void;
  editCard: () => void;
}

export type Priority = "Normal" | "Urgent" | "High";
