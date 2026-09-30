import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { Button } from "@jobber/components/Button";
import { InlineLabel } from "@jobber/components/InlineLabel";
import { List } from "@jobber/components/List";
import { Spinner } from "@jobber/components/Spinner";
import { useCollectionQuery } from "@jobber/hooks/useCollectionQuery";

interface ListQueryType {
  allPlanets: {
    pageInfo: { hasNextPage: boolean; endCursor?: string };
    edges: { node: { name: string; id: string }; cursor: string }[];
  };
}

const LIST_QUERY = gql`
  query ListQuery($cursor: String) {
    allPlanets(first: 4, after: $cursor) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          name
          id
        }
        cursor
      }
    }
  }
`;

const apolloClient = new ApolloClient({
  uri: "https://swapi-graphql.netlify.app/graphql",
  cache: new InMemoryCache(),
});

function getLoadingState(loadingInitialContent: boolean, loadingRefresh: boolean, loadingNextPage: boolean) {
  if (loadingInitialContent) return { loading: true, loadingStatus: "Initial Loading" };
  if (loadingRefresh) return { loading: true, loadingStatus: "Refreshing" };
  if (loadingNextPage) return { loading: true, loadingStatus: "Fetching More" };
  return { loading: false, loadingStatus: "Loaded" };
}

export function UseCollectionQuery() {
  const { data, refresh, nextPage, loadingRefresh, loadingNextPage, loadingInitialContent } =
    useCollectionQuery<ListQueryType, never>({
      query: LIST_QUERY,
      queryOptions: {
        fetchPolicy: "network-only",
        nextFetchPolicy: "cache-first",
        client: apolloClient,
      },
      getCollectionByPath(items) {
        return items?.allPlanets;
      },
    });
  const { loadingStatus, loading } = getLoadingState(loadingInitialContent, loadingRefresh, loadingNextPage);
  const items = (data?.allPlanets.edges ?? []).map((edge) => ({
    section: "Star Wars Planets",
    id: edge.node.id,
    icon: "starFill" as const,
    iconColor: "green" as const,
    content: edge.node.name,
  }));
  return (
    <>
      <InlineLabel size="large">{loadingStatus}</InlineLabel>
      {loading && <Spinner size="small" inline />}
      <List items={items} />
      <Button label="Refresh" onClick={() => refresh()} />
      <Button label="Fetch More" onClick={() => nextPage()} />
    </>
  );
}
