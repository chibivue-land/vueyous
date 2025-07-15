import { join, resolve } from 'node:path'
import type { Plugin } from 'vite'
import fs from 'fs-extra'
import { packages } from '../../../meta/packages'
import { functionNames, getFunction } from '../../../packages/metadata/metadata'

export function MarkdownTransform(): Plugin {
  return {
    name: 'vueyous-md-transform',
    enforce: 'pre',
    async transform(code, id) {
      if (!id.match(/\.md\b/))
        return null

      // linkify function names
      code = code.replace(
        new RegExp(`\`({${functionNames.join('|')}})\`(.)`, 'g'),
        (_, name, ending) => {
          if (ending === ']') // already a link
            return _
          const fn = getFunction(name)!
          return `[\`${fn.name}\`](${fn.docs}) `
        },
      )

      const [pkg, _name, i] = id.split('/').slice(-3)

      const name = functionNames.find(n => n.toLowerCase() === _name.toLowerCase()) || _name

      if (functionNames.includes(name) && i === 'index.md') {
        const frontmatterEnds = code.indexOf('---\n\n')
        const firstHeader = code.search(/\n#{2,6}\s.+/)
        const sliceIndex = firstHeader < 0 ? frontmatterEnds < 0 ? 0 : frontmatterEnds + 4 : firstHeader

        const { header } = await getFunctionMarkdown(pkg, name)

        if (header)
          code = code.slice(0, sliceIndex) + header + code.slice(sliceIndex)

        code = code
          .replace(/(# \w+?)\n/, `$1\n\n<FunctionInfo fn="${name}"/>\n`)
      }

      return code
    },
  }
}

const DIR_SRC = resolve(__dirname, '../..')
const GITHUB_BLOB_URL = 'https://github.com/pei-pay/VueYous/blob/main/packages'

export async function getFunctionMarkdown(pkg: string, name: string) {
  const URL = `${GITHUB_BLOB_URL}/${pkg}/${name}`

  const dirname = join(DIR_SRC, pkg, name)
  const demoPath = ['demo.vue'].find(i => fs.existsSync(join(dirname, i)))

  const links = ([
    ['Source', `${URL}/index.ts`],
    demoPath ? ['Demo', `${URL}/${demoPath}`] : undefined,
    ['Docs', `${URL}/index.md`],
  ])
    .filter(i => i)
    .map(i => `[${i![0]}](${i![1]})`).join(' • ')

  const sourceSection = `## Source\n\n${links}\n`

  const demoSection = demoPath
    ? `
<script setup>
import Demo from \'${dirname}/${demoPath}\'
</script>

## Demo

<DemoContainer>
<p class="demo-source-link"><a href="${URL}/${demoPath}" target="_blank">source</a></p>
<Demo/>
</DemoContainer>
`
    : ''

  const packageNote = packages.find(p => p.name === pkg)!.addon
    ? `Available in the <a href="/${pkg}/README">@vueyous/${pkg}</a> add-on.\n`
    : ''

  const footer = `${sourceSection}`

  const header = demoSection + packageNote

  return {
    footer,
    header,
  }
}
