import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schemaTypes'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

export default defineConfig({
  name: 'default',
  title: 'Prime Voice Media',
  basePath: '/studio',
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Portfolio Items')
              .icon(() => '🎬')
              .child(S.documentTypeList('portfolioItem').title('Portfolio Items')),
            S.listItem()
              .title('Clients')
              .icon(() => '🏢')
              .child(S.documentTypeList('client').title('Clients')),
          ]),
    }),
  ],
})
