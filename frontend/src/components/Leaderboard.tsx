import axios from "axios";
import { useEffect, useState } from "react";
import { useGameContext } from "../context/GameContext";
import { API_BASE_URL } from "../config";

type Ranking = [string, number];

type Score = {
  userId: string;
  value: number;
};

export function Leaderboard() {
  const { gameFinished } = useGameContext();
  const [rankings, setRankings] = useState<Ranking[]>([]);

  useEffect(() => {
    async function fetchAndSetRankings() {
      try {
        const response = await axios.get(`${API_BASE_URL}/score`);
        const dataArray: Score[] = response.data.data;

        const rankingArray: Ranking[] = dataArray.map((item) => [
          item.userId,
          item.value
        ]);

        rankingArray.sort((a, b) => b[1] - a[1]);
        setRankings(rankingArray.slice(0, 10));
      } catch (error) {
        console.error("Failed to fetch leaderboard", error);
      }
    }

    fetchAndSetRankings();
  }, [gameFinished]);

  return (
    <div className="leaderboard-container">
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {rankings.map(([name, score], index) => (
            <tr key={index}>
              <td>{name}</td>
              <td>{score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
