import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query } from "@nestjs/common";
import { CategoryService } from "../services/category.service";
import { Auth } from "src/auth/decorators/auth.decorator";
import { PageinationDTO } from "src/common/dto/pagination.dto";
import { PaginatedResponse } from "src/common/interfaces/payload.interface";
import { instanceToInstance } from "class-transformer";
import { Category } from "../entities/category.entity";
import { CreateCategoryDto } from "../dto/create-category.dto";
import { RoleEnum } from "src/user/enums/role.enum";
import { UpdateCategoryDto } from "../dto/update-category.dto";

@Controller("categories")
export class CategoryController {
    /**
     * We should inject the Service within the constructor.
     */
    constructor (private categoryService: CategoryService) {}

    /**
     * Get all categories
     * @returns {}
     */
    @Get()
    @Auth()
    @HttpCode(HttpStatus.OK)
    async get(
        @Query() paginrationDTO: PageinationDTO
    ): Promise<PaginatedResponse<Category>> {
        const data = await this.categoryService.index(
            paginrationDTO.pageNumber,
            paginrationDTO.pageSize
        );

        return {
            data: data?.categories.map((category) => instanceToInstance(category)),
            metaData:{
                totalItems: data?.totalCategories,
                totalPages: data?.totalPages,
                nextPage: data?.nextPage,
                pageNumber: paginrationDTO.pageNumber,
                pageSize: paginrationDTO.pageSize
            }
        }; 
    }

    /**
     * Create new category
     * @param {CreateCategoryDto} createCategoryDto
     * @returns {Promise<Category>}
     */
    @Post()
    @Auth(RoleEnum.ADMIN)
    @HttpCode(HttpStatus.CREATED)
    async craete(
        @Body() createCategoryDto: CreateCategoryDto
    ): Promise<Category> {
        return this.categoryService.create(createCategoryDto);
    }

    /**
     * Show category
     * @param {Category["id"]} id
     * @returns {Promise<Category>}
     */
    @Get(":id")
    @Auth()
    @HttpCode(HttpStatus.OK)
    async show(
        @Param("id", ParseUUIDPipe) id: Category["id"]
    ): Promise<Category> {
        return instanceToInstance(await this.categoryService.show(id));
    }

    /**
     * Update Category.
     * @param {Category["id"]} id
     * @param {UpdateCategoryDto} updateCategoryDto
     * @returns {Promise<Category>}
     */
    @Put(":id")
    @Auth(RoleEnum.ADMIN)
    @HttpCode(HttpStatus.OK)
    async update(
        @Param("id", ParseUUIDPipe) id: Category["id"],
        @Body() updateCategoryDto: UpdateCategoryDto
    ): Promise<Category> {
        return this.categoryService.update(id, updateCategoryDto);
    }
}