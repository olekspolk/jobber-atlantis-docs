import { Chip, ChipDismissible } from "@jobber/components/Chip";
import { Cluster } from "@jobber/components/Cluster";
import { type ColumnDef, DataTable } from "@jobber/components/DataTable";
import { FilterPicker } from "@jobber/components/FilterPicker";
import { Icon, type IconNames } from "@jobber/components/Icon";
import { InlineLabel } from "@jobber/components/InlineLabel";
import { Link } from "@jobber/components/Link";
import { Page } from "@jobber/components/Page";
import { Stack } from "@jobber/components/Stack";
import { Text } from "@jobber/components/Text";
import { useMemo, useState } from "react";
import ComponentsChangelog from "../content/pages/changelog/components.md?raw";
import ComponentsNativeChangelog from "../content/pages/changelog/components-native.md?raw";
import DesignChangelog from "../content/pages/changelog/design.md?raw";
import EslintConfigChangelog from "../content/pages/changelog/eslint-config.md?raw";
import FormattersChangelog from "../content/pages/changelog/formatters.md?raw";
import GeneratorsChangelog from "../content/pages/changelog/generators.md?raw";
import HooksChangelog from "../content/pages/changelog/hooks.md?raw";
import StylelintConfigChangelog from "../content/pages/changelog/stylelint-config.md?raw";
import { BaseView } from "../layout/BaseView";
import { usePageTitle } from "../site/usePageTitle";

// Every package's changelog as one table of changes: date, package, version, type, pull request.
const CHANGE_TYPES = {
  BUG_FIX: "Bug fix",
  FEATURE: "Feature",
  REVERSION: "Reversion",
  BREAKING_CHANGE: "Breaking change",
  VERSION_BUMP: "Version bump",
};

const changelogSources = [
  { package: "components", content: ComponentsChangelog },
  { package: "components-native", content: ComponentsNativeChangelog },
  { package: "design", content: DesignChangelog },
  { package: "eslint-config", content: EslintConfigChangelog },
  { package: "formatters", content: FormattersChangelog },
  { package: "generators", content: GeneratorsChangelog },
  { package: "hooks", content: HooksChangelog },
  { package: "stylelint-config", content: StylelintConfigChangelog },
];

interface ChangelogEntry {
  package: string;
  version: string;
  versionLink: string;
  date: string;
  timestamp: number;
  changeType: string;
  description: string;
  prNumber: string;
  prUrl: string;
  affectedPackages?: string[];
  isMultiPackage?: boolean;
  isDuplicatedEntry?: boolean;
}

