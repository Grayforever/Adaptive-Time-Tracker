export interface Project {
  id:string;
  name: string;
  duration: string;
  color: string;
  created_by: number|string;
  assignees_User_Ids: number[]|string[];
  workgroup_ids: number[]|null;
}


export interface ConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
  isLoading:boolean
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
  color: string;
  duration:string
  deleteCard: () => void;
  editCard: () => void;
}



export interface Users {
  name:string;
  id:string
  
}

export interface addProject{
  name: string,
  assignees: string[],
  duration: string,
  color:string,
  created_by:string
}

export type Priority = "Normal" | "Urgent" | "High";
