type WorkoutSearchProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function WorkoutSearch({ value, onChange, placeholder = "Search workouts or tags" }: WorkoutSearchProps) {
  return (
    <label className="relative block w-full">
      <span className="sr-only">Search workouts by name or tag</span>
      <svg aria-hidden="true" viewBox="0 0 20 20" className="pointer-events-none absolute left-[14px] top-1/2 h-4 w-4 -translate-y-1/2 fill-none stroke-[#9299a6] stroke-[1.7]"><circle cx="8.5" cy="8.5" r="5.5"/><path d="m12.5 12.5 4 4"/></svg>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        className="h-[44px] w-full rounded-[12px] border border-[#262932] bg-[#14161c] pl-[40px] pr-4 text-[14px] text-[#e3e4e8] outline-none placeholder:text-[#737b88] transition-colors focus:border-[#657522]"
      />
    </label>
  );
}
