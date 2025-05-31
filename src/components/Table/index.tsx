import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

const Table = ({
  data,
  hasHeader,
}: {
  data: { header: string; value?: DefaultTypedEditorState | null }[]
  hasHeader?: boolean
}) => {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-base text-left rtl:text-right text-gray-500 dark:text-gray-400">
        {hasHeader && data[0] && (
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-0 md:px-6 py-3 table-column-width">
                {data[0].header}
              </th>
              <th scope="col" className="px-0 md:px-6 py-3">
                {data[0].value && (
                  <RichText
                    data={data[0].value}
                    enableGutter={false}
                    className="text-inherit text-[length:inherit]"
                  />
                )}
              </th>
            </tr>
          </thead>
        )}
        <tbody>
          {data.map((item, index) => {
            if (hasHeader && index == 0) return
            const borderStyle =
              index < data.length - 1 ? 'border-b dark:border-gray-700 border-gray-200' : ''

            return (
              <tr key={index} className={cn(borderStyle, '')}>
                <th
                  scope="row"
                  className="px-0 md:px-6 py-4 font-medium text-gray-900 dark:text-white table-column-width"
                >
                  {item.header}
                </th>
                <td className="px-0 md:px-6 py-4">
                  {item.value && (
                    <RichText
                      data={item.value}
                      enableGutter={false}
                      className={cn(
                        'text-inherit text-[length:inherit]',
                        '[&_a]:text-inherit [&_a]:no-underline [&_a:hover]:underline',
                        '[&_strong]:text-inherit',
                      )}
                    />
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Table
