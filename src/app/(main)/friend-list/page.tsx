const FriendList = () => {
  const dataList = [
    { name: "太郎", address: "0x23...178", sharingFile: "A" },
    { name: "花子", address: "0x56...998", sharingFile: "D" },
    { name: "次郎", address: "0x72...211", sharingFile: "B" },
    { name: "三郎", address: "0x19...591", sharingFile: "C" },
    { name: "四郎", address: "0x98...612", sharingFile: "A" },
  ];
  return (
    <div>
      <h1 className="text-4xl font-bold text-center">Friend List</h1>
      <h1>Friend List</h1>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Address</th>
            <th className="px-4 py-2">Shareing file</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {dataList.map((item, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{item.name}</td>
              <td className="border px-4 py-2">{item.address}</td>
              <td className="border px-4 py-2">{item.sharingFile}</td>
              <td className="border px-4 py-2">{/* アクションボタンなどを追加 */}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default FriendList;