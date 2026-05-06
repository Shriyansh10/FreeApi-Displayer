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

    console.log("Videos data fetched successfully:", res.data);
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

  if (loading) return <div>Loading...</div>;

  return (
    <InfiniteScroll
      dataLength={data.data.length}
      next={fetchMore}
      hasMore={hasMore}
      loader={<div>Loading...</div>}
      endMessage={<p style={{ textAlign: "center" }}>All items loaded.</p>}
    >
      {data.data.map((video, index) => {
        const item = video.items.snippet;
        return (
          <div key={index}>
            <img src={item.thumbnails.maxres.url} alt="" />
            <h3>{item.title}</h3>
            <div>
              {item.channelTitle} - {getTimeDifference(item.publishedAt)}
            </div>
            <div>
              <div>Description</div>
              {item.description}
            </div>
          </div>
        );
      })}
    </InfiniteScroll>
  );
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
