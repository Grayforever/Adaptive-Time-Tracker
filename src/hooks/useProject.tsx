import { useState} from 'react'
import { Project } from '@/types';

 // Please this is a dummy data for projects

 const dummyProjects: Project[] = [
    {
        id: '1',
        name: 'Website Redesign',
        assignee: 'Alice Johnson',
        priority: 'High',
    },
    {
        id: '2',
        name: 'Mobile App Development',
        assignee: 'Bob Smith',
        priority: 'Urgent',
    },
    {
        id: '3',
        name: 'SEO Optimization',
        assignee: 'Charlie Brown',
        priority: 'Normal',
    },
    {
        id: '4',
        name: 'Marketing Campaign',
        assignee: 'Dana White',
        priority: 'Urgent',
    },
    {
        id: '5',
        name: 'Data Analysis Project',
        assignee: 'Eva Green',
        priority: 'Normal',
    },
];

function useProject() {
   
    const [projects,setProjects] = useState<Project[]>(dummyProjects)
    const [loading] = useState<boolean>(false)
    const [error] = useState<boolean>(false)

    // this is for the backend to get data
  /*
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/projects');
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data: Project[] = await response.json();
        setProjects(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);
  */

    return {projects,error,loading,setProjects}
 

   


}

export default useProject