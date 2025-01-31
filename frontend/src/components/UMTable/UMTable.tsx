"use client";
import { useState, type ChangeEvent } from "react";
import { useQuery } from "@tanstack/react-query";

// Material UI
import {
  Avatar,
  Chip,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

// Custom Components
import { HeaderTable } from "../HeaderTable/HeaderTable";
import { FormUser } from "../FormUser/FormUser";

// Services
import { UserService } from "@/services/user.service";

// Types
import type { UserRole, UserStatus } from "@/types/users.type";

export const UMTable = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalUsers, setTotalUsers] = useState(50);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterByRole, setFilterByRole] = useState<UserRole | "">("");
  const [filterByStatus, setFilterByStatus] = useState<UserStatus | "">("");

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalAction, setModalAction] = useState<"add" | "edit">("add");
  const openModalToEditOrAddUser = (action: "add" | "edit") => {
    setModalAction(action);
    setOpenModal(true);
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const handleChangePageSize = (event: ChangeEvent<HTMLInputElement>) => {
    const newPageSize = Number.parseInt(event.target.value, 10);
    setPageSize(newPageSize);
    setPageIndex(0);
  };

  const handleChangePageIndex = (_event: unknown, newPageIndex: number) => {
    setPageIndex(newPageIndex);
  };

  const {
    isPending,
    error,
    data: users
  } = useQuery({
    queryKey: [
      "users",
      pageIndex,
      pageSize,
      searchTerm,
      filterByRole,
      filterByStatus
    ],
    queryFn: () =>
      UserService.GetUsers({
        page: pageIndex + 1,
        limit: pageSize,
        search: searchTerm,
        filterByRole,
        filterByStatus
      })
  });

  return (
    <Stack flexGrow={1} gap={2}>
      <HeaderTable
        searchTerm={searchTerm}
        onSearchTermChange={(newSearchTerm) => setSearchTerm(newSearchTerm)}
        filterByUserStatus={filterByStatus}
        onFilterByUserStatusChange={(newUserStatus) =>
          setFilterByStatus(newUserStatus)
        }
        filterByRole={filterByRole}
        onFilterByRoleChange={(newFilterByRole) =>
          setFilterByRole(newFilterByRole)
        }
        onAddOrEditUser={openModalToEditOrAddUser}
      />
      <Paper>
        <TableContainer sx={{ flex: 1, overflow: "auto", height: "65vh" }}>
          <Table sx={{ minWidth: 650 }} stickyHeader aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    backgroundColor: "primary.main",
                    color: "white",
                    fontWeight: "bold"
                  }}
                >
                  First Name
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "primary.main",
                    color: "white",
                    fontWeight: "bold"
                  }}
                >
                  Last Name
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "primary.main",
                    color: "white",
                    fontWeight: "bold"
                  }}
                >
                  Email
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "primary.main",
                    color: "white",
                    fontWeight: "bold"
                  }}
                >
                  Phone Number
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "primary.main",
                    color: "white",
                    fontWeight: "bold"
                  }}
                >
                  Role
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "primary.main",
                    color: "white",
                    fontWeight: "bold"
                  }}
                >
                  Status
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "primary.main",
                    color: "white",
                    fontWeight: "bold"
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {error ? (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell colSpan={7} align="center">
                    <Typography color="error">
                      Error loading the data
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : isPending ? (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell colSpan={7} align="center">
                    Loading
                  </TableCell>
                </TableRow>
              ) : (
                users?.map((user) => (
                  <TableRow
                    key={user.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 1,
                        alignItems: "center"
                      }}
                    >
                      <Avatar
                        alt={user.firstName}
                        src={user.profilePicture || ""}
                        sx={{ backgroundColor: "primary.main" }}
                      />
                      {user.firstName}
                    </TableCell>
                    <TableCell>{user.lastName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phoneNumber}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <Chip
                        disabled={user.status === "inactive"}
                        label={user.status === "active" ? "Active" : "Inactive"}
                        color={user.status === "active" ? "success" : "default"}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Stack direction="row">
                        <IconButton
                          color="secondary"
                          onClick={() => openModalToEditOrAddUser("edit")}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton color="secondary">
                          <Delete />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalUsers}
          rowsPerPage={pageSize}
          page={pageIndex}
          onPageChange={handleChangePageIndex}
          onRowsPerPageChange={handleChangePageSize}
        />
      </Paper>
      <FormUser open={openModal} onClose={onCloseModal} />
    </Stack>
  );
};
