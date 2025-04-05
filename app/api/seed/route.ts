import { NextResponse } from "next/server"
import { getDatabase } from "@/lib/db"
import { hash } from "bcrypt"

export async function GET() {
  try {
    const db = await getDatabase()

    // Create collections if they don't exist
    const collections = await db.listCollections().toArray()
    const collectionNames = collections.map((c) => c.name)

    if (!collectionNames.includes("users")) {
      await db.createCollection("users")
    }

    if (!collectionNames.includes("events")) {
      await db.createCollection("events")
    }

    // Seed test user
    const usersCollection = db.collection("users")
    const testUser = await usersCollection.findOne({ email: "test@example.com" })

    if (!testUser) {
      await usersCollection.insertOne({
        name: "Test User",
        email: "test@example.com",
        password: await hash("password123", 10),
        university: "Test University",
        createdAt: new Date(),
        updatedAt: new Date(),
        skills: ["React", "Node.js", "MongoDB"],
        bio: "This is a test user account for demonstration purposes.",
        social: {
          github: "github.com/testuser",
          linkedin: "linkedin.com/in/testuser",
        },
        image: "/placeholder.svg?height=200&width=200&text=TU",
      })
    }

    // Seed events
    const eventsCollection = db.collection("events")
    const eventsCount = await eventsCollection.countDocuments()

    if (eventsCount === 0) {
      const events = [
        {
          title: "AI Workshop",
          date: "March 25, 2025",
          time: "10:00 AM",
          venue: "Tech Hub",
          mode: "Online",
          priority: "High",
          description:
            "Join us for an exciting AI workshop where you'll learn about the latest developments in artificial intelligence and machine learning. Perfect for beginners and intermediate developers.",
          longDescription: `
            <p>This comprehensive AI workshop is designed to introduce participants to the fundamentals of artificial intelligence and machine learning. Whether you're a beginner curious about AI or an intermediate developer looking to enhance your skills, this workshop offers valuable insights and hands-on experience.</p>
            
            <h3>What You'll Learn:</h3>
            <ul>
              <li>Fundamentals of AI and machine learning</li>
              <li>Python programming for AI applications</li>
              <li>Building and training neural networks</li>
              <li>Natural language processing techniques</li>
              <li>Computer vision applications</li>
            </ul>
            
            <h3>Workshop Schedule:</h3>
            <p>10:00 AM - 11:30 AM: Introduction to AI concepts</p>
            <p>11:30 AM - 12:30 PM: Python for AI - Practical session</p>
            <p>12:30 PM - 1:30 PM: Lunch break</p>
            <p>1:30 PM - 3:00 PM: Building neural networks</p>
            <p>3:00 PM - 4:30 PM: Hands-on project work</p>
            <p>4:30 PM - 5:00 PM: Q&A and closing remarks</p>
            
            <h3>Requirements:</h3>
            <p>Participants should have basic programming knowledge. Bring your laptop with Python installed. All necessary libraries and tools will be provided during the workshop.</p>
          `,
          teamSize: "2-4 members",
          prizeWorth: "25,000 Rs/-",
          image: "/placeholder.svg?height=400&width=800&text=AI+Workshop",
          category: "Workshop",
          organizer: "Tech Innovators Association",
          registrationDeadline: "March 20, 2025",
          createdAt: new Date(),
          updatedAt: new Date(),
          speakers: [
            {
              name: "Dr. Aisha Patel",
              role: "AI Research Scientist",
              image: "/placeholder.svg?height=100&width=100&text=AP",
            },
            {
              name: "Prof. Raj Kumar",
              role: "ML Engineer",
              image: "/placeholder.svg?height=100&width=100&text=RK",
            },
          ],
          faqs: [
            {
              question: "Is this workshop suitable for beginners?",
              answer: "Yes, the workshop is designed for both beginners and intermediate developers.",
            },
            {
              question: "Do I need to bring my own laptop?",
              answer: "Yes, please bring your laptop with Python installed.",
            },
            {
              question: "Will certificates be provided?",
              answer: "Yes, all participants will receive a certificate of completion.",
            },
          ],
        },
        {
          title: "Google Hackathon",
          date: "April 10, 2025",
          time: "09:00 AM",
          venue: "Google Office",
          mode: "Hybrid",
          priority: "Medium",
          description:
            "Join the Google Hackathon to solve real-world problems using Google technologies. Great opportunity to showcase your skills and win amazing prizes.",
          longDescription: `
            <p>Google Hackathon is a premier coding competition where participants solve real-world problems using Google technologies. This is your chance to showcase your coding skills, collaborate with like-minded individuals, and win amazing prizes!</p>
            
            <h3>Hackathon Themes:</h3>
            <ul>
              <li>Sustainable Development</li>
              <li>Education Technology</li>
              <li>Healthcare Innovation</li>
              <li>Smart Cities</li>
            </ul>
            
            <h3>Technologies:</h3>
            <p>Participants are encouraged to use Google technologies such as:</p>
            <ul>
              <li>Google Cloud Platform</li>
              <li>TensorFlow</li>
              <li>Firebase</li>
              <li>Flutter</li>
              <li>Google Maps API</li>
            </ul>
            
            <h3>Schedule:</h3>
            <p>Day 1:</p>
            <p>9:00 AM - 10:00 AM: Registration and team formation</p>
            <p>10:00 AM - 11:00 AM: Opening ceremony and problem statements</p>
            <p>11:00 AM - 8:00 PM: Hacking begins</p>
            
            <p>Day 2:</p>
            <p>9:00 AM - 4:00 PM: Continued hacking</p>
            <p>4:00 PM - 6:00 PM: Project submissions</p>
            <p>6:00 PM - 8:00 PM: Presentations and judging</p>
            <p>8:00 PM - 9:00 PM: Awards ceremony</p>
          `,
          teamSize: "3-5 members",
          prizeWorth: "50,000 Rs/-",
          image: "/placeholder.svg?height=400&width=800&text=Google+Hackathon",
          category: "Hackathon",
          organizer: "Google Developer Group",
          registrationDeadline: "April 1, 2025",
          createdAt: new Date(),
          updatedAt: new Date(),
          speakers: [
            {
              name: "Sundar Pichai",
              role: "CEO, Google",
              image: "/placeholder.svg?height=100&width=100&text=SP",
            },
            {
              name: "Fiona Cicconi",
              role: "Chief People Officer",
              image: "/placeholder.svg?height=100&width=100&text=FC",
            },
          ],
          faqs: [
            {
              question: "Can I participate remotely?",
              answer: "Yes, this is a hybrid event. You can participate either in-person or remotely.",
            },
            {
              question: "Do I need to have a team before registering?",
              answer: "No, you can register individually and form teams during the event.",
            },
            {
              question: "What are the judging criteria?",
              answer:
                "Projects will be judged based on innovation, technical complexity, practicality, and presentation.",
            },
          ],
        },
        {
          title: "IIT Jodhpur Hackathon",
          date: "September 15, 2025",
          time: "10:00 AM",
          venue: "IIT Jodhpur",
          mode: "Offline",
          priority: "Medium",
          description: "Registration open till 1st September.",
          longDescription: `
            <p>IIT Jodhpur Hackathon is one of the most prestigious hackathons in India, bringing together the brightest minds to solve challenging problems. This is a 48-hour coding marathon where participants will work on innovative solutions to real-world problems.</p>
            
            <h3>Themes:</h3>
            <ul>
              <li>Artificial Intelligence</li>
              <li>Blockchain Technology</li>
              <li>Internet of Things</li>
              <li>Cybersecurity</li>
            </ul>
            
            <h3>Prizes:</h3>
            <p>First Prize: Rs. 25,000</p>
            <p>Second Prize: Rs. 15,000</p>
            <p>Third Prize: Rs. 10,000</p>
            <p>Special Category Prizes: Rs. 5,000 each</p>
            
            <h3>Eligibility:</h3>
            <p>Open to all undergraduate and postgraduate students from recognized institutions across India.</p>
          `,
          teamSize: "3-5 members",
          prizeWorth: "25,000 Rs/-",
          image: "/placeholder.svg?height=400&width=800&text=IIT+Jodhpur+Hackathon",
          category: "Hackathon",
          organizer: "IIT Jodhpur",
          registrationDeadline: "September 1, 2025",
          createdAt: new Date(),
          updatedAt: new Date(),
          speakers: [
            {
              name: "Dr. Shantanu Kumar",
              role: "Professor, Computer Science",
              image: "/placeholder.svg?height=100&width=100&text=SK",
            },
            {
              name: "Priya Mehta",
              role: "Tech Lead, Microsoft",
              image: "/placeholder.svg?height=100&width=100&text=PM",
            },
          ],
          faqs: [
            {
              question: "Is accommodation provided?",
              answer: "Yes, accommodation will be provided for participants from outside Jodhpur.",
            },
            {
              question: "What should I bring?",
              answer: "Bring your laptop, charger, and any other equipment you might need for your project.",
            },
            {
              question: "Is there a registration fee?",
              answer: "No, participation is free of charge.",
            },
          ],
        },
      ]

      await eventsCollection.insertMany(events)
    }

    return NextResponse.json({
      message: "Database seeded successfully",
      collections: collectionNames,
    })
  } catch (error) {
    console.error("Error seeding database:", error)
    return NextResponse.json({ error: "Failed to seed database" }, { status: 500 })
  }
}

