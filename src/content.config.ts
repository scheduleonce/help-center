import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        date: z.string().optional(),
        products: z
          .array(z.enum(["oncehub", "scheduleonce"]))
          .min(1)
          .default(["oncehub"]),
        contentType: z.enum(["user-guides", "developer-docs"]).optional(),
        oldUrl: z.url().optional(),
      }),
    }),
  }),
};
