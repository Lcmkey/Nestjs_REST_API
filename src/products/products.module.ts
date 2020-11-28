import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductService } from "./products.services";
import { ProductsController } from "./products.controller";
import { Product, ProductSchema } from "./schemas/product.schema";

@Module({
    providers: [ProductService],
    controllers: [ProductsController],
    imports: [
        ProductsModule,
        MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])
    ]
})

export class ProductsModule {
}