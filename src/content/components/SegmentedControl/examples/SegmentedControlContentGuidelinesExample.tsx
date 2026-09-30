import React from "react";
import { SegmentedControl } from "@jobber/components/SegmentedControl";

export function SegmentedControlContentGuidelinesExample() {
  return (
    <SegmentedControl defaultValue="option1">
      <SegmentedControl.Option value="option1">
        Option 1
      </SegmentedControl.Option>
      <SegmentedControl.Option value="option2">
        Option 2
      </SegmentedControl.Option>
      <SegmentedControl.Option value="option3">
        Option 3
      </SegmentedControl.Option>
      <SegmentedControl.Option value="option4">
        Option 4
      </SegmentedControl.Option>
      <SegmentedControl.Option value="option5">
        Option 5
      </SegmentedControl.Option>
    </SegmentedControl>
  );
}
