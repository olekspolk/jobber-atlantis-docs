// The site's overview pages: Home and each section's page of cards.
import { PageBlock } from "../layout/PageBlock";
import {
  componentList,
  contentList,
  designList,
  guidesList,
  hooksList,
  packagesList,
  patternsList,
} from "../site/lists";

export const HomePage = () => (
  <PageBlock
    structure={{
      header: {
        title: "Atlantis Design System",
        body: "Atlantis is Jobber's design system that enables us to build consumer-grade experiences",
        ctaLabel: "Get Started",
        to: "/welcome-guide",
        imageURL: "/img_collage.jpg",
      },
      body: {
        content: [
          { title: "Components", to: "/components", imageURL: "/Components.avif", sections: ["Packages"] },
          { title: "Design", to: "/design", imageURL: "/Design.avif", sections: ["Packages"] },
          { title: "Content", to: "/content", imageURL: "/ContentGuidance.avif", sections: ["Resources"] },
          { title: "Hooks", to: "/hooks", imageURL: "/Hooks.avif", sections: ["Packages"] },
          { title: "Guides", to: "/guides", imageURL: "/Guides.avif", sections: ["Resources"] },
          { title: "Patterns", to: "/patterns", imageURL: "/Patterns.avif", sections: ["Resources"] },
          { title: "Packages", to: "/packages" },
          { title: "Changelog", to: "/changelog", sections: ["Changelog"] },
        ],
      },
      useCategories: true,
    }}
  />
);

export const ComponentsPage = () => (
  <PageBlock
    structure={{
      header: {
        title: "Components",
        body: "The tools you'll use to build Jobber",
        imageURL: "/img-hero_collage-v2.004b0168.webp",
      },
      body: { content: componentList },
      useCategories: true,
      showSegmentedControl: true,
    }}
  />
);

export const PatternsPage = () => (
  <PageBlock
    structure={{
      header: {
        title: "Patterns",
        body: "UI elements and associated guidelines that can be used to solve similar problems in a consistent fashion",
        imageURL: "/img-page-divider-collage.webp",
      },
      body: { content: patternsList },
    }}
  />
);

export const ContentPage = () => (
  <PageBlock
    structure={{
      header: { title: "Content", body: "Before you start building, make sure you’re organized" },
      body: { content: contentList },
    }}
  />
);

export const DesignPage = () => (
  <PageBlock
    structure={{
      header: {
        title: "Design",
        body: "The foundation of Jobber's look and feel",
        imageURL: "/img-page-divider-collage.webp",
      },
      body: { content: designList },
    }}
  />
);

export const HooksPage = () => (
  <PageBlock
    structure={{
      header: {
        title: "Hooks",
        body: "Save yourself some time on wiring up common experiences and functionality",
        imageURL: "/img-page-divider-collage.webp",
      },
      body: { content: hooksList },
      useCategories: true,
      showSegmentedControl: true,
    }}
  />
);

export const GuidesPage = () => (
  <PageBlock
    structure={{
      header: { title: "Guides", body: "Instruction manuals for working with our tools" },
      body: { content: guidesList },
      useCategories: true,
      showSegmentedControl: true,
    }}
  />
);

export const PackagesPage = () => (
  <PageBlock
    structure={{
      header: {
        title: "Packages",
        body: "Explore the Essentials: Must-Have NPM Packages for Your Projects",
        imageURL: "/img-page-divider-collage.webp",
      },
      body: { content: packagesList },
    }}
  />
);
