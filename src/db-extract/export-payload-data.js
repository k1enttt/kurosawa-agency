import dotenv from 'dotenv'
import path from 'path'
import payload from 'payload'
import fs from 'fs/promises'

// Lấy đường dẫn thư mục hiện tại cho ES module
const currentDir = path.dirname(new URL(import.meta.url).pathname)

// Nạp biến môi trường từ file .env ở thư mục gốc
dotenv.config({ path: path.resolve(process.cwd(), '.env') })

const configPath = path.resolve(currentDir, '../payload.config.ts')
const collections = ['pages', 'posts', 'media', 'categories', 'users']
const globals = ['header', 'footer']
const outputDir = currentDir

async function main() {
  await payload.init({ config: configPath, secret: process.env.PAYLOAD_SECRET })

  // Export collections
  for (const collection of collections) {
    const result = await payload.find({ collection, limit: 10000 })
    await fs.writeFile(
      path.join(outputDir, `${collection}.json`),
      JSON.stringify(result.docs, null, 2),
    )
    console.log(`Exported ${collection} (${result.docs.length} docs)`)
  }

  // Export globals
  for (const global of globals) {
    const result = await payload.global.findOne({ slug: global })
    await fs.writeFile(
      path.join(outputDir, `${global}.global.json`),
      JSON.stringify(result, null, 2),
    )
    console.log(`Exported global ${global}`)
  }

  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
