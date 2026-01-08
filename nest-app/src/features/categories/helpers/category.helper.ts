import { CategoryTaxonomy } from 'src/features/file/file.service';
//import { SupplierCategoryEntity } from '../entity/supplier-category.entity';
import { MarketplaceCategoryEntity } from '../entity/marketplace-category.entity';
export class CategoryHelper {
  transformedCategory(
    category: CategoryTaxonomy,
    categoryRow: MarketplaceCategoryEntity,
  ): CategoryTaxonomy[] {
    const children: CategoryTaxonomy[] = [];
    for (const child of category.children) {
      child['parentId'] = categoryRow.id;
      children.push(child);
    }
    return children;
  }
}
