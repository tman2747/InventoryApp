// const { Client } = require("pg");

// const SQL = `CREATE TABLE IF NOT EXISTS users (
//     id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
//     username varchar(255),
//     post text,
//     posted timestamp DEFAULT now()
// );
// `;

// async function main() {
//   console.log(process.env.HOST);

//   console.log("seeding...");
//   const client = new Client({
//     connectionString: `postgresql://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:5432/${process.env.DATABASE}`,
//   });
//   const count = await client.query("SELECT COUNT(*) FROM users");
//   if (count.rows[0].count === "0") {
//     await client.query(
//       "INSERT INTO users (username, post) VALUES ('Triston', 'Hello World!')"
//     );
//   }
//   await client.connect();
//   await client.query(SQL);
//   await client.end();
//   console.log("DONE");
// }
// main();
