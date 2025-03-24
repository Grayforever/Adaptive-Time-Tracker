import React, { useState } from "react";

interface ListItem {
  id: string;
  name: string;
}

interface SearchFieldProps {
  items: ListItem[];
  placeholder?: string;
  emptyMessage?: string;
  onSelect: (selectedIds: string[]) => void; 
}

const SearchField = ({
  items,
  placeholder = "Search for a user...",
  emptyMessage = "No users found.",
  onSelect,
}: SearchFieldProps) => {
  const [searchTerm, setSearchTerm] = useState(""); 
  const [isOpen, setIsOpen] = useState(false); 
  const [selectedItems, setSelectedItems] = useState<ListItem[]>([]); 

  // Filter items based on the search term
  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedItems.some((selected) => selected.id === item.id)
  );

  const handleSelect = (id: string) => {
    const selectedItem = items.find((item) => item.id === id);
    if (selectedItem) {
      setSelectedItems((prev) => [...prev, selectedItem]); 
      setSearchTerm(""); 
      setIsOpen(true); 
    }
  };

  const handleRemove = (id: string) => {
    setSelectedItems((prev) => prev.filter((item) => item.id !== id));
  };

  React.useEffect(() => {
    onSelect(selectedItems.map((item) => item.id));
  }, [selectedItems]); 

  return (
    <div className="relative w-full">
      <div className="flex flex-wrap gap-2 mb-2">
        {selectedItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center bg-gray-200 px-2 py-1 rounded-md text-sm"
          >
            {item.name}
            <button
              onClick={() => handleRemove(item.id)}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Search Input */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setIsOpen(true); 
        }}
        onFocus={() => setIsOpen(true)} 
        onBlur={() => setTimeout(() => setIsOpen(false), 200)} 
        placeholder={placeholder}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
      />

      {/* Dropdown List */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 max-h-60 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className="p-2 cursor-pointer hover:bg-gray-100"
              >
                {item.name}
              </div>
            ))
          ) : (
            <div className="p-2 text-gray-500">{emptyMessage}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchField;