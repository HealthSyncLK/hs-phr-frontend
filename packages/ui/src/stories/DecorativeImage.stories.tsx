import type { Meta, StoryObj } from "@storybook/react";
import { DecorativeImage } from "../components/app/DecorativeImage";

const meta: Meta<typeof DecorativeImage> = {
  title: "App Shell & Overlays/DecorativeImage",
  component: DecorativeImage,
  tags: ["autodocs"],
  argTypes: {
    src: {
      control: "text",
      description: "Main circular image source",
    },
    alt: {
      control: "text",
      description: "Alt text for main image",
    },
    cornerSrc: {
      control: "text",
      description: "Small corner logo image source",
    },
    cornerAlt: {
      control: "text",
      description: "Alt text for corner image",
    },
    className: {
      control: "text",
      description: "Custom Tailwind classes for responsive sizing",
    },
  },
};

export default meta;
type Story = StoryObj<typeof DecorativeImage>;

// Default story with corner logo
export const Default: Story = {
  args: {
    src: "/src/stories/assets/family.jpg",
    alt: "Family Picture",
    cornerSrc: "/src/stories/assets/logoCorner.png",
    cornerAlt: "Logo",
    className:
      "w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-[450px] xl:h-[450px]",
  },
};

// Without corner logo
export const WithoutCorner: Story = {
  args: {
    src: "/src/stories/assets/family.jpg",
    alt: "Family Picture",
    className:
      "w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-[450px] xl:h-[450px]",
  },
};
