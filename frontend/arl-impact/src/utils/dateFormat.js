export function formatMonthDayYear(value) {
  if (!value) return "";

  if (typeof value === "string") {
    const isoMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})/);

    if (isoMatch) {
      return `${isoMatch[2]}-${isoMatch[3]}-${isoMatch[1]}`;
    }
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  return `${month}-${day}-${year}`;
}

export function monthDayYearToIsoDate(value) {
  if (!value) return "";

  const [month, day, year] = value.split("-");

  if (!month || !day || !year) return value;

  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

export function toDateInputValue(value) {
  if (!value) return "";

  if (typeof value === "string") {
    const isoMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})/);

    if (isoMatch) {
      return `${isoMatch[1]}-${isoMatch[2]}-${isoMatch[3]}`;
    }
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
}
