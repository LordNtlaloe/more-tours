import { getAllCategories } from "@/app/_actions/_categoryActions";
import { CategoriesTable } from "@/components/categories/CategoriesTable/CategoriesTable";
import { columns } from "@/components/categories/CategoriesTable/columns";
import AddNewCategoryButton from "@/components/categories/AddCategoryButton";


const getCategories = async () => {
  const data = await getAllCategories();
  return data;
};

const CategoriesPage = async () => {
  const categories = await getCategories();
  return (
    <section className="mx-1">
      <div className="bg-white p-4 rounded-xl">
        <div className="flex item-center justify-between mb-2">
          <h1 className="mb-3 md:text-2xl font-bold">All Categories</h1>
          <AddNewCategoryButton />
        </div>
        <div>
          <CategoriesTable columns={columns} data={categories} />
        </div>

      </div>

    </section>
  );
};

export default CategoriesPage;