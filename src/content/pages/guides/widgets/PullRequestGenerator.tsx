import { Banner } from "@jobber/components/Banner";
import { Card } from "@jobber/components/Card";
import { Content } from "@jobber/components/Content";
import { Divider } from "@jobber/components/Divider";
import { Heading } from "@jobber/components/Heading";
import { InputText } from "@jobber/components/InputText";
import { LegacySelect, Option } from "@jobber/components/LegacySelect";
import { Text } from "@jobber/components/Text";
import { useState } from "react";
import { copyToClipboard } from "../../../../components/copyToClipboard";

export function PullRequestGenerator() {
  const [type, setType] = useState("fix");
  const [scope, setScope] = useState<string>();
  const [description, setDescription] = useState("");
  const [issue, setIssue] = useState("");
  const title = `${type}${scope ? `(${scope})` : ``}: ${description ? description : ``} ${issue ? `[${issue}]` : ``}`;

  return (
    <Content>
      <Card title="Tell us about your pull request">
        <Content spacing="large">
          <Content spacing="small">
            <Text>I want to make a change that...</Text>
            <LegacySelect value={type} onChange={(val: string) => setType(val)}>
              <Option value="fix">fixes a bug</Option>
              <Option value="feat">adds a new feature</Option>
              <Option value="docs">adds or updates documentation only</Option>
              <Option value="build">improves the build system</Option>
              <Option value="chore">doesn't modify src or test files</Option>
              <Option value="refactor">doesn't fix a bug or introduce a new feature</Option>
            </LegacySelect>
            <Text>in our...</Text>
            <LegacySelect value={scope} onChange={(val: string) => setScope(val)}>
              <Option value="---">---</Option>
              <Option value="components">component library</Option>
              <Option value="components-native">component native library</Option>
              <Option value="hooks">hooks library</Option>
              <Option value="design">design foundation system</Option>
              <Option value="eslint">eslint config</Option>
              <Option value="stylelint">stylelint config</Option>
              <Option value="generators">generators</Option>
              <Option value="formatters">formatters</Option>
              <Option value="deps">dependencies</Option>
              <Option value="deps-dev">dev dependencies</Option>
            </LegacySelect>
          </Content>
          <Divider />
          <Content>
            <InputText
              placeholder="Description"
              value={description}
              multiline
              rows={2}
              onChange={(val: string) => setDescription(val)}
            />
            <InputText value={issue} placeholder="Issue ID" onChange={(val: string) => setIssue(val)} />
          </Content>
        </Content>
      </Card>
      <Heading level={2}>Your pull request title:</Heading>
      <Banner
        type="success"
        dismissible={false}
        primaryAction={{ label: "Copy to clipboard", icon: "task", onClick: handleCopy }}
      >
        {title}
      </Banner>
    </Content>
  );

  function handleCopy() {
    copyToClipboard(title, "Copied PR title to clipboard", "Unable to copy the PR title");
  }
}
