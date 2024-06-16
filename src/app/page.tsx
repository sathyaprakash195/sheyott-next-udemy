import SearchShows from "@/components/search";
import { IShow } from "@/interfaces/shows";
import { getAllShows } from "@/server-actions/shows";
import Link from "next/link";

export default async function Home({
  searchParams,
}: {
  searchParams: { query: string };
}) {

  const showsResponse = await getAllShows(searchParams.query);
  const shows: IShow[] = showsResponse.data;
  return (
    <div>
      <SearchShows />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 mt-7">
        {shows?.map((show: IShow) => (
          <Link href={`/show/${show._id}`}>
            <div className="rounded">
              <img
                src={show.mainImage}
                alt={show.title}
                className="w-full h-48 object-cover rounded"
              />
              <h1 className="text-sm font-semibold">
                {show.title} ({show.type})
              </h1>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
