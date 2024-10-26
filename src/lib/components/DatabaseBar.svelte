<script>
  import DatabaseCard from './DatabaseCard.svelte';

  const databases = [
    { label: 'SQLite', isReady: true },
    { label: 'PostgreSQL', isReady: false },
    { label: 'MySQL', isReady: true },
    { label: 'MariaDB', isReady: false },
    { label: 'Oracle', isReady: true },
    { label: 'MS SQL Server', isReady: true },
    { label: 'IBM Db2', isReady: false },
    { label: 'LDAP', isReady: false },
    { label: 'Sybase', isReady: false },
    { label: 'H2', isReady: false },
    { label: 'Snowflake', isReady: false },
    { label: 'Microsoft Access', isReady: false },
    { label: 'Apache Hive', isReady: false },
    { label: 'Teradata', isReady: false },
  ];
</script>

<div class="flex flex-wrap gap-8 py-4 font-secondary">
  {#each databases as database}
    <DatabaseCard label={database.label} isReady={database.isReady} />
  {/each}
</div>
