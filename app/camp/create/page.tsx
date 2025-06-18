import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { UserPlus } from "lucide-react"; // Make sure to install lucide-react
import FormInput from "@/components/Form/FormInput";
import { SubmitButton } from "@/components/Form/Buttons";
import FormContainer from "@/components/Form/FormContainer";
import { createLandmarkAction } from "@/actions/actions";
import CategoryInput from "@/components/Form/CategoryInput";
import TextareaInout from "@/components/Form/TextareaInout";
import ProvinceInput from "@/components/Form/ProvinceInput";
import Maps from "@/components/map";
import ImageInput from "@/components/Form/ImageInput";
// import MapLandmark from "@/components/map/MapLandmark";
 

const CreateCamp = async () => {
  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <div className="flex items-center gap-2">
            <UserPlus className="h-6 w-6" />
            <h1 className="text-2xl font-bold">Create LandMark</h1>
          </div>
        </CardHeader>
        <CardContent>
          <FormContainer action={createLandmarkAction}>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <FormInput
                  name="name"
                  label="Landmark Name"
                  type="text"
                  placeholder="Landmark Name"
                />
                {/* category */}
                <CategoryInput />
              </div>
              <TextareaInout name="description" />

              <div className="grid md:grid-cols-2 gap-4">
                <FormInput
                  name="price"
                  label="Price"
                  type="number"
                  placeholder="Price"
                />
                <ProvinceInput />
              </div>

              <ImageInput />

              <Maps />

              {/* You can add more fields here */}
            </div>
            <CardFooter className="px-0 pt-6">
              <SubmitButton text="Create Landmark" size="lg" className="" />
            </CardFooter>
          </FormContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateCamp;
