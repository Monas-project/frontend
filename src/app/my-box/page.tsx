import Link from 'next/link';
import { NavigationSidebar } from '../components/navigation/navigation-sidebar';
const MyBox = () => {  
  // const [dataList, setDataList] = useState([]);
  const dataList = [
    { name: "A", owner: "太郎", dataInfo: "2013/05/30" },
    { name: "B", owner: "花子", dataInfo: "2020/10/15" },
    { name: "C", owner: "次郎", dataInfo: "2019/03/22" },
    { name: "D", owner: "三郎", dataInfo: "2021/07/08" },
    { name: "E", owner: "四郎", dataInfo: "2018/12/01" },
  ];


  // useEffect(() => {
  //   // フォルダとファイルのデータをAPIから取得し、setDataListでセットする
  // }, []);
  return (
    <div className='flex h-screen'>
      <div>
        <NavigationSidebar />
      </div>
      <div>
        <h1 className="text-4xl font-bold text-center">Own Space</h1>
        <h1>My Boxページ</h1>
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Owner</th>
              <th className="px-4 py-2">Data Info</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {dataList.map((item, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.owner}</td>
                <td className="border px-4 py-2">{item.dataInfo}</td>
                <td className="border px-4 py-2">{/* アクションボタンなどを追加 */}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )     
};
export default MyBox;