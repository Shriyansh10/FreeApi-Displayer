import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { fetchData } from "../services/fetchData.js";
import InfiniteScroll from "react-infinite-scroll-component";

export const Route = createFileRoute("/videos")({
  component: RouteComponent,
});

function RouteComponent() {
  const [values, setValues] = useState({
    url: "https://api.freeapi.app/api/v1/public/youtube/videos",
    page: 1,
    limit: 10,
    method: "GET",
    maxPages: 5,
  });
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const handleFetch = async (controller) => {
    const res = await fetchData(
      values.url,
      values.page,
      values.limit,
      values.method,
      controller,
    );
    return res;
  };

  useEffect(() => {
    const controller = new AbortController();

    handleFetch(controller)
      .then((res) => {
        setData(res.data);
        setValues((v) => ({
          ...v,
          maxPages: res.data.totalPages,
          page: Math.min(v.page + 1, values.maxPages),
        }));
        if (res.data.nextPage === false) setHasMore(false);
        else setHasMore(true);
        setLoading(false);
      })
      .catch((err) => console.log("Data fetching error: ", err));

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMore = async () => {
    const res = await handleFetch();
    setValues((v) => ({ ...v, page: Math.min(v.page + 1, values.maxPages) }));
    setData((d) => ({
      ...d,
      data: [...d.data, ...res.data.data],
    }));

    if (values.page >= values.maxPages) {
      setHasMore(false);
      return;
    }
  };

  const getTimeDifference = (publishedAt) => {
    const now = new Date();
    const publishedDate = new Date(publishedAt);
    const diffInSeconds = Math.floor((now - publishedDate) / 1000);
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);

    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) return `${diffInDays} days ago`;
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) return `${diffInMonths} months ago`;
    const diffInYears = Math.floor(diffInMonths / 12);
    return `${diffInYears} years ago`;
  };

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-slate-700 border-t-indigo-500" />
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-7xl space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-white">
          Video Feed
        </h1>

        <p className="mt-2 text-slate-400">
          Endless developer videos with infinite scrolling.
        </p>
      </div>

      <InfiniteScroll
        dataLength={data.data.length}
        next={fetchMore}
        hasMore={hasMore}
        loader={
          <div className="flex items-center justify-center py-10">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-700 border-t-indigo-500" />
          </div>
        }
        endMessage={
          <div className="py-10 text-center text-slate-400">
            All videos loaded.
          </div>
        }
      >
        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {data.data.map((video, index) => {
            const item = video.items.snippet;
            const stats = video.items.statistics;

            return (
              <article
                key={`${video.items.id}-${index}`}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.thumbnails.maxres.url}
                    alt={item.title}
                    className="aspect-video w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute bottom-4 right-4 rounded-lg bg-black/70 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                    {video.items.contentDetails.duration
                      .replace("PT", "")
                      .replace("H", "h ")
                      .replace("M", "m ")
                      .replace("S", "s")}
                  </div>
                </div>

                <div className="space-y-5 p-6">
                  <div>
                    <h2 className="line-clamp-2 text-xl font-bold leading-8 text-white">
                      {item.title}
                    </h2>

                    <div className="mt-3 flex items-center gap-3">
                      <span className="rounded-full bg-indigo-500/15 px-3 py-1 text-xs font-medium text-indigo-300">
                        {item.channelTitle}
                      </span>

                      <span className="text-sm text-slate-500">
                        {getTimeDifference(item.publishedAt)}
                      </span>
                    </div>

                    <p className="mt-4 line-clamp-4 leading-7 text-slate-400">
                      {item.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center">
                      <p className="text-xs text-slate-400">Views</p>

                      <p className="mt-1 text-sm font-semibold text-white">
                        {stats.viewCount}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center">
                      <p className="text-xs text-slate-400">Likes</p>

                      <p className="mt-1 text-sm font-semibold text-white">
                        {stats.likeCount}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center">
                      <p className="text-xs text-slate-400">Comments</p>

                      <p className="mt-1 text-sm font-semibold text-white">
                        {stats.commentCount}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {item.tags?.slice(0, 4).map((tag, idx) => (
                      <span
                        key={idx}
                        className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs text-indigo-200"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </InfiniteScroll>
    </section>
  );

  // if (loading) return <div>Loading...</div>;

  // return (
  //   <InfiniteScroll
  //     dataLength={data.data.length}
  //     next={fetchMore}
  //     hasMore={hasMore}
  //     loader={<div>Loading...</div>}
  //     endMessage={<p style={{ textAlign: "center" }}>All items loaded.</p>}
  //   >
  //     {data.data.map((video, index) => {
  //       const item = video.items.snippet;
  //       return (
  //         <div key={index}>
  //           <img src={item.thumbnails.maxres.url} alt="" />
  //           <h3>{item.title}</h3>
  //           <div>
  //             {item.channelTitle} - {getTimeDifference(item.publishedAt)}
  //           </div>
  //           <div>
  //             <div>Description</div>
  //             {item.description}
  //           </div>
  //         </div>
  //       );
  //     })}
  //   </InfiniteScroll>
  // );
}

/* "items": {
          "kind": "youtube#video",
          "id": "75hqPk6pq5g",
          "snippet": {
            "publishedAt": "2023-07-19T13:16:33Z",
            "channelId": "UCXgGY0wkgOzynnHvSEVmE3A",
            "title": "Flutter Windows Installation",
            "description": "https://hitesh.ai/discord\n\nFacebook: https://www.facebook.com/HiteshChoudharyPage\nInstagram: https://instagram.com/hiteshchoudharyofficial\nhomepage: http://www.hiteshChoudhary.com\n\nDisclaimer:\nIt doesn't feel good to have a disclaimer in every video but this is how the world is right now. \nAll videos are for educational purposes and use them wisely. Any video may have a slight mistake, please take decisions based on your research. This video is not forcing anything on you.\n\nAll Amazon links are affiliate links (If any).",
            "thumbnails": {
              "default": {
                "url": "https://i.ytimg.com/vi/75hqPk6pq5g/default.jpg",
                "width": 120,
                "height": 90
              },
              "medium": {
                "url": "https://i.ytimg.com/vi/75hqPk6pq5g/mqdefault.jpg",
                "width": 320,
                "height": 180
              },
              "high": {
                "url": "https://i.ytimg.com/vi/75hqPk6pq5g/hqdefault.jpg",
                "width": 480,
                "height": 360
              },
              "standard": {
                "url": "https://i.ytimg.com/vi/75hqPk6pq5g/sddefault.jpg",
                "width": 640,
                "height": 480
              },
              "maxres": {
                "url": "https://i.ytimg.com/vi/75hqPk6pq5g/maxresdefault.jpg",
                "width": 1280,
                "height": 720
              }
            },
            "channelTitle": "Hitesh Choudhary",
            "tags": [
              "Programming",
              "javascript",
              "flutter",
              "flutter windows"
            ],
            "categoryId": "28",
            "liveBroadcastContent": "none",
            "localized": {
              "title": "Flutter Windows Installation",
              "description": "https://hitesh.ai/discord\n\nFacebook: https://www.facebook.com/HiteshChoudharyPage\nInstagram: https://instagram.com/hiteshchoudharyofficial\nhomepage: http://www.hiteshChoudhary.com\n\nDisclaimer:\nIt doesn't feel good to have a disclaimer in every video but this is how the world is right now. \nAll videos are for educational purposes and use them wisely. Any video may have a slight mistake, please take decisions based on your research. This video is not forcing anything on you.\n\nAll Amazon links are affiliate links (If any)."
            },
            "defaultAudioLanguage": "en"
          },
          "contentDetails": {
            "duration": "PT19M35S",
            "dimension": "2d",
            "definition": "hd",
            "caption": "false",
            "licensedContent": true,
            "contentRating": {

            },
            "projection": "rectangular"
          },
          "statistics": {
            "viewCount": "2955",
            "likeCount": "163",
            "favoriteCount": "0",
            "commentCount": "51"
          }
        } */
