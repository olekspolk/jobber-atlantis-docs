import React from "react";
import { Content } from "@jobber/components/Content";
import { Text } from "@jobber/components/Text";

export function TextMaxLinesExample() {
  return (
    <Content>
      <Text maxLines="single">
        This will show 1 line. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Vestibulum nec pulvinar nunc. Suspendisse nec eros
        pretium, rutrum purus sit amet, finibus ante. Donec pretium condimentum
        scelerisque.
      </Text>
      <Text maxLines="small">
        This will show 2 lines. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Vestibulum nec pulvinar nunc. Suspendisse nec eros
        pretium, rutrum purus sit amet, finibus ante. Donec pretium condimentum
        scelerisque. Duis eu ligula nec metus suscipit feugiat.Etiam sapien
        sapien, mattis eu tincidunt quis, pretium sed metus. Maecenas quis dolor
        lacinia libero rhoncus fringilla. Cras mi ante, euismod nec tortor in,
        tempus mollis nulla.
      </Text>
      <Text maxLines="base">
        This will show 4 lines. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Vestibulum nec pulvinar nunc. Suspendisse nec eros
        pretium, rutrum purus sit amet, finibus ante. Donec pretium condimentum
        scelerisque. Duis eu ligula nec metus suscipit feugiat.Etiam sapien
        sapien, mattis eu tincidunt quis, pretium sed metus. Maecenas quis dolor
        lacinia libero rhoncus fringilla. Cras mi ante, euismod nec tortor in,
        tempus mollis nulla.
      </Text>
      <Text maxLines="large">
        This will show 8 lines. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Vestibulum nec pulvinar nunc. Suspendisse nec eros
        pretium, rutrum purus sit amet, finibus ante. Donec pretium condimentum
        scelerisque. Duis eu ligula nec metus suscipit feugiat.Etiam sapien
        sapien, mattis eu tincidunt quis, pretium sed metus. Maecenas quis dolor
        lacinia libero rhoncus fringilla. Cras mi ante, euismod nec tortor in,
        tempus mollis nulla. Etiam eu lacus nibh. Donec tristique lacus magna,
        vulputate tristique lacus blandit vitae. Aenean vitae commodo metus.
        Fusce eu risus quis orci pharetra consequat nec nec libero.
      </Text>
      <Text maxLines="larger">
        This will show 16 lines. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Vestibulum nec pulvinar nunc. Suspendisse nec eros
        pretium, rutrum purus sit amet, finibus ante. Donec pretium condimentum
        scelerisque. Duis eu ligula nec metus suscipit feugiat.Etiam sapien
        sapien, mattis eu tincidunt quis, pretium sed metus. Maecenas quis dolor
        lacinia libero rhoncus fringilla. Cras mi ante, euismod nec tortor in,
        tempus mollis nulla. Etiam eu lacus nibh. Donec tristique lacus magna,
        vulputate tristique lacus blandit vitae. Aenean vitae commodo metus.
        Fusce eu risus quis orci pharetra consequat nec nec libero. Lorem ipsum
        dolor sit amet, consectetur adipiscing elit. Vestibulum nec pulvinar
        nunc. Suspendisse nec eros pretium, rutrum purus sit amet, finibus ante.
        Donec pretium condimentum scelerisque. Duis eu ligula nec metus suscipit
        feugiat.Etiam sapien sapien, mattis eu tincidunt quis, pretium sed
        metus. Maecenas quis dolor lacinia libero rhoncus fringilla. Cras mi
        ante, euismod nec tortor in, tempus mollis nulla. Etiam eu lacus nibh.
        Donec tristique lacus magna, vulputate tristique lacus blandit vitae.
        Aenean vitae commodo metus. Fusce eu risus quis orci pharetra consequat
        nec nec libero.
      </Text>
    </Content>
  );
}
