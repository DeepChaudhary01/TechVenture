// /* eslint-disable */
// import { PrismaClient } from "@prisma/client"

// //this function will create a new connection of prisma
// const prismaClientSingleton = () => {
//   return new PrismaClient() //returning a new instane of prisma
// }

// //Type restriction
// type prismaClientSingleton = ReturnType<typeof prismaClientSingleton>

// //at global level we can use this to check
// // whether we have prisma connection or not
// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined
// } //connection can be there or cannot be so undefined

// const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

// export default prisma

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

/* eslint-disable */
import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

// Use an existing Prisma instance or create a new one
const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma // Store globally in development
}

export default prisma
