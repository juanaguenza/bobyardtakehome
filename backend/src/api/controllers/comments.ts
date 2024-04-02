import { client } from "../../config/elephantSQL";

interface Comment {
  id: number;
  author: string;
  text: string;
  date: Date;
  likes: number;
  image: string;
}

export async function getAllComments() {
  // get comments from database
  const query = "SELECT * FROM Comments";
  const response = await client.query(query);
  return response.rows;
}

export async function addComment(text: string, image: string) {
  console.log("adding comment");

  // add comment to database

  const query =
    "INSERT INTO Comments (Author, Text, Date, Likes, Image) VALUES ('Admin', $1, NOW(), 0, $2)";
  const values = [text, image];

  try {
    await client.query(query, values);
  } catch (err: any) {
    console.error("Error adding comment: ", err);
    throw err;
  }
}

export async function deleteComment(id: number) {
  // delete comment from database
  const query = "DELETE FROM Comments WHERE ID = $1";
  const values = [id];

  try {
    await client.query(query, values);
  } catch (err: any) {
    console.error("Error deleting comment: ", err);
    throw err;
  }
}

export async function editComment(id: number, text: string, image: string) {
  // edit comment in database
  const query = "UPDATE Comments SET Text = $1, Image = $2 WHERE ID = $3";
  const values = [text, image, id];

  try {
    await client.query<any, any>(query, values);
  } catch (err: any) {
    console.error("Error editing comment: ", err);
    throw err;
  }
}
