import { useState } from "react"
import { PieChart,Legend, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
function App() {

  const [username,setUsername]=useState("");
  const [user,setUser]=useState("");
  const [loading, setLoading]=useState(false);
  const [error, setError]=useState("");
  const [repo, setRepo]=useState([]);
  const [langStats, setLangStats]= useState({});
  const [userA , setUserA]= useState("");
  const [userB, setUserB]= useState("");
  const [usernameA , setUserNameA]= useState("");
  const [usernameB , setUserNameB]= useState("");


  const COLORS = ["#60a5fa", "#34d399", "#fbbf24", "#f87171", "#a78bfa", "#f472b6"];


  //count language function 
  function getLanguageStats(repo){
    const langCount={};

    for(const r of repo){
      if(r.language){
        langCount[r.language]=(langCount[r.language] || 0)+1;
      }
    }
    return langCount;
  }


  //fetch data function
  async function getUsers() {
    
    try{
      setLoading(true);
      setError("");
      const response= await fetch(
        `https://api.github.com/users/${username}`
      );

      if(!response.ok){
        throw new Error("user not found");
      }

      const data= await response.json();
      console.log(data);
      setUser(data);

      const repoResponse=await fetch(`https://api.github.com/users/${username}/repos`)
      const repoData= await repoResponse.json();
      setRepo(repoData);
      
      setLangStats(getLanguageStats(repoData));

    }
    catch(err){
      setUser("");
      console.log("error occured");
      setError(err.message);
    }
    finally{
      setLoading(false);
    }
    
  }

  async function handleCompare(){
    try{
      const [responseA, responseB]= await Promise.all([
        fetch(`https://api.github.com/users/${usernameA}`),
        fetch(`https://api.github.com/users/${usernameB}`),
      ]);

      const userA_Data= await responseA.json();
      const userB_Data= await responseB.json();
      setUserA(userA_Data);
      setUserB(userB_Data);
    }
    catch(err){
      console.log(err);
    }
    finally{

    }
  }


  const chartData= Object.entries(langStats).map(([lang,count])=>
      ({name: lang, value: count})
    );
  console.log(chartData);

  const topRepos=[...repo].sort((a,b)=>b.stargazers_count - a.stargazers_count).slice(0,5);
    
  return (
    
      <div className="min-h-screen bg-[#08090C] text-white">

        {/* Navbar */}
        <div className="w-full h-10 bg-[#08090C] border-b border-white sticky top-0 z-50"></div>

        {/* Sidebar + Main Content */}
        <div className="flex">

          {/* Sidebar */}
          <div className="w-64 min-h-[calc(100vh-40px)] bg-[#0E1118] border-r border-white sticky top-10">


            
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col items-center gap-4 p-6">

            <div>
              <h1 className="text-2xl font-bold">GitHub Profile Analyzer</h1>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter GitHub username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="px-4 py-2 rounded bg-gray-800 border border-gray-600 outline-none"
                />

                <button
                  className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
                  onClick={getUsers}
                >
                  Search
                </button>
              </div>
            </div>

            {loading && (
              <div>
                <p>loading...</p>
              </div>
            )}

            {user && (
              <div>
                <h1>{user.login}</h1>
                <img
                  src={user.avatar_url}
                  className="w-12 rounded-full"
                />
                <p>Followers: {user.followers}</p>
                <p>Following: {user.following}</p>
                <p>Repositories: {user.public_repos}</p>
              </div>
            )}

            {repo.length > 0 && (
              <div>
                {repo.map((r) => (
                  <div key={r.id}>
                    <h1>{r.name}</h1>
                    <p>language: {r.language}</p>
                    <p>star: {r.stargazers_count}</p>
                  </div>
                ))}
              </div>
            )}

            {error && (
              <div>
                <p className="text-red-500 text-2xl">{error}</p>
              </div>
            )}

            {chartData.length > 0 && (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>

                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}

            {topRepos.length > 0 && (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topRepos}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="stargazers_count"
                    fill="#60a5fa"
                  />
                </BarChart>
              </ResponsiveContainer>
            )}

          </div>

        </div>

      </div>
);
}
export default App 
