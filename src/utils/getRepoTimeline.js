export function getRepoTimeline(repos, joinYear) {
  const yearCount = {};
  const currentYear = new Date().getFullYear();

  // Pehle saare saal 0 se initialize kar (join year se current year tak)
  for (let y = joinYear; y <= currentYear; y++) {
    yearCount[y] = 0;
  }

  // Ab actual repo data se counts fill kar
  for (const r of repos) {
    const year = new Date(r.created_at).getFullYear();
    yearCount[year] = (yearCount[year] || 0) + 1;
  }

  return yearCount;
}