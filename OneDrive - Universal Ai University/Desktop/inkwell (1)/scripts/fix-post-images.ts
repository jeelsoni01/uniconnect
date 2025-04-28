async function fixPostImages() {
  try {
    const response = await fetch('http://localhost:3000/api/posts/fix-images', {
      method: 'POST',
      credentials: 'include',
    });
    
    const data = await response.json();
    console.log('Fix post images response:', data);
  } catch (error) {
    console.error('Error fixing post images:', error);
  }
}

fixPostImages(); 