let videos = [
  {
    title: "Video #1",
    rating: 5,
    comments: 2,
    createdAt: "2 miniutes ago",
    views: 59,
    id: 1,
  },
  {
    title: "Video #2",
    rating: 5,
    comments: 2,
    createdAt: "2 miniutes ago",
    views: 59,
    id: 2,
  },
  {
    title: "Video #3",
    rating: 5,
    comments: 2,
    createdAt: "2 miniutes ago",
    views: 59,
    id: 3,
  },
];

export const trending = (req, res) => {
  return res.render("home", { pageTitle: "Home", videos });
};
export const see = (req, res) => {
  const { id } = req.params;
  const video = videos.find((video) => video.id === parseInt(id));
  return res.render("watch", {
    pageTitle: `Watch ${video.title}`,
    video,
  });
};
export const edit = (req, res) =>
  res.render("edit", { pageTitle: "Edit Video" });
export const search = (req, res) => res.send("Search");
export const upload = (req, res) => res.send("Upload");
export const deleteVideo = (req, res) => {
  return res.send("Delete Video");
};
