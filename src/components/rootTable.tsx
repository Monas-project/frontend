import React from 'react';

// メタデータの型定義
interface FileMetadata {
  cid: string;
  name: string;
  is_directory: boolean;
}

// ディレクトリメタデータの型定義
interface DirectoryMetadata {
  [path: string]: FileMetadata | DirectoryMetadata;
}

// データの型定義
interface Metadata {
  name: string;
  creation_date: string;
  child: DirectoryMetadata;
}

const MyComponent = ({ data }: { data: Metadata }) => {
  const renderMetadata = (metadata: DirectoryMetadata) => {
    return (
      <tbody>
        {Object.entries(metadata).map(([path, item], index) => (
          <tr key={index}>
            <td className="border px-4 py-2">
              {item.is_directory ? (
                <Image src="/folder.png" alt="folder" width={30} height={30} />
              ) : (
                <Image src="/file.png" alt="file" width={30} height={30} />
              )}
            </td>
            <td className="border px-4 py-2">{item.name}</td>
            <td className="border px-4 py-2">{data.name}</td>
            <td className="border px-4 py-2">{data.creation_date}</td>
            <td className="border px-4 py-2 flex">
              {item.is_directory ? (
                <Image
                  src="/download.png"
                  alt="Download"
                  width={30}
                  height={30}
                  onClick={() => handleDownload(item.cid)}
                />
              ) : (
                <Image
                  src="/delete.png"
                  alt="Delete"
                  width={30}
                  height={30}
                  onClick={() => handleDelete(item.cid)}
                />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    );
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-center">{data.name}</h1>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Data</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Owner</th>
            <th className="px-4 py-2">Data Info</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        {renderMetadata(data.child)}
      </table>
    </div>
  );
};

export default MyComponent;
