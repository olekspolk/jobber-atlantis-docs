import { Button } from "@jobber/components/Button";
import { Card } from "@jobber/components/Card";
import { Content } from "@jobber/components/Content";
import { InputText } from "@jobber/components/InputText";
import { useState } from "react";

// Giphy's API needs a key. The original site uses Jobber's own, so this one comes from the
// VITE_GIPHY_API_KEY environment variable; without it a search shows no GIF.
const gifKey = import.meta.env.VITE_GIPHY_API_KEY ?? "";

const loadingGIF = "https://media.giphy.com/media/l3nWhI38IWDofyDrW/giphy.gif";

async function getGIF(topic: string): Promise<string | undefined> {
  const query = new URLSearchParams({ tag: topic, rating: "PG", api_key: gifKey });
  const response = await fetch(`//api.giphy.com/v1/gifs/random?${query}`);
  const json = await response.json();
  return json.data?.images?.original?.url;
}

export function GifGift() {
  const [topic, setTopic] = useState("");
  const [url, setURL] = useState<string>();
  return (
    <Card header="Gif Gift">
      <Content>
        <InputText value={topic} onChange={(newValue: string) => setTopic(newValue)} placeholder="Topic" />
        <Button label="Search" fullWidth onClick={gifSearch} />
        <center>{url && <img src={url} />}</center>
      </Content>
    </Card>
  );

  async function gifSearch() {
    setURL(loadingGIF);
    setURL(await getGIF(topic).catch(() => undefined));
  }
}
