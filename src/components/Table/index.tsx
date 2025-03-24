import RichText from '@/components/RichText'

const Table = ({ data }: { data: { header: string; value: any }[] }) => {
  return (
    <div className="relative overflow-x-auto">
      <table className="container w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {item.header}
              </th>
              <td className="px-6 py-4">{item.value}</td>
            </tr>
          ))}
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Name
            </th>
            <td className="px-6 py-4">Kurosawa Joint Office Group</td>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Abbreviation
            </th>
            <td className="px-6 py-4">Kurosawa Group</td>
          </tr>
          <tr className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Member companies (Address / Establishment)
            </th>
            <td className="px-6 py-4">
              Kurosawa Joint Office Group (Japan/Established in 1972)
              <br />
              Kurosawa Consulting Vietnam Company Limited (Vietnam/Established in 2016)
              <br />
              Kurosawa Acc Company Limited (Vietnam/Established in 2020)
              <br />
              Kurosawa Realty Company Limited (Click here for details) (Vietnam/Established in 2020)
            </td>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Representative
            </th>
            <td className="px-6 py-4">Kurosawa Koei</td>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Number of employees
            </th>
            <td className="px-6 py-4">100 peoples</td>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Office address
            </th>
            <td className="px-6 py-4">
              <div className="mb-2">
                <b>[Tokyo]</b>
                <br />
                4-4-11 Nakano, Nakano-ku, Tokyo Telephone: 03-3388-9638
                <br />
                Email: kurosawa@kurosawa.gr.jp
              </div>
              <div className="mb-2">
                <b>[Ho Chi Minh City]</b>
                <br />
                Floor 1B, 116-118 Nguyen Thi Minh Khai Street, Vo Thi Sau Ward, District 3, Ho Chi
                Minh City
                <br />
                Telephone: 028-3520-0043 Ext 14
                <br />
                Email: japan.desk@kurosawa.vn
              </div>
              <div>
                <b>[Hà Nội]</b>
                <br />
                Floor 26, Ellipse Tower, 110 Tran Phu Street, Mo Lao Ward, Ha Dong District, Ha Noi
                City
                <br />
                Telephone: 090-1392-232
                <br />
                Email: japan.desk@kurosawa.vn
                <br />
              </div>
            </td>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              About Kurosawa Group
            </th>
            <td className="px-6 py-4">
              Kurosawa Group was established in 1972, providing various services such as judicial
              assistance, certified public accounting, tax accounting, land and house investigation,
              research, administrative assistance, labor and social insurance assistance, registered
              management consultant and other related services with the motto “accurate”, “quick”,
              careful”. In Japan, we have gained abundant achievements from large-scale projects
              such as trading debts across the country to detailed responses to each person’s
              request. Please refer to the Kurosawa Group website below. (Japanese only)
              <br />
              http://www.kurosawa.gr.jp
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Table
