import { useEffect, useState } from "react";
import { getShareChatGroups } from "@/lib/indexedDB";
import { ShareDBItem } from "@/types/indexedDB";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import dayjs from "dayjs";

type ShareColumnKey = keyof ShareDBItem | "delete";

const columns: { label: string; key: ShareColumnKey }[] = [
  { label: "채팅 그룹명", key: "title" },
  { label: "공유된 일자", key: "createdDate" },
  { label: "삭제", key: "delete" },
];

const ShareChatTableView = () => {
  const [data, setData] = useState<ShareDBItem[]>([]);

  useEffect(() => {
    getShareChatGroups().then(setData);
  }, []);

  // 삭제 함수 예시 (실제 구현 필요)
  const handleDelete = (id: number) => {
    console.log("삭제", id);
    // TODO: 삭제 로직 추가
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          {columns.map(({ label, key }) => (
            <TableCell key={key}>{label}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.length === 0 ? (
          <TableRow>
            <TableCell colSpan={columns.length} sx={{ textAlign: "center" }}>
              저장된 데이터가 없습니다.
            </TableCell>
          </TableRow>
        ) : (
          data.map((item, rowIdx) => (
            <TableRow key={item.chatGroupId ?? rowIdx}>
              {columns.map(({ key }, colIdx) => (
                <TableCell key={colIdx}>
                  {key === "delete" ? (
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(item.chatGroupId)}
                    >
                      삭제
                    </Button>
                  ) : key === "createdDate" ? (
                    dayjs(item.createdDate).format("YYYY-MM-DD HH:mm:ss")
                  ) : (
                    item[key]
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default ShareChatTableView;
