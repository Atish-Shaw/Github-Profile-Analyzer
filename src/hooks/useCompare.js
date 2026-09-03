import { useState } from "react";
import { compareUsers } from "../services/githubApi";

export function useCompare() {

  const [userA, setUserA] = useState(() => {
    const savedUserA = localStorage.getItem("userA");
    return savedUserA ? JSON.parse(savedUserA) : "";
  });

  const [userB, setUserB] = useState(() => {
    const savedUserB = localStorage.getItem("userB");
    return savedUserB ? JSON.parse(savedUserB) : "";
  });

  const [repoA, setRepoA] = useState(() => {
    const savedRepoA = localStorage.getItem("repoA");
    return savedRepoA ? JSON.parse(savedRepoA) : [];
  });

  const [repoB, setRepoB] = useState(() => {
    const savedRepoB = localStorage.getItem("repoB");
    return savedRepoB ? JSON.parse(savedRepoB) : [];
  });

  const [usernameA, setUserNameA] = useState("");

  const [usernameB, setUserNameB] = useState("");

  const [errors, setErrors] = useState("");

  async function handleCompare() {
    try {
      setErrors("");

      const { userA, userB, reposA, reposB } = await compareUsers(usernameA, usernameB);

      setUserA(userA);
      setUserB(userB);
      setRepoA(reposA);
      setRepoB(reposB);

      localStorage.setItem("userA", JSON.stringify(userA));
      localStorage.setItem("userB", JSON.stringify(userB));
      localStorage.setItem("repoA", JSON.stringify(reposA));
      localStorage.setItem("repoB", JSON.stringify(reposB));

    } catch (err) {
      setErrors("User not found");
    }
  }

  function resetCompare() {
    setUserA("");
    setUserB("");
    setRepoA([]);
    setRepoB([]);

    setUserNameA("");
    setUserNameB("");

    setErrors("");

    localStorage.removeItem("userA");
    localStorage.removeItem("userB");
    localStorage.removeItem("repoA");
    localStorage.removeItem("repoB");
  }

  return {
    userA,
    userB,
    repoA,
    repoB,
    usernameA,
    usernameB,
    setUserNameA,
    setUserNameB,
    handleCompare,
    errors,
    resetCompare
  };
}