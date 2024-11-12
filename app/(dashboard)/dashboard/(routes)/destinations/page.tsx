import { getAllDestinations } from "@/app/_actions/_destinationActions";
import { DestinationsTable } from "@/components/destinations/DestinationsTable/DestinationTable";
import { columns } from "@/components/destinations/DestinationsTable/columns";

import AddNewDestinationButton from "@/components/destinations/AddNewDestinationButton";


const getDestinations = async () => {
  const data = await getAllDestinations();
  return data;
};

const DestinationsPage = async () => {
  const destinations = await getDestinations();
  return (
    <section className="mx-1">
      <div className="bg-white p-4 rounded-xl">
        <div className="flex item-center justify-between mb-2">
          <h1 className="mb-3  md:text-3xl font-bold">All Destinations</h1>
          <AddNewDestinationButton />
        </div>
        <div>
          <DestinationsTable columns={columns} data={destinations}/>
        </div>

      </div>

    </section>
  );
};

export default DestinationsPage;