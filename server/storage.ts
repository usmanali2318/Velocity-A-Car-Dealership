
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
    let query = db.select().from(cars).$dynamic();
    const conditions = [];

    if (filters?.category) {
      query = query.where(eq(cars.category, filters.category));
    }
    if (filters?.minPrice) {
      query = query.where(gte(cars.price, filters.minPrice));
    }
    if (filters?.maxPrice) {
      query = query.where(lte(cars.price, filters.maxPrice));
    }
    if (filters?.color) {
      query = query.where(eq(cars.color, filters.color));
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
    const quantityRequested = order.quantity || 1;
    
    // First check car existence and quantity
    const [car] = await db.select().from(cars).where(eq(cars.id, order.carId));
    if (!car) throw new Error("Car not found");
    if (car.quantity < quantityRequested) throw new Error("Insufficient quantity");

    const newQuantity = car.quantity - quantityRequested;
    
    // Perform updates sequentially since transaction has issues with promises in this environment
    await db.update(cars)
      .set({ 
        quantity: newQuantity,
        availability: newQuantity > 0 
      })
      .where(eq(cars.id, order.carId));

    const [newOrder] = await db.insert(orders).values({
      ...order,
      quantity: quantityRequested
    }).returning();
    
    return newOrder;
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const [msg] = await db.insert(contactMessages).values(message).returning();
    return msg;
  }

  async seedCars(): Promise<void> {
    const existing = await this.getCars();
    // We want to force refresh for this update
    if (existing.length > 0) {
      await db.delete(cars);
    }

    const seedData: InsertCar[] = [
      // Sedan / Hatchback
      { name: "Toyota Corolla", model: "2023", category: "Sedan", price: 7500000, color: "White", quantity: 5, image: "toyota_corolla_2022.jpg" },
      { name: "Honda Civic", model: "2023", category: "Sedan", price: 8500000, color: "Black", quantity: 3, image: "honda_civic_2023.jpg" },
      { name: "Honda City", model: "2023", category: "Sedan", price: 5800000, color: "Silver", quantity: 4, image: "honda_city.jpg" },
      { name: "Toyota Yaris", model: "2023", category: "Sedan", price: 5200000, color: "Grey", quantity: 6, image: "toyota_yaris.jpg" },
      { name: "Suzuki Alto", model: "2023", category: "Sedan", price: 2800000, color: "White", quantity: 10, image: "suzuki_alto.jpg" },
      { name: "Suzuki Cultus", model: "2023", category: "Sedan", price: 4200000, color: "Blue", quantity: 5, image: "suzuki_cultus.jpg" },
      // SUV / Crossover
      { name: "Toyota Fortuner", model: "2023", category: "SUV", price: 18500000, color: "White", quantity: 2, image: "toyota_fortuner.jpg" },
      { name: "Toyota Prado", model: "2022", category: "SUV", price: 45000000, color: "Black", quantity: 1, image: "toyota_prado.jpg" },
      { name: "Kia Sportage", model: "2023", category: "SUV", price: 8500000, color: "Silver", quantity: 4, image: "kia_sportage.jpg" },
      { name: "Hyundai Tucson", model: "2023", category: "SUV", price: 8200000, color: "Grey", quantity: 3, image: "hyundai_tucson.jpg" },
      { name: "Honda BR-V", model: "2023", category: "SUV", price: 6500000, color: "Silver", quantity: 4, image: "honda_brv.jpg" },
      { name: "Hyundai Ioniq 5", model: "2023", category: "SUV", price: 12000000, color: "White", quantity: 2, image: "hyundai_ioniq_5_2023.jpg" },
      { name: "Jeep Wrangler", model: "2022", category: "SUV", price: 25000000, color: "Green", quantity: 1, image: "jeep_wrangler_2022.jpg" },
      { name: "BMW X5", model: "2023", category: "SUV", price: 35000000, color: "Blue", quantity: 1, image: "bmw_x5_2023.jpg" },
      // Pickup / Utility
      { name: "Toyota Hilux Revo", model: "2023", category: "Pickup", price: 14500000, color: "White", quantity: 3, image: "toyota_hilux_revo.jpg" },
      { name: "Isuzu D-Max", model: "2023", category: "Pickup", price: 12500000, color: "Black", quantity: 2, image: "isuzu_d_max.jpg" },
      // Luxury / Sports
      { name: "BMW 7 Series", model: "2023", category: "Luxury", price: 65000000, color: "Black", quantity: 1, image: "bmw_7_series.jpg" },
      { name: "Mercedes-Benz S-Class", model: "2023", category: "Luxury", price: 75000000, color: "Silver", quantity: 1, image: "mercedes_s_class.jpg" },
      { name: "Audi A8", model: "2023", category: "Luxury", price: 68000000, color: "Grey", quantity: 1, image: "audi_a8.jpg" },
      { name: "Porsche Cayenne", model: "2023", category: "Luxury", price: 55000000, color: "White", quantity: 2, image: "porsche_cayenne.jpg" },
      { name: "Range Rover Vogue", model: "2023", category: "Luxury", price: 95000000, color: "Black", quantity: 1, image: "range_rover_vogue.jpg" },
      { name: "Lexus LX 570", model: "2021", category: "Luxury", price: 85000000, color: "White", quantity: 1, image: "lexus_lx_570.jpg" },
      { name: "Audi A6", model: "2021", category: "Sedan", price: 15000000, color: "Black", quantity: 2, image: "audi_a6_2021.jpg" },
      { name: "Ford Mustang", model: "2022", category: "Luxury", price: 22000000, color: "Red", quantity: 1, image: "ford_mustang_2022.jpg" },
      { name: "Mercedes C-Class", model: "2023", category: "Luxury", price: 18000000, color: "Blue", quantity: 3, image: "mercedes_c_class_2023.jpg" },
      { name: "Porsche 911", model: "2023", category: "Luxury", price: 45000000, color: "Silver", quantity: 1, image: "porsche_911_2023.jpg" },
      { name: "Tesla Model S", model: "2024", category: "Luxury", price: 30000000, color: "White", quantity: 2, image: "tesla_model_s_2024.jpg" }
    ];

    for (const car of seedData) {
      await this.createCar(car);
    }
  }
}

export const storage = new DatabaseStorage();
