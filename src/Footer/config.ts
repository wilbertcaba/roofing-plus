import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'socialIcons',
      type: 'array',
      label: 'Social media icons',
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            {
              label: 'Instagram',
              value: 'instagram',
            },
            {
              label: 'Facebook',
              value: 'facebook',
            },
            {
              label: 'WhatsApp',
              value: 'whatsapp',
            },
          ],
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
        {
          name: 'newTab',
          type: 'checkbox',
          defaultValue: true,
        },
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
      },
    },
    {
      name: 'copyrightText',
      type: 'text',
      required: true,
      defaultValue: '© 2025 RoofingPlus. Todos los derechos reservados.',
    },
    {
      name: 'legalLinks',
      type: 'array',
      label: 'Legal links',
      minRows: 2,
      maxRows: 2,
      fields: [
        link({
          appearances: false,
        }),
      ],
      admin: {
        initCollapsed: true,
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
