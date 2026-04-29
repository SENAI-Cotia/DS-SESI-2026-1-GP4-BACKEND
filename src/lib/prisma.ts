import "dotenv/config"
import { PrismaBetterSqlite3} from "@prisma/adapter-better-sqlite3"
import { PrismaClient } from "../../generated/prisma/client"

const connectstring = `${process.env.DATABASE_URL}`
const adapter = new PrismaBetterSqlite3 ({ 
    url: connectstring 

})
const prisma = new PrismaClient ({
    adapter
})
export default prisma 