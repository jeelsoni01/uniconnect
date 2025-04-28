import { connectToMongoDB } from "../lib/mongoose"
import User from "../lib/models/user"
import Category from "../lib/models/category"
import Post from "../lib/models/post"
import { hash } from "bcrypt"

async function seed() {
  try {
    console.log("Connecting to MongoDB...")
    await connectToMongoDB()
    console.log("Connected to MongoDB")

    // Clear existing data
    console.log("Clearing existing data...")
    await User.deleteMany({})
    await Category.deleteMany({})
    await Post.deleteMany({})

    // Create admin user
    console.log("Creating admin user...")
    const adminPassword = await hash("password123", 10)
    const admin = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: adminPassword,
      username: "admin",
      bio: "Administrator of Inkwell",
      role: "admin",
    })

    // Create regular user
    console.log("Creating regular user...")
    const userPassword = await hash("password123", 10)
    const user = await User.create({
      name: "John Doe",
      email: "john@example.com",
      password: userPassword,
      username: "johndoe",
      bio: "Regular user of Inkwell",
      role: "user",
    })

    // Create categories
    console.log("Creating categories...")
    const categories = await Category.insertMany([
      {
        name: "Technology",
        slug: "technology",
        description: "Articles about technology and software development",
      },
      {
        name: "Travel",
        slug: "travel",
        description: "Travel guides and experiences",
      },
      {
        name: "Food",
        slug: "food",
        description: "Recipes and food reviews",
      },
      {
        name: "Lifestyle",
        slug: "lifestyle",
        description: "Articles about lifestyle and personal development",
      },
      {
        name: "Business",
        slug: "business",
        description: "Business strategies and entrepreneurship",
      },
      {
        name: "Health",
        slug: "health",
        description: "Health tips and wellness advice",
      },
    ])

    // Create posts
    console.log("Creating posts...")
    const posts = await Post.insertMany([
      {
        title: "Getting Started with Next.js and Tailwind CSS",
        slug: "getting-started-with-nextjs-and-tailwind",
        excerpt: "Learn how to build modern web applications with Next.js and style them using Tailwind CSS.",
        content: `
          <h2>Introduction to Next.js</h2>
          <p>Next.js is a React framework that enables server-side rendering and static site generation for React applications. It provides a great developer experience with features like file-system routing, API routes, and built-in CSS support.</p>
          
          <h2>Why Tailwind CSS?</h2>
          <p>Tailwind CSS is a utility-first CSS framework that allows you to build custom designs without leaving your HTML. It provides low-level utility classes that let you build completely custom designs without ever leaving your HTML.</p>
          
          <h2>Setting Up Your Project</h2>
          <p>To get started with Next.js and Tailwind CSS, you can use the following command:</p>
          
          <pre><code>npx create-next-app my-app --example with-tailwindcss</code></pre>
          
          <p>This will create a new Next.js project with Tailwind CSS already configured.</p>
          
          <h2>Building Your First Component</h2>
          <p>Let's create a simple card component using Tailwind CSS:</p>
          
          <pre><code>&lt;div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl"&gt;
  &lt;div className="md:flex"&gt;
    &lt;div className="md:flex-shrink-0"&gt;
      &lt;img className="h-48 w-full object-cover md:w-48" src="/img/card-image.jpg" alt="Card image"&gt;
    &lt;/div&gt;
    &lt;div className="p-8"&gt;
      &lt;div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold"&gt;Category&lt;/div&gt;
      &lt;a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline"&gt;Card Title&lt;/a&gt;
      &lt;p className="mt-2 text-gray-500"&gt;Card description goes here.&lt;/p&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>
          
          <h2>Conclusion</h2>
          <p>Next.js and Tailwind CSS make a powerful combination for building modern web applications. With Next.js's server-side rendering capabilities and Tailwind's utility-first approach to styling, you can create beautiful, performant websites with ease.</p>
        `,
        coverImage:
          "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=630&q=80",
        category: categories[0]._id, // Technology
        tags: ["Next.js", "Tailwind CSS", "Web Development"],
        author: admin._id,
        publishedAt: new Date(),
        featured: true,
        views: 1250,
        readingTime: 5,
        status: "published",
      },
      {
        title: "The Art of Minimalist Design",
        slug: "the-art-of-minimalist-design",
        excerpt: "Explore the principles of minimalist design and how to apply them to your projects.",
        content: `
          <h2>What is Minimalist Design?</h2>
          <p>Minimalist design is characterized by simplicity, clean lines, and a monochromatic palette with color used as an accent. It focuses on the essential elements, removing anything unnecessary.</p>
          
          <h2>Key Principles of Minimalist Design</h2>
          <ul>
            <li><strong>Simplicity</strong>: Remove unnecessary elements and focus on what's essential.</li>
            <li><strong>White Space</strong>: Use negative space to create balance and focus attention.</li>
            <li><strong>Limited Color Palette</strong>: Stick to a few colors to maintain simplicity.</li>
            <li><strong>Typography</strong>: Use clean, readable fonts and clear hierarchy.</li>
          </ul>
          
          <h2>Examples of Minimalist Design</h2>
          <p>Apple is often cited as a prime example of minimalist design in both their products and marketing. Their website uses ample white space, limited colors, and focuses on product imagery.</p>
          
          <h2>How to Apply Minimalist Design</h2>
          <ol>
            <li>Start by removing unnecessary elements from your design.</li>
            <li>Use a limited color palette, typically with one accent color.</li>
            <li>Embrace white space to create balance and focus.</li>
            <li>Choose simple, readable typography.</li>
            <li>Use high-quality imagery that supports your message.</li>
          </ol>
          
          <h2>Conclusion</h2>
          <p>Minimalist design is not about removing elements until there's nothing left, but about finding the perfect balance where everything serves a purpose. By focusing on simplicity and functionality, you can create designs that are both beautiful and effective.</p>
        `,
        coverImage:
          "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=630&q=80",
        category: categories[3]._id, // Lifestyle
        tags: ["Design", "Minimalism", "UI/UX"],
        author: user._id,
        publishedAt: new Date(),
        featured: true,
        views: 980,
        readingTime: 4,
        status: "published",
      },
      {
        title: "Building a RESTful API with Node.js and Express",
        slug: "building-restful-api-nodejs-express",
        excerpt: "A comprehensive guide to creating a RESTful API using Node.js and Express.",
        content: `
          <h2>Introduction to RESTful APIs</h2>
          <p>REST (Representational State Transfer) is an architectural style for designing networked applications. RESTful APIs use HTTP requests to perform CRUD operations (Create, Read, Update, Delete) on resources.</p>
          
          <h2>Setting Up Your Node.js Project</h2>
          <p>First, initialize a new Node.js project:</p>
          
          <pre><code>mkdir my-api
cd my-api
npm init -y
npm install express mongoose dotenv</code></pre>
          
          <h2>Creating Your Express Server</h2>
          <p>Create a file named <code>server.js</code> with the following code:</p>
          
          <pre><code>const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Routes
app.use('/api/users', require('./routes/users'));

app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));</code></pre>
          
          <h2>Creating Models</h2>
          <p>Create a models directory and add a file for your user model:</p>
          
          <pre><code>const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);</code></pre>
          
          <h2>Creating Routes</h2>
          <p>Create a routes directory and add a file for your user routes:</p>
          
          <pre><code>const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Create user
router.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    user = new User({
      name,
      email,
      msg: 'User already exists'});

    user = new User({
      name,
      email,
      password
    });

    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update user
router.put('/:id', async (req, res) => {
  const { name, email } = req.body;
  
  // Build user object
  const userFields = {};
  if (name) userFields.name = name;
  if (email) userFields.email = email;
  
  try {
    let user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });
    
    user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: userFields },
      { new: true }
    ).select('-password');
    
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete user
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });
    
    await User.findByIdAndRemove(req.params.id);
    res.json({ msg: 'User removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;</code></pre>
          
          <h2>Conclusion</h2>
          <p>You've now created a basic RESTful API with Node.js and Express. This API allows you to perform CRUD operations on a user resource. You can expand this by adding authentication, validation, and more resources as needed.</p>
        `,
        coverImage:
          "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=630&q=80",
        category: categories[0]._id, // Technology
        tags: ["Node.js", "Express", "API", "Backend"],
        author: admin._id,
        publishedAt: new Date(),
        featured: false,
        views: 1540,
        readingTime: 7,
        status: "published",
      },
    ])

    console.log("Seed completed successfully!")
    process.exit(0)
  } catch (error) {
    console.error("Seed failed:", error)
    process.exit(1)
  }
}

seed()
