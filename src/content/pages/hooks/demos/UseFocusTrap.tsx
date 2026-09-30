import { Button } from "@jobber/components/Button";
import { Checkbox } from "@jobber/components/Checkbox";
import { Content } from "@jobber/components/Content";
import { InputText } from "@jobber/components/InputText";
import { useFocusTrap } from "@jobber/hooks/useFocusTrap";
import { useState } from "react";

export function UseFocusTrap() {
  const [checked, setChecked] = useState(false);
  const trapRef = useFocusTrap<HTMLDivElement>(checked);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  return (
    <>
      <Checkbox checked={checked} onChange={setChecked} label="Trap focus" />
      <div ref={trapRef} tabIndex={0}>
        <Content>
          <InputText placeholder="First Name" name="firstName" value={firstName} onChange={setFirstName} />
          <InputText placeholder="Last Name" name="lastName" value={lastName} onChange={setLastName} />
          <Button label="Submit Form" submit />
        </Content>
      </div>
    </>
  );
}
