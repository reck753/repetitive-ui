"use client";

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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  FormField,
  FormItem,
  Form as ReactForm,
} from "@repetitive-ui/primitives/form/ReactForm";

export type SignUpBasicInfo = {
  firstName?: string;
  lastName?: string;
  gender?: string | undefined;
  dateOfBirth?: string | undefined;
};

const FormSchema = z.object({
  "first-name": z.string(),
  "last-name": z.string(),
  gender: z.string(),
  "date-of-birth": z.date(),
});

type SignUpBasicInfoFormProps = {
  onSubmit: (data: z.infer<typeof FormSchema>) => void;
};

const birthDateFromYear = 1900;

export const SignUpBasicInfoForm = ({ onSubmit }: SignUpBasicInfoFormProps) => {
  const reactForm = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  return (
    <SharedCardRoot>
      <SharedCardHeader>
        <SharedCardTitle>{"About You"}</SharedCardTitle>
        <SharedCardDescription>
          {"Tell us a bit about yourself"}
        </SharedCardDescription>
      </SharedCardHeader>
      <CardContent className="grid gap-4 pb-4">
        <ReactForm {...reactForm}>
          <Form onSubmit={reactForm.handleSubmit(onSubmit)}>
            <Div className="flex flex-col gap-6">
              <FormField
                control={reactForm.control}
                name="first-name"
                render={({ field }) => (
                  <Input
                    placeholder="First Name"
                    defaultValue={field.value ?? ""}
                    onChange={field.onChange}
                    autoFocus={true}
                  />
                )}
              />
              <FormField
                control={reactForm.control}
                name="last-name"
                render={({ field }) => (
                  <Input
                    placeholder="Last Name"
                    defaultValue={field.value ?? ""}
                    onChange={field.onChange}
                  />
                )}
              />
              <FormField
                control={reactForm.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <GenderSelect
                      onChange={field.onChange}
                      defaultValue={field.value}
                    />
                  </FormItem>
                )}
              />
              <FormField
                control={reactForm.control}
                name="date-of-birth"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <DateInput
                      value={field.value}
                      placeholder="Date of Birth"
                      onChange={field.onChange}
                      disabled={(date) =>
                        date > new Date() ||
                        date < new Date(`${birthDateFromYear}-01-01`)
                      }
                      fromYear={birthDateFromYear}
                      toYear={new Date().getFullYear()}
                    />
                  </FormItem>
                )}
              />
              <SharedSubmitButton busy={false}>{"Continue"}</SharedSubmitButton>
            </Div>
          </Form>
        </ReactForm>
      </CardContent>
    </SharedCardRoot>
  );
};
