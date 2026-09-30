import { Button } from "@jobber/components/Button";
import { Card } from "@jobber/components/Card";
import { Content } from "@jobber/components/Content";
import { useRefocusOnActivator } from "@jobber/hooks/useRefocusOnActivator";
import { useState } from "react";

export function UseRefocusOnActivator() {
  const [open, setOpen] = useState(false);
  useRefocusOnActivator(open);
  return (
    <Content>
      <Button label="Click me" onClick={() => setOpen(true)} />
      {open && (
        <Card onClick={() => setOpen(false)}>
          <Content>Huzzah! Click me to hide me and watch me return the focus on the button</Content>
        </Card>
      )}
    </Content>
  );
}
