import EmployeesTable from "@/components/shared/EmployeesTable";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useGetUnVerEmployees,
  useGetVerifiedEmployees,
} from "@/services/Employees/Employees";
import Loader from "@/components/shared/Loader/Loader";
import { roles, rolesToText } from "@/lib/helpers/roleToText";

export interface UnverifiedUsers {
  id: string;
  email: string;
  fio: string;
}

export interface VerifiedUsers extends UnverifiedUsers {
  role: (
    | "member_union"
    | "member_comitet"
    | "admin"
    | "secretar"
    | "corporative_secretar"
  )[];
}

const columnsUnVer: ColumnDef<UnverifiedUsers>[] = [
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
const columnsVer: ColumnDef<UnverifiedUsers>[] = [
  ...columnsUnVer,
  {
    accessorKey: "roles",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Роли
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];

const UsersTableAdminPage = () => {
  const { data: verifiedEmployees, isLoading } = useGetVerifiedEmployees();
  if (isLoading) {
    return <Loader />;
  }
  return (
    <Container>
      <EmployeesTable
        isRequest={false}
        columns={columnsVer}
        data={(verifiedEmployees || []).map((el) => ({
          ...el,
          roles: rolesToText(el.roles as unknown as (keyof typeof roles)[]),
        }))}
      />
    </Container>
  );
};

export default UsersTableAdminPage;
