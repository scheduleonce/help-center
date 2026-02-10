// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';
import starlight from '@astrojs/starlight';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  image: {
    service: passthroughImageService(),
  },
  integrations: [
      starlight({
          title: 'Help Center',
          logo: {
            src: './src/assets/logo.svg',
            alt: 'OnceHub Logo',
          },
          components: {
            Hero: './src/components/Hero.astro',
            SocialIcons: './src/components/SocialIcons.astro',
          },
          customCss: ['./src/styles/global.css'],
          social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/oncehub' }],
          sidebar: [
              {
                  label: 'Getting Started',
                  autogenerate: { directory: 'getting-started' },
              },
              {
                  label: 'Booking Calendars [New]',
                  autogenerate: { directory: 'booking-calendars' },
              },
              {
                  label: 'Booking Pages [Classic]',
                  autogenerate: { directory: 'booking-pages' },
              },
              {
                  label: 'Routing Forms',
                  autogenerate: { directory: 'routing-forms' },
              },
              {
                  label: 'Chatbots',
                  autogenerate: { directory: 'chatbots' },
              },
              {
                  label: 'Integrations',
                  autogenerate: { directory: 'integrations' },
              },
              {
                  label: 'User & Account Management',
                  autogenerate: { directory: 'user-account-management' },
              },
          ],
      }),
	],

  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: [".trycloudflare.com"]
    }
  },
});