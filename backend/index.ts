import express, { Application } from "express";
import cors from 'cors';
import router from "./src/routes/tasks.routes";

const app: Application = express();
const port = 8000;

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/", router)

app.listen(port, () => {
    console.log('====================================');
    console.log(`Server listening on port ${port}`);
    console.log('====================================');
})