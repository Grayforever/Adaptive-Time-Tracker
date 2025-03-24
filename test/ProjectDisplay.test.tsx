import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProjectDisplayCard from '../src/components/ProjectComponents/Modals/ProjectDisplayCard';

const mockProps = {
  name: 'Test Project',
  color: '#ff0000',
  duration: '2 hours',
  deleteCard: jest.fn(),
  editCard: jest.fn(),
};

describe('ProjectDisplayCard', () => {
  it('renders project information correctly', () => {
    render(<ProjectDisplayCard {...mockProps} />);

    // Check if the project name is displayed
    expect(screen.getByText('Test Project')).toBeInTheDocument();

    // Check if the duration is displayed
    expect(screen.getByText('2 hours')).toBeInTheDocument();

    // Check if the color indicator is rendered with the correct background
    const colorIndicator = screen.getByRole('status');
    expect(colorIndicator).toHaveStyle('background-color: rgb(255, 0, 0)'); // Convert hex to RGB
  });

  it('calls deleteCard when delete button is clicked', () => {
    render(<ProjectDisplayCard {...mockProps} />);

    // Find the delete button using its tooltip label
    const deleteButton = screen.getByLabelText('Delete project');

    // Simulate a click on the delete button
    fireEvent.click(deleteButton);

    // Ensure the deleteCard function was called
    expect(mockProps.deleteCard).toHaveBeenCalledTimes(1);
  });

  it('calls editCard when edit button is clicked', () => {
    render(<ProjectDisplayCard {...mockProps} />);

    // Find the edit button using its tooltip label
    const editButton = screen.getByLabelText('Edit project');

    // Simulate a click on the edit button
    fireEvent.click(editButton);

    // Ensure the editCard function was called
    expect(mockProps.editCard).toHaveBeenCalledTimes(1);
  });

  it('displays the correct color indicator', () => {
    render(<ProjectDisplayCard {...mockProps} />);

    // Use a role-based query to find the color indicator
    const colorIndicator = screen.getByRole('status');
    expect(colorIndicator).toHaveStyle('background-color: rgb(255, 0, 0)'); // Convert hex to RGB
  });

  it('renders tooltips for action buttons', async () => {
    render(<ProjectDisplayCard {...mockProps} />);

    // Hover over the View Status button
    const viewStatusButton = screen.getByLabelText('View Status');
    fireEvent.mouseOver(viewStatusButton);
    expect(await screen.findByText('View Status')).toBeInTheDocument();

    // Hover over the Edit button
    const editButton = screen.getByLabelText('Edit project');
    fireEvent.mouseOver(editButton);
    expect(await screen.findByText('Edit project')).toBeInTheDocument();

    // Hover over the Delete button
    const deleteButton = screen.getByLabelText('Delete project');
    fireEvent.mouseOver(deleteButton);
    expect(await screen.findByText('Delete project')).toBeInTheDocument();
  });
});