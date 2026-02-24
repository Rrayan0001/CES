import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient({})

async function main() {
    const hashedPassword = await bcrypt.hash('admin123', 10)

    const superAdmin = await prisma.user.upsert({
        where: { email: 'admin@ces.org' },
        update: {},
        create: {
            email: 'admin@ces.org',
            firstName: 'Super',
            lastName: 'Admin',
            password: hashedPassword,
            mobile: '1234567890',
        },
    })

    console.log({ superAdmin })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
