import markdown from "../../generated/docs/Datepicker.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "DatePicker",
  markdown,
  storybook: "components-selections-datepicker--basic",
  source: "DatePicker/DatePicker.tsx",
  example: `const [date, setDate] = useState(new Date());

  const changeDate = (dateIn) => {
    setDate(dateIn);
    showToast({
      message: "Date changed to: " + date.toLocaleString(),
      variation: "success",
    });
  };

  return <DatePicker selected={date} onChange={changeDate} />`,
} satisfies ComponentSource;
