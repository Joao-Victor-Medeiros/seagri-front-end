import { BarChart3, ClipboardList, MapPin, Sprout } from "lucide-react";
import { AppNavigation } from "@/components/app-navigation";
import { REPORT_DEMO_DATA } from "./report-demo-data";
import styles from "./reports.module.css";

const numberFormatter = new Intl.NumberFormat("pt-BR");

const ReportsPage = () => {
  const maxMonthlyCount = Math.max(
    ...REPORT_DEMO_DATA.monthlyRegistrations.map(({ count }) => count),
  );
  const maxLocalityCount = Math.max(
    ...REPORT_DEMO_DATA.localities.map(({ count }) => count),
  );
  const maxCropCount = Math.max(
    ...REPORT_DEMO_DATA.crops.map(({ count }) => count),
  );

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <AppNavigation />

        <main>
          <section className={styles.heading} aria-labelledby="reports-title">
            <div>
              <p className={styles.eyebrow}>PAINEL GERENCIAL</p>
              <h1 id="reports-title" className={styles.title}>
                Relatórios de cadastros
              </h1>
              <p className={styles.subtitle}>
                Acompanhe os indicadores da produção rural cadastrada.
              </p>
            </div>
            <span className={styles.demoBadge}>
              <span className={styles.statusDot} aria-hidden="true" />
              Dados demonstrativos
            </span>
          </section>

          <aside className={styles.notice} role="note">
            Os números desta tela são fictícios e servem apenas para demonstrar
            o painel. Nenhum dado real foi consultado.
          </aside>

          <section className={styles.metrics} aria-label="Indicadores gerais">
            <article className={styles.metricCard}>
              <div className={styles.metricHeading}>
                <span>Cadastros totais</span>
                <ClipboardList size={19} aria-hidden="true" />
              </div>
              <strong className={styles.metricValue}>
                {numberFormatter.format(REPORT_DEMO_DATA.totals.registrations)}
              </strong>
              <span className={styles.metricCaption}>
                Registros no conjunto demonstrativo
              </span>
            </article>

            <article className={styles.metricCard}>
              <div className={styles.metricHeading}>
                <span>Localidades atendidas</span>
                <MapPin size={19} aria-hidden="true" />
              </div>
              <strong className={styles.metricValue}>
                {numberFormatter.format(REPORT_DEMO_DATA.totals.localities)}
              </strong>
              <span className={styles.metricCaption}>
                Com ao menos um cadastro ilustrativo
              </span>
            </article>

            <article className={styles.metricCard}>
              <div className={styles.metricHeading}>
                <span>Culturas cadastradas</span>
                <Sprout size={19} aria-hidden="true" />
              </div>
              <strong className={styles.metricValue}>
                {numberFormatter.format(REPORT_DEMO_DATA.totals.crops)}
              </strong>
              <span className={styles.metricCaption}>
                Tipos no conjunto demonstrativo
              </span>
            </article>
          </section>

          <section className={styles.charts} aria-label="Gráficos gerenciais">
            <article className={`${styles.chartCard} ${styles.monthlyCard}`}>
              <div className={styles.chartHeader}>
                <div>
                  <h2>Cadastros por mês</h2>
                  <p>Últimos seis meses demonstrativos</p>
                </div>
                <BarChart3 size={20} aria-hidden="true" />
              </div>
              <ol className={styles.monthChart}>
                {REPORT_DEMO_DATA.monthlyRegistrations.map(({ month, count }) => (
                  <li className={styles.monthColumn} key={month}>
                    <span className={styles.monthValue}>
                      {numberFormatter.format(count)}
                    </span>
                    <div className={styles.monthTrack} aria-hidden="true">
                      <div
                        className={styles.monthBar}
                        style={{ height: `${(count / maxMonthlyCount) * 100}%` }}
                      />
                    </div>
                    <span className={styles.monthLabel}>{month}</span>
                  </li>
                ))}
              </ol>
            </article>

            <RankedList
              title="Cadastros por localidade"
              description="Cinco localidades com mais registros"
              items={REPORT_DEMO_DATA.localities}
              maxCount={maxLocalityCount}
            />

            <RankedList
              title="Culturas mais cadastradas"
              description="Distribuição ilustrativa por cultura"
              items={REPORT_DEMO_DATA.crops}
              maxCount={maxCropCount}
            />
          </section>

          <p className={styles.footerNote}>
            Para relatórios reais, será necessário conectar este painel a uma
            API de consulta.
          </p>
        </main>
      </div>
    </div>
  );
};

interface RankedListProps {
  title: string;
  description: string;
  items: Array<{ name: string; count: number }>;
  maxCount: number;
}

const RankedList = ({
  title,
  description,
  items,
  maxCount,
}: RankedListProps) => (
  <article className={styles.chartCard}>
    <div className={styles.chartHeader}>
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
    <ol className={styles.rankedList}>
      {items.map(({ name, count }) => (
        <li className={styles.rankedItem} key={name}>
          <div className={styles.rankedLabel}>
            <span>{name}</span>
            <strong>{numberFormatter.format(count)}</strong>
          </div>
          <div
            className={styles.rankedTrack}
            role="img"
            aria-label={`${name}: ${numberFormatter.format(count)} cadastros`}
          >
            <span
              className={styles.rankedBar}
              style={{ width: `${(count / maxCount) * 100}%` }}
            />
          </div>
        </li>
      ))}
    </ol>
  </article>
);

export default ReportsPage;
