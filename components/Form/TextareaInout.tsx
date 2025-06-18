import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

const TextareaInout = ({
  name,
  LabelText,
  defaultValue,
}: {
  name: string;
  LabelText?: string;
  defaultValue?: string;
}) => {
  return (
    <div>
      <Label className="mb-1" htmlFor={name}>
        {LabelText || name}
      </Label>
      <Textarea
        id={name}
        name={name}
        defaultValue={defaultValue}
        rows={5}
        required
      />
    </div>
  );
};
export default TextareaInout;
