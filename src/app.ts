import express, { Request, Response } from 'express';
const app = express();
app.use(express.json())

app.get('/', (_req: Request, res: Response): Response => {
  return res.status(200).json({message: 'Hello World!'})
});


// register routes
app.get("/users", function (req: Request, res: Response) {
  // here we will have logic to return all users
})

app.get("/users/:id", function (req: Request, res: Response) {
  // here we will have logic to return user by id
})

app.post("/users", function (req: Request, res: Response) {
  // here we will have logic to save a user
})

app.put("/users/:id", function (req: Request, res: Response) {
  // here we will have logic to update a user by a given user id
})

app.delete("/users/:id", function (req: Request, res: Response) {
  // here we will have logic to delete a user by a given user id
})

export default app;
