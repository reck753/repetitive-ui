import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repetitive-ui/shadcn/popover/popover";
import { Button } from "../button/Button";
import { cn } from "@repetitive-ui/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "@repetitive-ui/shadcn/calendar/calendar";
import { format } from "date-fns";
import { Matcher } from "react-day-picker";

type DateInputProps = {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: Matcher | Matcher[];
  fromYear?: number;
  toYear?: number;
};

export const DateInput = ({
  value,
  placeholder = "Pick a date",
  onChange,
  disabled,
  fromYear,
  toYear,
}: DateInputProps) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button
          variant={"outline"}
          type="button"
          className={cn(
            "pl-3 text-left font-normal w-full",
            !value && "text-muted-foreground"
          )}
        >
          {value ? format(value, "PPP") : <span>{placeholder}</span>}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          captionLayout="dropdown-buttons"
          onSelect={onChange}
          disabled={disabled}
          fromYear={fromYear}
          toYear={toYear}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
