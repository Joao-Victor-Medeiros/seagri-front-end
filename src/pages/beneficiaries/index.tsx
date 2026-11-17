import { useMemo, useState, type FormEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Eye,
  Printer,
  Search,
} from "lucide-react";
import { AppNavigation } from "@/components/app-navigation";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type {
  BeneficiaryListDto,
  BeneficiarySortField,
  SortDirection,
} from "@/interfaces/beneficiary.interface";
import {
  getBeneficiaryReportUrl,
  getBeneficiaries,
  searchBeneficiaries,
} from "@/service/beneficiaries.service";
import styles from "./beneficiaries.module.css";

const PAGE_SIZE_OPTIONS = [10, 20, 50];
const PAGE_WINDOW_SIZE = 5;

const SORTABLE_COLUMNS: Array<{
  field: BeneficiarySortField;
  label: string;
}> = [
  { field: "nome", label: "Nome" },
  { field: "cpf", label: "CPF" },
  { field: "contato", label: "Contato" },
  { field: "programaSeagri", label: "Programa SEAGRI" },
  { field: "nomePropriedade", label: "Propriedade" },
  { field: "regimeProducao", label: "Regime de produção" },
  { field: "segmentoPrincipal", label: "Segmento principal" },
];

const displayValue = (value: string | null) => value || "—";

const BeneficiariesPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sortField, setSortField] = useState<BeneficiarySortField>("nome");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [selectedBeneficiary, setSelectedBeneficiary] =
    useState<BeneficiaryListDto | null>(null);

  const beneficiariesQuery = useQuery({
    queryKey: activeSearch
      ? ["beneficiarios", "search", activeSearch]
      : ["beneficiarios", "list", page, pageSize, sortField, sortDirection],
    queryFn: () =>
      activeSearch
        ? searchBeneficiaries(activeSearch)
        : getBeneficiaries({ page, size: pageSize, sortField, sortDirection }),
  });

  const searchResults = Array.isArray(beneficiariesQuery.data)
    ? beneficiariesQuery.data
    : undefined;
  const pageResult =
    beneficiariesQuery.data && !Array.isArray(beneficiariesQuery.data)
      ? beneficiariesQuery.data
      : undefined;

  const sortedSearchResults = useMemo(() => {
    if (!searchResults) {
      return [];
    }

    return [...searchResults].sort((first, second) => {
      const comparison = (first[sortField] ?? "").localeCompare(
        second[sortField] ?? "",
        "pt-BR",
        { sensitivity: "base" },
      );
      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [searchResults, sortDirection, sortField]);

  const totalElements = pageResult?.totalElements ?? sortedSearchResults.length;
  const totalPages =
    pageResult?.totalPages ?? Math.ceil(totalElements / pageSize);
  const currentPage = pageResult?.number ?? page;
  const visibleBeneficiaries =
    pageResult?.content ??
    sortedSearchResults.slice(currentPage * pageSize, (currentPage + 1) * pageSize);
  const firstResult = totalElements === 0 ? 0 : currentPage * pageSize + 1;
  const lastResult = Math.min(
    currentPage * pageSize + visibleBeneficiaries.length,
    totalElements,
  );
  const firstVisiblePage = Math.max(
    0,
    Math.min(
      currentPage - Math.floor(PAGE_WINDOW_SIZE / 2),
      totalPages - PAGE_WINDOW_SIZE,
    ),
  );
  const visiblePages = Array.from(
    { length: Math.min(totalPages, PAGE_WINDOW_SIZE) },
    (_, index) => firstVisiblePage + index,
  );

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPage(0);
    setActiveSearch(searchInput.trim());
  };

  const handlePageSizeChange = (value: string) => {
    setPageSize(Number(value));
    setPage(0);
  };

  const handleSort = (field: BeneficiarySortField) => {
    setSortDirection((currentDirection) =>
      field === sortField && currentDirection === "asc" ? "desc" : "asc",
    );
    setSortField(field);
    setPage(0);
  };

  const renderSortIcon = (field: BeneficiarySortField) => {
    if (sortField !== field) {
      return <ArrowUpDown size={14} aria-hidden="true" />;
    }

    return sortDirection === "asc" ? (
      <ArrowUp size={14} aria-hidden="true" />
    ) : (
      <ArrowDown size={14} aria-hidden="true" />
    );
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <AppNavigation />

        <main>
          <section className={styles.heading}>
            <div>
              <p className={styles.eyebrow}>GESTÃO DE CADASTROS</p>
              <h1 className={styles.title}>Beneficiários</h1>
              <p className={styles.subtitle}>
                Consulte e encontre pessoas beneficiárias cadastradas.
              </p>
            </div>
          </section>

          <section className={styles.toolbar} aria-label="Pesquisa e filtros">
            <form className={styles.searchForm} onSubmit={handleSearch}>
              <label className="sr-only" htmlFor="beneficiary-search">
                Pesquisar por nome, CPF, contato ou programa
              </label>
              <div className={styles.searchInput}>
                <Search size={18} aria-hidden="true" />
                <Input
                  id="beneficiary-search"
                  placeholder="Pesquisar por nome, CPF, contato ou programa..."
                  value={searchInput}
                  onChange={(event) => setSearchInput(event.target.value)}
                />
              </div>
              <Button type="submit">
                <Search size={16} aria-hidden="true" />
                Pesquisar
              </Button>
            </form>

            <div className={styles.listControls}>
              <label className={styles.pageSize}>
                <span>Por página</span>
                <Select
                  value={String(pageSize)}
                  onValueChange={handlePageSizeChange}
                >
                  <SelectTrigger aria-label="Quantidade por página">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PAGE_SIZE_OPTIONS.map((size) => (
                      <SelectItem key={size} value={String(size)}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </label>
            </div>
          </section>

          {beneficiariesQuery.isError && (
            <div className={styles.error} role="alert">
              <p>
                Não foi possível carregar os beneficiários.{" "}
                {beneficiariesQuery.error instanceof Error
                  ? beneficiariesQuery.error.message
                  : ""}
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={() => beneficiariesQuery.refetch()}
              >
                Tentar novamente
              </Button>
            </div>
          )}

          <section className={styles.tableCard} aria-label="Lista de beneficiários">
            <Table>
              <TableHeader>
                <TableRow>
                  {SORTABLE_COLUMNS.map(({ field, label }) => (
                    <TableHead
                      key={field}
                      aria-sort={
                        sortField === field
                          ? sortDirection === "asc"
                            ? "ascending"
                            : "descending"
                          : "none"
                      }
                    >
                      <button
                        type="button"
                        className={styles.sortButton}
                        onClick={() => handleSort(field)}
                      >
                        {label}
                        {renderSortIcon(field)}
                      </button>
                    </TableHead>
                  ))}
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {beneficiariesQuery.isLoading ? (
                  <TableRow>
                    <TableCell colSpan={8} className={styles.tableMessage}>
                      Carregando beneficiários...
                    </TableCell>
                  </TableRow>
                ) : beneficiariesQuery.isError ? null : visibleBeneficiaries.length ? (
                  visibleBeneficiaries.map((beneficiary, index) => (
                    <TableRow key={`${beneficiary.cpf}-${beneficiary.nome}-${index}`}>
                      {SORTABLE_COLUMNS.map(({ field }) => (
                        <TableCell key={field}>
                          {displayValue(beneficiary[field])}
                        </TableCell>
                      ))}
                      <TableCell>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          aria-label={`Visualizar ${beneficiary.nome}`}
                          onClick={() => setSelectedBeneficiary(beneficiary)}
                        >
                          <Eye size={17} aria-hidden="true" />
                        </Button>
                        {beneficiary.id !== null &&
                        beneficiary.id !== undefined ? (
                          <Button
                            asChild
                            type="button"
                            variant="ghost"
                            size="icon"
                          >
                            <a
                              href={getBeneficiaryReportUrl(beneficiary.id)}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`Imprimir relatório de ${beneficiary.nome}`}
                              title="Abrir relatório para impressão"
                            >
                              <Printer size={17} aria-hidden="true" />
                            </a>
                          </Button>
                        ) : (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            disabled
                            aria-label={`Imprimir relatório de ${beneficiary.nome}: ID do beneficiário não disponível`}
                            title="O DTO precisa retornar o ID do beneficiário."
                          >
                            <Printer size={17} aria-hidden="true" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className={styles.tableMessage}>
                      {activeSearch
                        ? "Nenhum beneficiário encontrado para essa pesquisa."
                        : "Nenhum beneficiário cadastrado."}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </section>

          <footer className={styles.pagination}>
            <span aria-live="polite">
              Exibindo {firstResult}–{lastResult} de {totalElements} registros
            </span>
            <nav aria-label="Paginação">
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={currentPage === 0 || beneficiariesQuery.isLoading}
                onClick={() => setPage(currentPage - 1)}
              >
                Anterior
              </Button>
              {visiblePages.map((pageNumber) => (
                <Button
                  key={pageNumber}
                  type="button"
                  variant={pageNumber === currentPage ? "default" : "outline"}
                  size="sm"
                  aria-label={`Página ${pageNumber + 1}`}
                  aria-current={pageNumber === currentPage ? "page" : undefined}
                  disabled={beneficiariesQuery.isLoading}
                  onClick={() => setPage(pageNumber)}
                >
                  {pageNumber + 1}
                </Button>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={
                  currentPage + 1 >= totalPages || beneficiariesQuery.isLoading
                }
                onClick={() => setPage(currentPage + 1)}
              >
                Próxima
              </Button>
            </nav>
          </footer>
        </main>
      </div>

      <Dialog
        open={selectedBeneficiary !== null}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedBeneficiary(null);
          }
        }}
      >
        {selectedBeneficiary && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedBeneficiary.nome}</DialogTitle>
            </DialogHeader>
            <dl className={styles.details}>
              {SORTABLE_COLUMNS.map(({ field, label }) => (
                <div key={field}>
                  <dt>{label}</dt>
                  <dd>{displayValue(selectedBeneficiary[field])}</dd>
                </div>
              ))}
            </dl>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default BeneficiariesPage;
