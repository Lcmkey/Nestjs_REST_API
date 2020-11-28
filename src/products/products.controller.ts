import { Body, Controller, Delete, Get, Header, HttpCode, HttpStatus, Param, Post, Put, Redirect, Req, Res } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { UpdateProductDto } from 'src/products/dto/update-product.dto';
import { ProductService } from './products.services';
import { Product } from './schemas/product.schema';

@Controller('products')
export class ProductsController {

    constructor(private readonly productsService: ProductService) {
    }

    // @Get()
    // // @Redirect("https://google.com", 301)
    // getAll(@Req() req: Request, @Res() res: Response): string {
    //     res.status(201).end("Poke");
    //     return "get All";
    // }

    @Get()
    getAll(): Promise<Product[]> {
        return this.productsService.getAll();
    }

    @Get(":id")
    getOne(@Param("id") id: string): Promise<Product> {
        return this.productsService.getById(id);
    }

    @Post()
    // @HttpCode(201)
    @HttpCode(HttpStatus.CREATED)
    @Header("Cache-Control", "none")
    create(@Body() createProductDto: CreateProductDto): Promise<Product> {
        // const { title, price } = createProductDto;
        return this.productsService.create(createProductDto);
    }

    @Delete(":id")
    remote(@Param("id") id: string): Promise<Product> {
        return this.productsService.remove(id);
    }

    @Put(":id")
    update(@Body() updateProductDto: UpdateProductDto, @Param("id") id: string): Promise<Product> {
        return this.productsService.update(id, updateProductDto);
    }
}
