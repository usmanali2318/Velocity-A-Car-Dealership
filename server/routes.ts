
import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api, errorSchemas } from "@shared/routes";
import { z } from "zod";
import { insertOrderSchema, insertUserSchema } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Seed database on startup
  await storage.seedCars();

  app.get(api.cars.list.path, async (req, res) => {
    const filters = {
      category: req.query.category as string,
      minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
      maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
      color: req.query.color as string,
      sort: req.query.sort as 'price_asc' | 'price_desc',
    };
    const cars = await storage.getCars(filters);
    res.json(cars);
  });

  app.get(api.cars.get.path, async (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }
    const car = await storage.getCar(id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.json(car);
  });

  app.post(api.orders.create.path, async (req, res) => {
    try {
      const input = insertOrderSchema.parse(req.body);
      const order = await storage.createOrder(input);
      res.status(201).json(order);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      if (err instanceof Error) {
        return res.status(422).json({ message: err.message });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post(api.contact.create.path, async (req, res) => {
    try {
      const input = api.contact.create.input.parse(req.body);
      const message = await storage.createContactMessage(input);
      res.status(201).json(message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Auth Routes
  app.post("/api/signup", async (req, res) => {
    try {
      const input = insertUserSchema.parse(req.body);
      const existing = await storage.getUserByUsername(input.username);
      if (existing) return res.status(400).json({ message: "Username already exists" });
      const user = await storage.createUser(input);
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ message: "Invalid signup data" });
    }
  });

  app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await storage.getUserByUsername(username);
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.json(user);
  });

  return httpServer;
}
