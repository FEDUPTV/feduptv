export function parseApplicantBirthdate(value: unknown) {
  const birthdate = String(value || "").trim();
  const slashMatch = birthdate.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  const dashMatch = birthdate.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);

  const month = slashMatch
    ? Number(slashMatch[1])
    : dashMatch
    ? Number(dashMatch[2])
    : NaN;
  const day = slashMatch
    ? Number(slashMatch[2])
    : dashMatch
    ? Number(dashMatch[3])
    : NaN;
  const year = slashMatch
    ? Number(slashMatch[3])
    : dashMatch
    ? Number(dashMatch[1])
    : NaN;

  if (!month || !day || !year) return null;

  const parsed = new Date(year, month - 1, day);

  if (
    parsed.getFullYear() !== year ||
    parsed.getMonth() !== month - 1 ||
    parsed.getDate() !== day
  ) {
    return null;
  }

  return parsed;
}

export function calculateApplicantAge(value: unknown, today = new Date()) {
  const birthdate = parseApplicantBirthdate(value);

  if (!birthdate) return null;

  let age = today.getFullYear() - birthdate.getFullYear();
  const monthDiff = today.getMonth() - birthdate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthdate.getDate())
  ) {
    age--;
  }

  return age;
}

export function formatApplicantBirthdate(value: unknown) {
  const birthdate = parseApplicantBirthdate(value);

  if (!birthdate) return null;

  const year = birthdate.getFullYear();
  const month = String(birthdate.getMonth() + 1).padStart(2, "0");
  const day = String(birthdate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function getApplicantDisplayAge(age: unknown, birthdate: unknown) {
  const parsedAge = Number(age);

  if (Number.isInteger(parsedAge) && parsedAge >= 0) {
    return parsedAge;
  }

  return calculateApplicantAge(birthdate);
}
