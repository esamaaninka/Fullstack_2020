const dummy = (blogs) => {
  // ...
  //console.log("----------dummy", blogs)
  return 1
}

const totalLikes = (blogs) => {
  //console.log("----------totalLikes", blogs)

  const likes = blogs.map(b => b.likes).reduce((sum,val) => sum + val, 0)
  //console.log("totalLikes: ", likes)
  return likes
}

const favoriteBlog = (blogs) => {
  const liked = Math.max(...blogs.map(b => b.likes))
  const blogi = blogs.find(b => b.likes === liked)
  return blogs.find(b => b.likes === (Math.max(...blogs.map(b => b.likes))))
  // console.log("fav: ", liked, blogi)

}
module.exports = {
  dummy, totalLikes, favoriteBlog
}

