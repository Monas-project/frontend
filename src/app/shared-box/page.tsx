import { NavigationSidebar } from "../../components/navigation/navigation-sidebar";

const SharedBox = () => {
  const dataList = [
    { name: "AAAA", owner: "太郎", dataModified: "2013/05/30" },
    { name: "B", owner: "花子", dataModified: "2020/10/15" },
    { name: "C", owner: "次郎", dataModified: "2019/03/22" },
    { name: "D", owner: "三郎", dataModified: "2021/07/08" },
    { name: "E", owner: "四郎", dataModified: "2018/12/01" },
  ];
  return (
    <div className='flex h-screen'>
      <div>
        <NavigationSidebar />
      </div>
      <div>
        <h1 className="text-4xl font-bold text-center">Shared Space</h1>
        <h1>Shared Boxページ</h1>
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">　　　</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Owner</th>
              <th className="px-4 py-2">Data Modified</th>
            </tr>
          </thead>
          <tbody>
            {dataList.map((item, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{/* アクションボタンなどを追加 */}</td>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.owner}</td>
                <td className="border px-4 py-2">{item.dataModified}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )     
}
export default SharedBox;