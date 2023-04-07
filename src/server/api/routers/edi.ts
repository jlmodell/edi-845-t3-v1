import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const generate_nine_digit_number = () => {
  return Math.floor(100000000 + Math.random() * 900000000);
};

const ediSchema = z.object({
  documentType: z.string(),
  controlNumber: z.number().default(generate_nine_digit_number()),
  datetimes: z.array(
    z.object({
      datetimeType: z.string(),
      datetime: z.string(),
    })
  ),
  contracts: z.array(
    z.object({
      transactionType: z.string(),
      contractId: z.string(),
      oldContractId: z.string().default(""),
      references: z.array(
        z.object({
          referenceType: z.string(),
          reference: z.string(),
        })
      ),
      dealers: z.array(
        z.object({
          group_type: z.string(),
          group_name: z.string(),
          id_type: z.string(),
          id: z.string(),
          address: z
            .object({
              addr1: z.string(),
              city: z.string(),
              state: z.string(),
              zip: z.string(),
            })
            .default({ addr1: "", city: "", state: "", zip: "" }),
          references: z.array(
            z.object({
              referenceType: z.string(),
              reference: z.string(),
            })
          ),
          datetimes: z.array(
            z.object({
              datetimeType: z.string(),
              datetime: z.string(),
            })
          ),
        })
      ),
      agreements: z.array(
        z.object({
          lineNumber: z.number(),
          reference: z.string(),
          details: z.object({
            description: z.string(),
          }),
          lineInformation: z.object({
            lineNumber: z.number(),
            itemId: z.string(),
          }),
          pricing: z.array(
            z.object({
              price: z.number(),
              quantity: z.number(),
              uom: z.string().default("CA"),
              datetimes: z.array(
                z.object({
                  datetimeType: z.string(),
                  datetime: z.string(),
                })
              ),
            })
          ),
        })
      ),
    })
  ),
});

export type EdiSchema = z.infer<typeof ediSchema>;

export const ediRouter = createTRPCRouter({
  map_to_json: publicProcedure.input(ediSchema).mutation(({ input }) => {
    return {
      output: 1,
    };
  }),
});
