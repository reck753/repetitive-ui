import { Div } from "@repetitive-ui/primitives/div/Div";
import { Form } from "@repetitive-ui/primitives/form/Form";
import { DateInput } from "@repetitive-ui/primitives/input/DateInput";
import { GenderSelect } from "@repetitive-ui/primitives/select/GenderSelect";
import { CardContent } from "@repetitive-ui/primitives/card/Card";
import { Input } from "@repetitive-ui/primitives/input/Input";
import {
  SharedCardRoot,
  SharedCardHeader,
  SharedCardTitle,
  SharedCardDescription,
  SharedSubmitButton,
} from "../shared-auth/SharedAuth";
import { toServerDateString } from "@repetitive-ui/utils";

export type SignUpBasicInfo = {
  firstName?: string;
  lastName?: string;
  gender?: string | undefined;
  dateOfBirth?: string | undefined;
};

type SignUpBasicInfoFormProps = {
  form: SignUpBasicInfo;
  onFirstNameChange: (firstName: string) => void;
  onLastNameChange: (lastName: string) => void;
  onGenderChange: (gender: string) => void;
  onDateOfBirthChange: (dateOfBirth: string) => void;
  onSubmit: (e: React.FormEvent) => void;
};

const birthDateFromYear = 1900;

export const SignUpBasicInfoForm = ({
  form,
  onFirstNameChange,
  onLastNameChange,
  onGenderChange,
  onDateOfBirthChange,
  onSubmit,
}: SignUpBasicInfoFormProps) => {
  return (
    <SharedCardRoot>
      <SharedCardHeader>
        <SharedCardTitle>{"About You"}</SharedCardTitle>
        <SharedCardDescription>
          {"Tell us a bit about yourself"}
        </SharedCardDescription>
      </SharedCardHeader>
      <CardContent className="grid gap-4 pb-4">
        <Form onSubmit={onSubmit}>
          <Div className="flex flex-col gap-6">
            <Input
              placeholder="First Name"
              value={form.firstName ?? ""}
              onChange={onFirstNameChange}
              autoFocus={true}
            />
            <Input
              placeholder="Last Name"
              value={form.lastName ?? ""}
              onChange={onLastNameChange}
            />
            <GenderSelect value={form.gender} onChange={onGenderChange} />
            <DateInput
              value={form.dateOfBirth ? new Date(form.dateOfBirth) : undefined}
              placeholder="Date of Birth"
              onChange={(date) => {
                if (date) {
                  onDateOfBirthChange(toServerDateString(date));
                }
              }}
              disabled={(date) =>
                date > new Date() ||
                date < new Date(`${birthDateFromYear}-01-01`)
              }
              fromYear={birthDateFromYear}
              toYear={new Date().getFullYear()}
            />
            <SharedSubmitButton busy={false}>{"Continue"}</SharedSubmitButton>
          </Div>
        </Form>
      </CardContent>
    </SharedCardRoot>
  );
};
