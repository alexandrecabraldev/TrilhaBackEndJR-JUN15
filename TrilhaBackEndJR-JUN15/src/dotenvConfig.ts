import "dotenv/config"
import z from "zod"

const dotenvSchema = z.object({
    PORT: z.coerce.number().default(3000),
    SECRET_KEY: z.string(),
    DATABASE_URL: z.string(),
})

const _env = dotenvSchema.safeParse(process.env)

if( ! _env.success ){
    console.error(_env.error)
    throw new Error("Enviroment variables error")
}

export const env = _env.data;