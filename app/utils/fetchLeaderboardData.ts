import Papa from 'papaparse';

const GITHUB_CSV_URL = 'https://raw.githubusercontent.com/JonathanChavezTamales/llm-leaderboard/main/data/leaderboard.csv';
const LOCAL_MOCK_URL = '/mock/leaderboard.json';

export async function fetchLeaderboardData() {
  try {
    const res = await fetch(GITHUB_CSV_URL);
    if (!res.ok) throw new Error('Network error');
    const csv = await res.text();
    const parsed = Papa.parse(csv, { header: true });
    return parsed.data;
  } catch (err) {
    // fallback to local mock
    const res = await fetch(LOCAL_MOCK_URL);
    return await res.json();
  }
} 