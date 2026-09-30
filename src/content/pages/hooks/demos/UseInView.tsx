import { Content } from "@jobber/components/Content";
import { Text } from "@jobber/components/Text";
import { useInView } from "@jobber/hooks/useInView";

export function UseInView() {
  const [ref, isInView] = useInView<HTMLDivElement>();
  return (
    <Content>
      <Text>{isInView ? "A wild donut appeared!" : "Scroll down"}</Text>
      <div style={{ height: 200, overflow: "auto" }}>
        <Content spacing="small">
          {[...Array(10).keys()].map((i) => (
            <div style={{ height: "var(--space-larger)", background: "var(--color-grey--lighter)" }} key={i} />
          ))}
          <div ref={ref}>
            <Text size="large">🍩🍩🍩🍩🍩🍩🍩🍩🍩</Text>
          </div>
        </Content>
      </div>
    </Content>
  );
}
