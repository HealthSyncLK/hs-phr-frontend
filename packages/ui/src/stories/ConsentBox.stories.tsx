import type { Meta, StoryObj } from "@storybook/react";
import { ConsentBox } from "../components/form/ConsentBox";

const meta: Meta<typeof ConsentBox> = {
  title: "Form Controls/ConsentBox",
  component: ConsentBox,
  parameters: {
    layout: "centered",
  },
};
export default meta;

type Story = StoryObj<typeof ConsentBox>;

const sampleText = (
  <>
    <p>This consent allows HealthSync to:</p>
    <ul className="list-disc list-inside space-y-1">
      <li>Securely store your medical and health-related information.</li>
      <li>
        Share your records with authorized healthcare providers for treatment,
        billing, and care coordination.
      </li>
      <li>
        Use your anonymized data for analytics and system improvement purposes,
        in compliance with privacy standards.
      </li>
    </ul>
    <p>
      By continuing, you acknowledge that you have read and understood this
      consent agreement.
    </p>
  </>
);

export const Default: Story = {
  args: {
    title: "Consent to Utilize HealthSync’s Medical Records Storage Service",
    content: sampleText,
    maxHeight: "180px",
  },
};
