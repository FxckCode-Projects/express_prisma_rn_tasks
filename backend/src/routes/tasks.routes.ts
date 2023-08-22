import { Request, Response, Router } from 'express';
import prisma from '../prismaClient';

const router = Router();


router.get("/tasks", async (req: Request, res: Response) => {
    const response = await prisma.tasks.findMany();
    res.json(response)
})

router.post("/tasks", async (req: Request, res: Response) => {
    const { title, description } = req.body;

    try {
        await prisma.tasks.create({
            data: {
                title,
                description
            }
        });
        res.json("creado");
    } catch (error) {
        res.status(500).json({ error: "Failed to create task." });
    }
})

router.get("/checktask/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const task = await prisma.tasks.update({
            where: {
                id: parseInt(id)
            }, data: {
                status: true
            }
        })

        res.json(task)

    } catch (error) {
        res.status(500).json({ error: "Failed completed task" });
    }
})

router.get("/tasks/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const task = await prisma.tasks.findUnique({
            where: {
                id: parseInt(id)
            }
        })
        res.json(task)
    } catch (error) {
        res.status(500).json({ error: "Failed show task" });
    }
})

router.put("/tasks/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
        const task = await prisma.tasks.update({
            data: {
                title,
                description
            }, where: {
                id: parseInt(id)
            }
        })
        res.json(task)
    } catch (error) {
        res.status(500).json({ error: "Failed update task" });
    }
})

router.delete("/tasks/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await prisma.tasks.delete({
            where: {
                id: parseInt(id)
            }
        })
        res.json("Eliminado")
    } catch (error) {
        res.status(500).json({ error: "Failed delete task." });
    }
    
})  

export default router