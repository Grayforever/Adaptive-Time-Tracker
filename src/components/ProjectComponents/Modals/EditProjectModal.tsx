import  { useState, useEffect } from 'react';
import { Project } from '../../../types';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EditProjectProps } from '../../../types';


type Priority = 'Normal' | 'Urgent' | 'High';

function EditProjectModal({ isOpen, onUpdate, onCancel, projectInitialState }: EditProjectProps) {
    const [name, setName] = useState('');
    const [priority, setPriority] = useState<Priority | ''>('');
    const [assignee, setAssignee] = useState('');

    useEffect(() => {
        if (projectInitialState) {
            setName(projectInitialState.name);
            setPriority(projectInitialState.priority);
            setAssignee(projectInitialState.assignee);
        } else {
            setName('');
            setPriority('');
            setAssignee('');
        }
    }, [projectInitialState]);

    const handleSave = () => {
        if (name.trim() && priority && assignee.trim()) {
            const updatedProject: Project = {
                ...projectInitialState!,
                name,
                priority,
                assignee,
            };

         
            onUpdate(updatedProject);
        } else {
            alert('Please fill in all fields.');
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onCancel} modal>
            <DialogContent className="sm:max-w-[450px] bg-white rounded-lg shadow-lg overflow-hidden">
                <DialogHeader className="p-6 border-b border-gray-200">
                    <DialogTitle className="text-xl font-semibold text-gray-800">Edit Project</DialogTitle>
                    <DialogDescription className="mt-2 text-gray-700 text-base">
                        Update the details of the selected project.
                    </DialogDescription>
                </DialogHeader>

                <div className="p-6 space-y-4">
                    <div>
                        <Label htmlFor="name">Project Name</Label>
                        <Input
                            id="name"
                            placeholder="Name of your project"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="assignee">Project Assignee</Label>
                        <Input
                            id="assignee"
                            placeholder="Name of your assignee"
                            value={assignee}
                            onChange={(e) => setAssignee(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="priority">Priority</Label>
                        <Select value={priority} onValueChange={(value) => setPriority(value as Priority)}>
                            <SelectTrigger id="priority">
                                <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                                <SelectItem value="High">High</SelectItem>
                                <SelectItem value="Urgent">Urgent</SelectItem>
                                <SelectItem value="Normal">Normal</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <DialogFooter className="flex justify-end p-4 border-t border-gray-200">
                    <Button variant="outline" onClick={onCancel} className="mr-2">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md"
                    >
                        Save Changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default EditProjectModal;