import EmployeesTable from "@/components/shared/EmployeesTable";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import Loader from "@/components/shared/Loader/Loader";
import { useGetUsers } from "@/services/Employees/Employees.ts";

export interface User {
  id: string;
  email: string;
  fio: string;
}

const usersColumns: ColumnDef<User>[] = [
  {
    accessorKey: "fio",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ФИО
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Почта
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];

const UsersTableAdminPage = () => {
  const { data, isLoading } = useGetUsers();
  if (isLoading) {
    return <Loader />;
  }
  return (
    <Container>
      <EmployeesTable
        isRequest={false}
        columns={usersColumns}
        data={(data || []).map((el) => ({
          ...el,
        }))}
      />
    </Container>
  );
};

export default UsersTableAdminPage;
