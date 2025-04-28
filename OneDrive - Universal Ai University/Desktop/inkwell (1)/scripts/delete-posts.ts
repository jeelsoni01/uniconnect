async function deletePosts() {
  const categories = ['technology', 'business']
  
  for (const category of categories) {
    try {
      const response = await fetch(`http://localhost:3000/api/posts/delete?category=${category}`, {
        method: 'DELETE',
        credentials: 'include',
      })
      
      const data = await response.json()
      console.log(`Category ${category}:`, data.message)
    } catch (error) {
      console.error(`Error deleting ${category} posts:`, error)
    }
  }
}

deletePosts() 