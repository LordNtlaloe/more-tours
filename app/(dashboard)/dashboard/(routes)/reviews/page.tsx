import { getAllRatings } from "@/app/_actions/_ratingsActions";
import { ReviewsTable } from "@/components/reviews/ReviewsTable/ReviewsTable";
import { columns } from "@/components/reviews/ReviewsTable/columns";


const getReviews = async () => {
  const data = await getAllRatings();
  return data;
};

const ReviewsPage = async () => {
  const reviews = await getReviews();
  return (
    <section className="mx-1">
      <div className="bg-white p-4 rounded-xl">
        <div className="flex item-center justify-between mb-2">
          <h1 className="mb-3  md:text-3xl font-bold">All Reviews</h1>
        </div>
        <div>
          <ReviewsTable columns={columns} data={reviews} />
        </div>

      </div>

    </section>
  );
};

export default ReviewsPage;