// A changelog line: its pull request, and its description without links, scopes and jargon.
const dismantleDescription = (originalDescription: string) => {
  let remaining = originalDescription;
  const extracted = { prNumber: "", prUrl: "", commitHash: "", commitUrl: "" };
  const prMatch = remaining.match(/\[#(\d+)\]\(([^)]+)\)/);
  if (prMatch) {
    extracted.prNumber = prMatch[1];
    extracted.prUrl = prMatch[2];
  }
  remaining = remaining.replace(/\[[^\]]+\]\([^)]+\)/g, "").trim();
  remaining = remaining.replace(/\*\*([^*]+)\*\*/g, "$1").trim();
  remaining = remaining.replace(/\[([A-Z]+-\d+)\]/g, "").trim();
  while (remaining.match(/^[a-z0-9-]+:\s*/i)) remaining = remaining.replace(/^[a-z0-9-]+:\s*/i, "").trim();
  remaining = remaining.replace(/,?\s*closes\s*\[#\d+\]\([^)]+\)/gi, "").trim();
  remaining = remaining.replace(/,?\s*closes\s*/gi, "").trim();
  remaining = remaining.replace(/\b[Bb]reaking\s*/g, "").trim();
  remaining = remaining.replace(/\(\s*\)/g, "").trim();
  remaining = remaining.replace(/,\s*$/, "").replace(/\s+/g, " ").trim();
  return { ...extracted, cleanDescription: remaining };
};

const normalizeChangeType = (type: string, isBreaking = false) => {
  if (isBreaking) return CHANGE_TYPES.BREAKING_CHANGE;
  const lower = type.toLowerCase();
  if (lower.includes("revert")) return CHANGE_TYPES.REVERSION;
  if (lower.includes("feat")) return CHANGE_TYPES.FEATURE;
  if (lower.includes("bug") || lower.includes("fix")) return CHANGE_TYPES.BUG_FIX;
  if (lower.includes("bump")) return CHANGE_TYPES.VERSION_BUMP;
  return type;
};

// A release date (2026-09-23) is a day, not an instant: local midnight, so the Date column, shown in
// local time, reads the same day in every time zone. (new Date("2026-09-23") is UTC midnight, the
// day before west of UTC.)
const parseDateToTimestamp = (dateString: string) => {
  const day = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateString);
  const date = day ? new Date(Number(day[1]), Number(day[2]) - 1, Number(day[3])) : new Date(dateString);
  return isNaN(date.getTime()) ? 0 : date.getTime();
};

interface VersionState {
  currentVersion: string;
  versionLink: string;
  currentDate: string;
  currentChangeType: string;
}

const createChangelogEntry = (packageName: string, state: VersionState, description: string, isBumpOnly = false): ChangelogEntry => {
  const dismantled = dismantleDescription(description);
  const isBreakingChange =
    description.toLowerCase().includes("breaking") ||
    description.includes("BREAKING CHANGE") ||
    state.currentChangeType.toLowerCase().includes("breaking") ||
    state.currentChangeType.toLowerCase().includes("major");
  return {
    package: packageName,
    version: state.currentVersion,
    versionLink: state.versionLink,
    date: state.currentDate,
    timestamp: parseDateToTimestamp(state.currentDate),
    changeType: normalizeChangeType(isBumpOnly ? CHANGE_TYPES.VERSION_BUMP : state.currentChangeType, isBreakingChange),
    description: isBumpOnly ? "" : dismantled.cleanDescription,
    prNumber: dismantled.prNumber,
    prUrl: dismantled.prUrl,
  };
};

const parseChangelogContent = (content: string, packageName: string) => {
  const entries: ChangelogEntry[] = [];
  const versionSections = content.match(/##?\s*\[([^\]]+)\]\([^)]*\)\s*\(([^)]+)\)([\s\S]*?)(?=##?\s*\[|$)/g);
  if (!versionSections) return entries;
  for (const section of versionSections) {
    const versionMatch = section.match(/##?\s*\[([^\]]+)\]\(([^)]*)\)\s*\(([^)]+)\)/);
    if (!versionMatch) continue;
    const state = {
      currentVersion: versionMatch[1],
      versionLink: versionMatch[2].trim(),
      currentDate: versionMatch[3].trim(),
    };
    if (section.includes("Version bump only")) {
      entries.push(
        createChangelogEntry(packageName, { ...state, currentChangeType: CHANGE_TYPES.VERSION_BUMP }, "Version bump only", true),
      );
      continue;
    }
    for (const typeSection of section.match(/###\s*([^\n]+)([\s\S]*?)(?=###|$)/g) ?? []) {
      const typeMatch = typeSection.match(/###\s*([^\n]+)/);
      if (!typeMatch) continue;
      for (const bullet of typeSection.match(/^\s*\*\s*(.+)$/gm) ?? []) {
        entries.push(
          createChangelogEntry(packageName, { ...state, currentChangeType: typeMatch[1].trim() }, bullet.replace(/^\s*\*\s*/, "")),
        );
      }
    }
  }
  return entries;
};

// A pull request listed under several packages: marked, and when every package says the same
// thing, flagged as a duplicate.
const enhanceWithMultiPackageInfo = (entries: ChangelogEntry[]) => {
  const prGroups = new Map<string, ChangelogEntry[]>();
  for (const entry of entries) {
    if (entry.prNumber) prGroups.set(entry.prNumber, [...(prGroups.get(entry.prNumber) ?? []), entry]);
  }
  const enhanced = new Map<ChangelogEntry, ChangelogEntry>();
  prGroups.forEach((group) => {
    if (group.length > 1) {
      const uniqueDescriptions = [...new Set(group.map((e) => e.description))];
      const affectedPackages = [...new Set(group.map((e) => e.package))];
      const isDuplicatedEntry = uniqueDescriptions.length === 1;
      group.forEach((entry) =>
        enhanced.set(entry, { ...entry, affectedPackages, isMultiPackage: true, ...(isDuplicatedEntry && { isDuplicatedEntry: true }) }),
      );
    } else {
      enhanced.set(group[0], { ...group[0], affectedPackages: [group[0].package], isMultiPackage: false });
    }
  });
  return entries.map((entry) => enhanced.get(entry) ?? { ...entry, affectedPackages: [entry.package], isMultiPackage: false });
};

const parseAllChangelogs = () => {
  const all: ChangelogEntry[] = [];
  for (const source of changelogSources) {
    try {
      all.push(...parseChangelogContent(source.content, source.package));
    } catch (error) {
      console.error(`Error parsing changelog for ${source.package}:`, error);
    }
  }
  return enhanceWithMultiPackageInfo(all).sort((a, b) =>
    a.timestamp !== b.timestamp ? b.timestamp - a.timestamp : a.package.localeCompare(b.package),
  );
};

interface Filters {
  packages?: string[];
  changeTypes?: string[];
  dateFrom?: string;
  dateTo?: string;
  excludeDuplicatedEntries?: boolean;
}

const filterChangelogEntries = (entries: ChangelogEntry[], filters: Filters = {}) =>
  entries.filter((entry) => {
    if (filters.packages?.length && !filters.packages.includes(entry.package)) return false;
    if (filters.changeTypes?.length && !filters.changeTypes.includes(entry.changeType)) return false;
    if (filters.dateFrom && entry.timestamp < parseDateToTimestamp(filters.dateFrom)) return false;
    if (filters.dateTo && entry.timestamp > parseDateToTimestamp(filters.dateTo)) return false;
    if (filters.excludeDuplicatedEntries && entry.isDuplicatedEntry) return false;
    return true;
  });

const PackageCell = ({ packageName }: { packageName: string }) => {
  switch (packageName) {
    case "components":
      return <Link url="/packages/components">components</Link>;
    case "design":
      return <Link url="/packages/design">design</Link>;
    case "eslint-config":
      return <Link url="/packages/eslint-config">eslint config</Link>;
    case "hooks":
      return <Link url="/packages/hooks">hooks</Link>;
    case "stylelint-config":
      return <Link url="/packages/stylelint-config">stylelint config</Link>;
    default:
      return <Text>{packageName}</Text>;
  }
};

const TypeCell = ({ type }: { type: string }) => {
  switch (type) {
    case CHANGE_TYPES.REVERSION:
      return <InlineLabel color="blueDark">{CHANGE_TYPES.REVERSION}</InlineLabel>;
    case CHANGE_TYPES.BREAKING_CHANGE:
      return <InlineLabel color="red">{CHANGE_TYPES.BREAKING_CHANGE}</InlineLabel>;
    case CHANGE_TYPES.FEATURE:
      return <InlineLabel color="green">{CHANGE_TYPES.FEATURE}</InlineLabel>;
    case CHANGE_TYPES.BUG_FIX:
      return <InlineLabel color="yellow">{CHANGE_TYPES.BUG_FIX}</InlineLabel>;
    case CHANGE_TYPES.VERSION_BUMP:
      return <InlineLabel color="greyBlue">{CHANGE_TYPES.VERSION_BUMP}</InlineLabel>;
    default:
      return <InlineLabel color="greyBlue">{type}</InlineLabel>;
  }
};

const useTableColumns = () =>
  useMemo<ColumnDef<ChangelogEntry>[]>(
    () => [
      {
        accessorKey: "date",
        header: "Date",
        cell: (info) =>
          info.row.original.timestamp === 0
            ? String(info.getValue())
            : new Date(info.row.original.timestamp).toLocaleDateString(),
      },
      { accessorKey: "package", header: "Package", cell: (info) => <PackageCell packageName={String(info.getValue())} /> },
      {
        accessorKey: "version",
        header: "Version",
        cell: (info) => (
          <Link url={info.row.original.versionLink} external>
            {String(info.getValue())}
          </Link>
        ),
      },
      { accessorKey: "changeType", header: "Type", cell: (info) => <TypeCell type={String(info.getValue())} /> },
      { accessorKey: "description", header: "Description", cell: (info) => <p>{String(info.getValue())}</p> },
      {
        accessorKey: "prNumber",
        header: "Pull Request",
        cell: (info) => (
          <Link url={info.row.original.prUrl ?? ""} external>
            {String(info.getValue())}
          </Link>
        ),
      },
    ],
    [],
  );

function TagFilterPicker({
  activatorIcon,
  activatorLabel,
  destructive = false,
  options,
  onChange,
  value: selectedTags = [],
}: {
  activatorIcon: IconNames;
  activatorLabel: string;
  destructive?: boolean;
  options: { id: string; label: string }[];
  onChange: (tags: string[]) => void;
  value?: string[];
}) {
  return (
    <Cluster gap="small">
      <FilterPicker
        multiSelect
        onSelect={(selected: { id: string | number }[]) => onChange(selected.map((option) => String(option.id)))}
        selected={selectedTags.map((tag) => ({ id: tag, label: tag }))}
        subjectNoun="tags"
      >
        {options.map(({ id, label }) => (
          <FilterPicker.Option id={id} label={label} key={id} />
        ))}
        <FilterPicker.Activator>
          <Chip label={activatorLabel} variation="subtle">
            <Chip.Suffix>
              <Icon color="interactiveSubtle" name={activatorIcon} size="small" />
            </Chip.Suffix>
          </Chip>
        </FilterPicker.Activator>
      </FilterPicker>
      {selectedTags.map((tag) => (
        <ChipDismissible
          invalid={destructive}
          label={tag}
          onClick={() => onChange(selectedTags.filter((selected) => selected !== tag))}
          key={tag}
        />
      ))}
    </Cluster>
  );
}

const allEntries = parseAllChangelogs();
const availableChangeTypes = [...new Set(allEntries.map((entry) => entry.changeType))].sort();
const availablePackages = [...new Set(allEntries.map((entry) => entry.package))].sort();

const ChangelogDataTable = () => {
  const [filters, setFilters] = useState<Filters>(() => ({
    packages: ["components", "components-native"],
    changeTypes: availableChangeTypes.filter((type) => type !== CHANGE_TYPES.VERSION_BUMP),
  }));
  const filteredEntries = useMemo(() => filterChangelogEntries(allEntries, filters), [filters]);
  const columns = useTableColumns();
  return (
    <Stack gap="largest">
      <Stack gap="base">
        <TagFilterPicker
          activatorIcon="add"
          activatorLabel="Add package"
          value={filters.packages}
          onChange={(packages) => setFilters((previous) => ({ ...previous, packages }))}
          options={availablePackages.map((pkg) => ({ id: pkg, label: pkg }))}
        />
        <TagFilterPicker
          activatorIcon="add"
          activatorLabel="Add change type"
          value={filters.changeTypes}
          onChange={(changeTypes) => setFilters((previous) => ({ ...previous, changeTypes }))}
          options={availableChangeTypes.map((type) => ({ id: type, label: type }))}
        />
      </Stack>
      <DataTable
        data={filteredEntries}
        columns={columns}
        pagination={{ itemsPerPage: [10, 25, 50, 100], manualPagination: false }}
        sorting={undefined}
        stickyHeader
      />
    </Stack>
  );
};

export const ChangelogPage = () => {
  usePageTitle("Changelog");
  return (
    <BaseView>
      <BaseView.Main noMaxWidth>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "var(--space-large)" }}>
          <Page title="Changelog" width="fill">
            <ChangelogDataTable />
          </Page>
        </div>
      </BaseView.Main>
    </BaseView>
  );
};
