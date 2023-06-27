const express = require("express");
const path = require("path");
const app = express();
app.use(express.json());
const dbPath = path.join(__dirname, "cricketTeam.db");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
let db = null;

const initiliazeDBAndServer = async () => {
  try {
    db = await open({ filename: dbPath, driver: sqlite3.Database });
    app.listen(3000, () => {
      console.log("server running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`Db error : ${e.message}`);
    process.exit(1);
  }
};
initiliazeDBAndServer();
app.get("/players/", async (request, response) => {
  const { player_id } = request.params;
  const Dbquery = `SELECT *
    FROM
    cricket_team
    ORDER BY
    player_id`;

  const playerlist = await db.all(Dbquery);
  response.send(playerlist);
});
