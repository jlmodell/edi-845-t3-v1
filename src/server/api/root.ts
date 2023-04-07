import { createTRPCRouter } from "~/server/api/trpc";
import { ediRouter } from "./routers/edi";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  edi: ediRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
