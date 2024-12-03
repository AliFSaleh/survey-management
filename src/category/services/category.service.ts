import { Body, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "../entities/category.entity";
import { Repository } from "typeorm";
import { CreateCategoryDto } from "../dto/create-category.dto";
import { instanceToInstance } from "class-transformer";
import CONSTANTS from "src/common/constants";
import { getNextPage, getSkip, getTotalPages } from "src/utils/pagination.utils";
import MESSAGES from "src/common/messages";
import { UpdateCategoryDto } from "../dto/update-category.dto";

@Injectable()
export class CategoryService {
    constructor (
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>
    ) {}
    
    /**
     * Finds categories
     */
    async index (
        pageNumber: number = CONSTANTS.PAGE_NUMBER,
        pageSize: number = CONSTANTS.PAGE_SIZE,
    ): Promise<{
        categories: Category[];
        totalCategories: number;
        totalPages: number;
        nextPage: number | -1;
        pageSize: number;
    }> {
        const skip = getSkip(pageNumber, pageSize);

        const [categories, totalCategories] =
         await this.categoryRepository.findAndCount({
            order:{
                created_at: CONSTANTS.ORDER_BY_DESC
            },
            skip,
            take: pageSize
        })

        const totalPages = getTotalPages(totalCategories, pageSize);

        const nextPage = getNextPage(pageNumber, totalPages);

        return { categories, totalCategories, totalPages, nextPage, pageSize };
    }

    /**
     * Create a category
     * @param {CreateCategoryDto} createCategoryDto
     * @returns {Promise<Category>}
     */
    async create (@Body() createCategoryDto: CreateCategoryDto) {
        const category = this.categoryRepository.create(createCategoryDto);

        return instanceToInstance(this.categoryRepository.save(category));
    }

    /**
     * Finds a category by id
     * @param {Category{"id"}} id - wanted category id 
     * @returns {Promise<Category>}
     * @throws {HttpException} if the category dose not exist
     */
    async show (id: Category["id"]): Promise<Category> {
        const category = await this.categoryRepository.findOne({
            where: {id}
        });

        if(!category){
            throw new HttpException(
                MESSAGES.ERROR.ID_DOES_NOT_EXISTS,
                HttpStatus.NOT_FOUND
            );
        }

        return category;
    }

    /**
     * Updates a category by id
     * @param {Category["id"]} id - updated category id
     * @param {UpdateCategoryDto} updateCategoryDto
     * @returns {Promise<Category>}
     * @throws {HttpException} if the category dose not exist
     */
    async update (
        id: Category["id"],
        updateCategoryDto: UpdateCategoryDto
    ): Promise<Category> {
        const category = await this.categoryRepository.findOne({
            where: {id}
        });

        return instanceToInstance(
            this.categoryRepository.save(
                this.categoryRepository.merge(category, updateCategoryDto)
            )
        );
    }
}