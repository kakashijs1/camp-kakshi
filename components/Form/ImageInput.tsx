import { Label } from "../ui/label"
import { Input } from "../ui/input"

const ImageInput = () => {

    const name = 'image'
  return (
    <div className="flex flex-col gap-y-2">
        <Label className="capitalize ">
            {name}
        </Label>

        <Input 
        id={name}
        name={name}
        type="file"
        accept="image/*"
        required
        />
    </div>
  )
}
export default ImageInput