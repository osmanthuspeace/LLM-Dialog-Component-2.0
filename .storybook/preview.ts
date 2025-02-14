import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    docs: {
      autodocs: true,
      defaultName: 'Documentation',
      toc: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  tags: ['autodocs'],
};

export default preview;
