import { Card } from "@jobber/components/Card";
import { Content } from "@jobber/components/Content";
import { Text } from "@jobber/components/Text";
import { useOnKeyDown } from "@jobber/hooks/useOnKeyDown";
import { useState } from "react";

export function UseOnKeyDown() {
  const initialListText = "";
  const [listText, setListText] = useState(initialListText);
  const initialModifierText = "Press escape to clear this text";
  const [modifierText, setModifierText] = useState(initialModifierText);

  useOnKeyDown(
    (event: KeyboardEvent) => {
      setListText("You pressed '" + event.key + "'");
    },
    ["Shift", "Enter"],
  );
  useOnKeyDown(() => setModifierText("Removed. Press Control + z to undo."), "Escape");
  useOnKeyDown(() => setModifierText(initialModifierText), { key: "z", ctrlKey: true });

  return (
    <Content>
      <Card title="Shift or Enter Example">
        <Content>
          Press shift or enter.<pre>{listText}</pre>
        </Content>
      </Card>
      <Card title="With a Key modifier">
        <Content>
          <Text>A key can have a modifier. In this case, we show how to implement a ctrl+z workflow.</Text>
          <pre>{modifierText}</pre>
        </Content>
      </Card>
    </Content>
  );
}
