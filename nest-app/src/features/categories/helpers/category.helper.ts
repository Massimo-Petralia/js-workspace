import { CategoryTaxonomy } from 'src/features/file/file.service';
import { Category } from '../category.entity';
export class CategoryHelper {
  transformedCategory(
    category: CategoryTaxonomy,
    categoryRow: Category,
  ): CategoryTaxonomy[] {
    const children: CategoryTaxonomy[] = [];
    for (const child of category.children) {
      child['parentId'] = categoryRow.id;
      children.push(child);
    }
    return children;
  }
}
