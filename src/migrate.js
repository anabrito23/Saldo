// Translate legacy demo data without overwriting user-written titles.
const categories = {"Casa": "Housing", "Alimentação": "Groceries", "Transportes": "Transport", "Lazer": "Leisure", "Saúde": "Health", "Salário": "Salary", "Outros": "Other"};
const titles = {"Salário": "Salary", "Renda · Lisboa": "Rent · Lisbon", "Compras da semana": "Weekly groceries", "Passe Navegante": "Navegante travel pass", "Jantar com amigos": "Dinner with friends", "Farmácia": "Pharmacy"};
export function migrate(rows) {
 if (!Array.isArray(rows)) return rows;
 return rows.map(row => {
  if (!row || typeof row !== 'object') return row;
  return {...row, category: categories[row.category] || row.category,
   title: /^demo-\d+-\d+$/.test(row.id) ? (titles[row.title] || row.title) : row.title};
 });
}
