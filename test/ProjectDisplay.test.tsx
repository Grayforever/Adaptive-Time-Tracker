import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProjectDisplayCard from '../src/components/ProjectComponents/Modals/ProjectDisplayCard';


const mockProps = {
  name: 'Test Project',
  priority: 'High',
  color: '#ff0000',
  assignee: 'John Doe',
  deleteCard: jest.fn(),
  editCard: jest.fn(),
};

describe('ProjectDisplayCard', () => {
  it('renders project information correctly', () => {
    render(<ProjectDisplayCard {...mockProps} />);
    
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    
    expect(screen.getByText('Priority: High')).toBeInTheDocument();
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('calls deleteCard when delete button is clicked', () => {
    render(<ProjectDisplayCard {...mockProps} />);
    
    const deleteButton = screen.getByRole('button', { name: /delete project/i });
    
    fireEvent.click(deleteButton);
    
    expect(mockProps.deleteCard).toHaveBeenCalledTimes(1);
  });

  it('calls editCard when edit button is clicked', () => {
    render(<ProjectDisplayCard {...mockProps} />);
    
    const editButton = screen.getByRole('button', { name: /edit project/i });
    

    fireEvent.click(editButton);
    
    expect(mockProps.editCard).toHaveBeenCalledTimes(1);
  });

  it('displays the correct color indicator', () => {
    render(<ProjectDisplayCard {...mockProps} />);
    
    const colorIndicator = document.querySelector('div.rounded-full');
    
    expect(colorIndicator).toHaveStyle('background-color: #ff0000');
  });

  it('renders tooltips for action buttons', async () => {
    render(<ProjectDisplayCard {...mockProps} />);
    
  
    expect(screen.getByText('View Status')).toBeInTheDocument();
    expect(screen.getByText('Edit project')).toBeInTheDocument();
    expect(screen.getByText('Delete project')).toBeInTheDocument();
  });
});