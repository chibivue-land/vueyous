import process from 'node:process'
import * as fs from 'node:fs'
import fse from 'fs-extra'

// https://github.com/shiena/ansicolor/blob/master/README.md
const red = (text: string) => `\x1B[31m${text}\x1B[0m`
const green = (text: string) => `\x1B[32m${text}\x1B[0m`

const targetDirPath = process.argv[2]

if (!targetDirPath) {
  console.error(red('Error: Target directory path is required.'))
  process.exit(1)
}

if (fs.existsSync(targetDirPath)) {
  const files = fs.readdirSync(targetDirPath)

  if (files.length) {
    // eslint-disable-next-line no-console
    console.log('')
    console.error(red(`Error: Target directory "${targetDirPath}" is not empty.`))
    console.error(green('Please choose an empty directory or remove existing files.'))
    process.exit(1)
  }

  fs.mkdirSync(targetDirPath, { recursive: true })
}

const templateDirPath = 'tools/create-vueyouse/template'
fse.copySync(templateDirPath, targetDirPath)

// eslint-disable-next-line no-console
console.log(`
----------------------------------------------------------
${green(`Successfully created vueyouse in "${targetDirPath}".`)}
🚀 Welcome to VueYous! Let's learn Vue together! 📚
----------------------------------------------------------`)
