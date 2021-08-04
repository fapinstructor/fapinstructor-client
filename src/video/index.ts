const createYouTubeLink = (videoId: string) =>
  `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&amp;showinfo=0&autoplay=0`;

const videoLibrary = {
  CockBallsTie: createYouTubeLink("lnX-zRnqA94"),
  BallSeperation: createYouTubeLink("-ZYUVJwSBio"),
  CockBallWrapping: createYouTubeLink("YcnhFFapoH4"),
  BallWrapping: createYouTubeLink("2XAEket8d8w"),
};

export default videoLibrary;
