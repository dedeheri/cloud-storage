import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

interface PaginationPageProps {
  pagination: any;
}

const PaginationPage = ({ pagination }: PaginationPageProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-end">
      <Button
        disabled={pagination?.previous?.page ? false : true}
        onClick={() => createPageURL(pagination?.previous?.page)}
        variant="ghost"
        className="space-x-2 "
      >
        <IconChevronLeft className="w-5 h-5" />
        <h1>Previous</h1>
      </Button>

      <Button
        variant="ghost"
        disabled={pagination?.next?.page ? false : true}
        onClick={() => createPageURL(pagination?.next?.page)}
        className="space-x-2"
      >
        <h1>Next</h1>
        <IconChevronRight className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default PaginationPage;
