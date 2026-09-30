import React from "react";
import { SegmentedControl } from "@jobber/components/SegmentedControl";
import { Icon } from "@jobber/components/Icon";

export function SegmentedControlIconsExample() {
  return (
    <SegmentedControl defaultValue="calendar">
      <SegmentedControl.Option value="calendar">
        <Icon name="calendar" />
      </SegmentedControl.Option>
      <SegmentedControl.Option value="phone">
        <Icon name="phone" />
      </SegmentedControl.Option>
      <SegmentedControl.Option value="availability">
        <Icon name="availability" />
      </SegmentedControl.Option>
    </SegmentedControl>
  );
}
