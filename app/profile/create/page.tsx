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
import { createProfileAction } from "@/actions/actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const CreateProfile = async () => {
  const user = await currentUser()
  if(user?.privateMetadata.hasProfile) redirect('/')
    
  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <div className="flex items-center gap-2">
            <UserPlus className="h-6 w-6" />
            <h1 className="text-2xl font-bold">Create New Profile</h1>
          </div>
        </CardHeader>
        <CardContent>
          <FormContainer action={createProfileAction}>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <FormInput
                  name="firstName"
                  label="First Name"
                  type="text"
                  placeholder="FName"
                />
                <FormInput
                  name="lastName"
                  label="Last Name"
                  type="text"
                  placeholder="Last name"
                />
                <FormInput
                  name="userName"
                  label="Username"
                  type="text"
                  placeholder="User name"
                />
              </div>

              {/* You can add more fields here */}
            </div>
            <CardFooter className="px-0 pt-6">
              <SubmitButton text="create profile" size="lg" className="" />
            </CardFooter>
          </FormContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateProfile;
