
interface ColorPickerProps {
  value: string; 
  onChange: (color: string) => void; 
}

const NativeColorPicker = ({ value, onChange }: ColorPickerProps) => {
  return (
    <div className="flex items-center">
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-300 rounded-md"
        style={{ width: '30px', height: '30px' }}
      />
     
    </div>
  );
};

export default NativeColorPicker;