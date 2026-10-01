export const getUpdateCondition = (table: string, column: string) => {
  return `${column} = CASE 
    WHEN ${table}.${column} IS NULL AND EXCLUDED.${column} IS NOT NULL THEN EXCLUDED.${column} 
    ELSE ${table}.${column} 
  END`;
};
