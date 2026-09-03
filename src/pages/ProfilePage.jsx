import { useParams } from "react-router-dom";
import { useEffect } from "react";
import UserCard from "../components/profile/userCard";
import RepoList from "../components/RepoList";
import LanguageChart from "../components/charts/LanguageChart";
import TopRepoChart from "../components/charts/TopRepoChart";
import SummaryCard from "../components/profile/SummaryCard";
import StatChips from "../components/profile/StatChips";
import FunFactCard from "../components/profile/FunFactCard";
import RepoTimelineChart from "../components/charts/RepoTimelineChart";
import Tabs from "../components/tabs";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { getRepoTimeline } from "../utils/getRepoTimeline";

const COLORS = ["#BF4636", "#34d399", "#fbbf24", "#f87171", "#a78bfa", "#f472b6"];

function ProfilePage({
  user,
  repo,
  langStats,
  loading,
  error,
  activeTab,
  setActiveTab,
  getUsers,
}) {
  const { username } = useParams();

  useEffect(() => {
    if (!user) {
      getUsers(username);
    }
  }, [username]);

  const chartData = Object.entries(langStats).map(([lang, count]) =>
    ({ name: lang, value: count })
  );

  const topRepos = [...repo].sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 5);

  const totalStars = repo.reduce((total, r) => total + r.stargazers_count, 0);
  const totalForks = repo.reduce((total, r) => total + r.forks_count, 0);

  const sortedLangs = Object.entries(langStats).sort((a, b) => b[1] - a[1]);
  const topLanguage = sortedLangs.length > 0 ? sortedLangs[0][0] : "N/A";

  const topLanguageCount = sortedLangs.length > 0 ? sortedLangs[0][1] : 0;
  const topLanguagePercent = repo.length > 0
    ? Math.round((topLanguageCount / repo.length) * 100)
    : 0;

  const joinDate = user.created_at ? new Date(user.created_at) : null;
  const memberSince = joinDate ? joinDate.toLocaleDateString("en-US", { year: "numeric", month: "long" }) : "N/A";

  const totalLanguages = Object.keys(langStats).length;

  const mostForkedRepo = [...repo].sort((a, b) => b.forks_count - a.forks_count)[0];

  const reposWithDescription = repo.filter((r) => r.description).length;
  const descriptionCoverage = repo.length > 0
    ? Math.round((reposWithDescription / repo.length) * 100)
    : 0;

  const joinYear = joinDate ? joinDate.getFullYear() : new Date().getFullYear();
  const timelineData = getRepoTimeline(repo, joinYear);

  const timelineChartData = Object.entries(timelineData)
    .map(([year, count]) => ({ year, count }))
    .sort((a, b) => a.year - b.year);

  const tabContent = {
    overview: (
      <>
        <div className="flex gap-4 w-full mt-4">
          <SummaryCard
            totalStars={totalStars}
            totalForks={totalForks}
            reposCount={repo.length}
            githubUrl={user.html_url}
          />
        </div>
        <StatChips topLanguage={topLanguage} memberSince={memberSince} />

        <UserCard user={user} />
        <div className="flex gap-4 w-full mt-4">
          <LanguageChart chartData={chartData} COLORS={COLORS} />
          <TopRepoChart topRepos={topRepos} />
        </div>
        <FunFactCard
          totalLanguages={totalLanguages}
          topLanguage={topLanguage}
          topLanguagePercent={topLanguagePercent}
          mostForkedRepo={mostForkedRepo}
          descriptionCoverage={descriptionCoverage}
        />
      </>
    ),
    repositories: (
      <>
        <RepoTimelineChart timelineChartData={timelineChartData} />
        <RepoList repo={repo} />
      </>
    ),
    projects: <p className="text-gray-500">No public projects found.</p>,
  };

  return (
    <div className="flex-col flex w-full">
      {loading && <Loading />}

      {user && <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />}

      {user && tabContent[activeTab]}

      {error && <ErrorMessage />}
    </div>
  );
}

export default ProfilePage;