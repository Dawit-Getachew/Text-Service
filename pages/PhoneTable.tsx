import {
  TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Tooltip,
  TextField, Typography
} from "@mui/material"
import { FC, useState, ChangeEventHandler } from "react"
import EditIcon from "@ant-design/icons/EditFilled"
import DoneIcon from "@ant-design/icons/RightCircleTwoTone"

const PhoneElement: FC<{
  row: string;
  onSuccess: (value: string, idx: number) => void;
  idx: number;
}> = ({ row, onSuccess, idx }) => {
  const [onEdit, setOnEdit] = useState<boolean>(false)
  const [defaultPhone, setDefaultPhone] = useState<string>("")
  const [inputPhone, setInputPhone] = useState<string>("")

  const handleEdit = (value: string) => {
    setDefaultPhone(value)
    setOnEdit(true)
  }

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputPhone(e.target.value)
  }

  const hanldeSubmit = () => {
    setOnEdit(false)
    onSuccess(inputPhone, idx)
  }

  return (
    <>
      <TableCell align="left">
        {onEdit ? (
          <TextField defaultValue={defaultPhone} onChange={handleChange} onKeyDown={(data) => {
            if (data.code) {
              if (data.code === "Enter") {
                hanldeSubmit()
              }
            }
          }} />
        ) : row}
      </TableCell>
      <TableCell align="left">
        <Tooltip title="Edit Phone Number">
          {onEdit ? (
            <IconButton color="success" onClick={hanldeSubmit}>
              <DoneIcon />
            </IconButton>
          ) : (
            <IconButton color="warning" onClick={() => handleEdit(row)}>
              <EditIcon />
            </IconButton>
          )}
        </Tooltip>
      </TableCell>
    </>
  )
}

export const PhoneTable: FC<{ rows: string[], setRows: (value: string[]) => void }> = ({
  rows, setRows
}) => {
  const handleSuccessEdit = (value: string, idx: number) => {
    setRows(rows.map((item, _idx) => _idx !== idx ? item : value))
  }

  return rows.length > 0 ? (
    <>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Found {rows.length} Phone Numbers
      </Typography>
      <TableContainer component={Paper} sx={{ height: 500, overflowY: 'scroll', overflowX: 'hidden' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: 20 }}>#</TableCell>
              <TableCell align="left" sx={{ fontSize: 20 }}>Phone Number</TableCell>
              <TableCell align="left" sx={{ fontSize: 20 }}>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, idx) => (
              <TableRow
                key={idx}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {idx + 1}
                </TableCell>
                <PhoneElement row={row} onSuccess={handleSuccessEdit} idx={idx} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  ) : <></>
}