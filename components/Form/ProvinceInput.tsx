import { Label } from "../ui/label";
import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { provinces } from "@/utils/provinces";

const ProvinceInput = ({ defaultValue }: { defaultValue?: string }) => {
  const name = "province";

  return (
    <div className="space-y-2">
      <Label className="capitalize" htmlFor={name}>
        {" "}
        {name}{" "}
      </Label>

      <Select
        defaultValue={defaultValue || provinces[0].PROVINCE_NAME}
        name={name}
        required
      >
        <SelectTrigger>
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Select Provinces</SelectLabel>
            {provinces.map((item, index) => (
              <SelectItem key={index} value={item.PROVINCE_NAME}>
                <span className="capitalize flex items-center gap-x-2">
                  {item.PROVINCE_NAME}
                </span>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
export default ProvinceInput;
