import { Card } from "@jobber/components/Card";
import { Content } from "@jobber/components/Content";
import { Text } from "@jobber/components/Text";
import { useResizeObserver } from "@jobber/hooks/useResizeObserver";

const customWidths = {
  small: 480,
  medium: 640,
  large: 768,
};

export function UseResizeObserverCustomSizes() {
  const [ref, { width = 0, exactWidth }] = useResizeObserver<HTMLDivElement>({
    widths: customWidths,
  });

  return (
    <div ref={ref}>
      <Card title={`Width: ${getCurrentWidth()}`} accent={getAccent()}>
        <Content>
          <Text>Width Step: {width}</Text>
          <Text>Exact Width: {exactWidth}</Text>
        </Content>
      </Card>
    </div>
  );

  function getAccent() {
    if (width < customWidths.medium) return "red";
    if (width < customWidths.large) return "green";
    return "indigo";
  }

  function getCurrentWidth() {
    return Object.entries(customWidths).find(([, size]) => size === width)?.[0];
  }
}
