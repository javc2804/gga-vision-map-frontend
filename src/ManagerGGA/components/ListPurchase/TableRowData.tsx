import { TableRow, TableCell, Box } from "@mui/material";
import { IRow } from "../../view/expenses/ListPurchase";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

type ActionButtonsProps = {
  id: any;
};

type TableRowDataProps = {
  row: IRow;
  headers: string[];
};

const columnToDataKeyMap: { [key: string]: string } = {
  Acciones: "acciones",
};

const cursor = {
  cursor: "pointer",
};

export const ActionButtons: React.FC<ActionButtonsProps> = ({ id }) => {
  const navigate = useNavigate();

  const handleEdit = (data: any) => {
    console.log(data);

    const dataString = JSON.stringify(data);
    navigate(`/register-out/${dataString}`);
  };

  const handleDelete = (data: any) => {
    console.log(data);
  };

  return (
    <Box>
      <EditIcon style={cursor} color="primary" onClick={() => handleEdit(id)} />
      <DeleteIcon
        style={cursor}
        color="error"
        onClick={() => handleDelete(id)}
      />
    </Box>
  );
};

export const TableRowData: React.FC<TableRowDataProps> = ({ row, headers }) => {
  return (
    <TableRow key={row.ID}>
      {headers.map((header, index) => {
        const dataKey = columnToDataKeyMap[header] || header;
        return dataKey !== "acciones" ? (
          <TableCell key={`${row.ID}-${index}`}>
            {dataKey === "createdAt"
              ? new Date(row[dataKey]).toLocaleDateString("en-GB") // Formatear la fecha si la clave de los datos es 'createdAt'
              : row[dataKey]}
          </TableCell>
        ) : (
          <TableCell key={`${row.ID}-actions`}>
            <ActionButtons id={row} />
          </TableCell>
        );
      })}
    </TableRow>
  );
};
