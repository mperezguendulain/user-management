"use client";
import {
  Paper,
  Box,
  Select,
  MenuItem,
  InputAdornment,
  FormControl,
  Button,
  InputLabel
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { FilterAlt } from "@mui/icons-material";

// Types
import type { UserRole, UserStatus } from "@/types/users.type";

// Styled Components
import { StyledTextField } from "./header.styles";

type HeaderTableProps = {
  searchTerm: string;
  onSearchTermChange: (newSearchTerm: string) => void;
  filterByUserStatus: UserStatus | "";
  filterByRole: UserRole | "";
  onFilterByRoleChange: (newUserRole: UserRole | "") => void;
  onFilterByUserStatusChange: (newUserStatus: UserStatus | "") => void;
  onAddOrEditUser: (action: "add" | "edit") => void;
};
export const HeaderTable = ({
  searchTerm,
  onSearchTermChange,
  filterByUserStatus,
  filterByRole,
  onFilterByRoleChange,
  onFilterByUserStatusChange,
  onAddOrEditUser
}: HeaderTableProps) => {
  return (
    <Paper sx={{ display: "flex", flexDirection: "column", p: 2 }}>
      <Box sx={{ minWidth: 650 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 1,
            alignItems: "center"
          }}
        >
          <StyledTextField
            size="small"
            placeholder="Search..."
            value={searchTerm}
            onChange={(evt) => onSearchTermChange(evt.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              )
            }}
            sx={{ flex: 4 }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 1,
              flex: 4.5,
              alignItems: "center"
            }}
          >
            <FormControl fullWidth size="small">
              <InputLabel>Role</InputLabel>
              <Select
                id="demo-select-small"
                value={filterByRole}
                label="Role"
                onChange={(e) =>
                  onFilterByRoleChange(e.target.value as UserRole)
                }
                startAdornment={
                  <FilterAlt sx={{ mr: 2, color: "primary.main" }} />
                }
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="user">User</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth size="small">
              <InputLabel>Status</InputLabel>
              <Select
                id="demo-select-small"
                value={filterByUserStatus}
                label="Status"
                onChange={(e) => {
                  onFilterByUserStatusChange(e.target.value as UserStatus | "");
                }}
                startAdornment={
                  <FilterAlt sx={{ mr: 2, color: "primary.main" }} />
                }
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Button
            variant="contained"
            sx={{
              textTransform: "none",
              flex: 1.5,
              height: "40px",
              display: "flex",
              alignItems: "center",
              gap: 1
            }}
            startIcon={<PersonAddIcon />}
            onClick={() => onAddOrEditUser("add")}
          >
            Add user
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};
