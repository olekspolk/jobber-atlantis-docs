import React, { useState } from "react";
import {
  Autocomplete,
  type OptionLike,
  defineMenu,
} from "@jobber/components/Autocomplete";
import { Button } from "@jobber/components/Button";
import { Content } from "@jobber/components/Content";
import { Heading } from "@jobber/components/Heading";

export const AutocompleteEmptyActionsExample = () => {
  const [value, setValue] = useState<OptionLike | undefined>();
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);
  const [newService, setNewService] = useState("");

  return (
    <Content>
      <Heading level={5}>Empty actions</Heading>
      <Autocomplete
        placeholder="Try a term with no matches"
        value={value}
        onChange={setValue}
        inputValue={inputValue}
        onInputChange={setInputValue}
        emptyStateMessage="No services found"
        emptyActions={[
          {
            type: "action",
            label: "Create service",
            onClick: () => setOpen(true),
          },
        ]}
        menu={defineMenu<OptionLike>([
          {
            type: "options",
            options: [
              { label: "Drain Cleaning" },
              { label: "Pipe Replacement" },
              { label: "Sewer Line Repair" },
            ],
          },
        ])}
      />
      {open ? (
        <Content>
          <Heading level={5}>Create service</Heading>
          <input
            value={newService}
            onChange={e => setNewService(e.target.value)}
          />
          <Button label="Create" onClick={() => setOpen(false)} />
        </Content>
      ) : null}
    </Content>
  );
};
