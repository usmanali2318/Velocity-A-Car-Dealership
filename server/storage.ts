
import { db } from "./db";
import {
  cars, orders, contactMessages,
  type Car, type InsertCar,
  type Order, type InsertOrder,
  type ContactMessage, type InsertContactMessage
} from "@shared/schema";
import { eq, and, gte, lte, desc, asc } from "drizzle-orm";

export interface IStorage {
  getCars(filters?: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    color?: string;
    sort?: 'price_asc' | 'price_desc';
  }): Promise<Car[]>;
  getCar(id: number): Promise<Car | undefined>;
  createCar(car: InsertCar): Promise<Car>;
  
  createOrder(order: InsertOrder): Promise<Order>;
  
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  
  // Helper for seeding
  seedCars(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getCars(filters?: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    color?: string;
    sort?: 'price_asc' | 'price_desc';
  }): Promise<Car[]> {
    let query = db.select().from(cars);
    const conditions = [];

    if (filters?.category) {
      conditions.push(eq(cars.category, filters.category));
    }
    if (filters?.minPrice) {
      conditions.push(gte(cars.price, filters.minPrice));
    }
    if (filters?.maxPrice) {
      conditions.push(lte(cars.price, filters.maxPrice));
    }
    if (filters?.color) {
      conditions.push(eq(cars.color, filters.color));
    }

    if (conditions.length > 0) {
      // @ts-ignore - complex query building with generic array
      query = query.where(and(...conditions));
    }

    if (filters?.sort === 'price_asc') {
      query = query.orderBy(asc(cars.price));
    } else if (filters?.sort === 'price_desc') {
      query = query.orderBy(desc(cars.price));
    } else {
      query = query.orderBy(desc(cars.id));
    }

    return await query;
  }

  async getCar(id: number): Promise<Car | undefined> {
    const [car] = await db.select().from(cars).where(eq(cars.id, id));
    return car;
  }

  async createCar(car: InsertCar): Promise<Car> {
    const [newCar] = await db.insert(cars).values(car).returning();
    return newCar;
  }

  async createOrder(order: InsertOrder): Promise<Order> {
    // Start a transaction to ensure atomic updates
    return await db.transaction(async (tx) => {
      const [car] = await tx.select().from(cars).where(eq(cars.id, order.carId));
      
      if (!car) throw new Error("Car not found");
      if (car.quantity < order.quantity) throw new Error("Insufficient quantity");

      // Update car quantity
      const newQuantity = car.quantity - order.quantity;
      await tx.update(cars)
        .set({ 
          quantity: newQuantity,
          availability: newQuantity > 0 
        })
        .where(eq(cars.id, order.carId));

      // Create order
      const [newOrder] = await tx.insert(orders).values(order).returning();
      return newOrder;
    });
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const [msg] = await db.insert(contactMessages).values(message).returning();
    return msg;
  }

  async seedCars(): Promise<void> {
    const existing = await this.getCars();
    if (existing.length > 0) return;

    const seedData: InsertCar[] = [
      { name: "Toyota Corolla", model: "2022", category: "Sedan", price: 25000, color: "White", quantity: 5, image: "toyota_corolla_2022.jpg" },
      { name: "Honda Civic", model: "2023", category: "Sedan", price: 27000, color: "Silver", quantity: 3, image: "honda_civic_2023.jpg" },
      { name: "BMW X5", model: "2023", category: "SUV", price: 65000, color: "Black", quantity: 2, image: "bmw_x5_2023.jpg" },
      { name: "Ford Mustang", model: "2022", category: "Sports", price: 55000, color: "Red", quantity: 4, image: "ford_mustang_2022.jpg" },
      { name: "Tesla Model S", model: "2024", category: "Electric", price: 89990, color: "Blue", quantity: 8, image: "tesla_model_s_2024.jpg" },
      { name: "Audi A6", model: "2021", category: "Luxury", price: 58000, color: "Grey", quantity: 1, image: "audi_a6_2021.jpg" },
      { name: "Mercedes C-Class", model: "2023", category: "Luxury", price: 45000, color: "Black", quantity: 3, image: "mercedes_c_class_2023.jpg" },
      { name: "Porsche 911", model: "2023", category: "Sports", price: 110000, color: "Yellow", quantity: 1, image: "porsche_911_2023.jpg" },
      { name: "Hyundai Ioniq 5", model: "2023", category: "Electric", price: 41000, color: "White", quantity: 6, image: "hyundai_ioniq_5_2023.jpg" },
      { name: "Jeep Wrangler", model: "2022", category: "SUV", price: 35000, color: "Green", quantity: 4, image: "jeep_wrangler_2022.jpg" }
    ];

    for (const car of seedData) {
      await this.createCar(car);
    }
  }
}

export const storage = new DatabaseStorage();
