const bcrypt = require('bcryptjs');
const { User, Post, Comment } = require('./models');

const seedDatabase = async () => {
    try {
        const count = await Post.count();
        if (count > 0) {
            console.log('Database already contains data, skipping seed.');
            return;
        }

        console.log('Seeding predefined data...');

        // Create Users or find existing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('password123', salt);

        let user1 = await User.findOne({ where: { email: 'john@example.com' } });
        if (!user1) {
            user1 = await User.create({
                username: 'JohnDoe',
                email: 'john@example.com',
                password: hashedPassword,
                role: 'admin'
            });
        }

        let user2 = await User.findOne({ where: { email: 'jane@example.com' } });
        if (!user2) {
            user2 = await User.create({
                username: 'JaneSmith',
                email: 'jane@example.com',
                password: hashedPassword,
                role: 'user'
            });
        }


        // Create Posts
        const post1 = await Post.create({
            title: 'Welcome to BlogSpace!',
            content: 'This is the first predefined post on the platform. We are excited to have you here. You can create your own posts, edit them, and comment on other peoples posts. The platform is fully responsive and supports dark mode out of the box!',
            category: 'Technology',
            authorId: user1.id,
            views: 42
        });

        const post2 = await Post.create({
            title: 'Top 5 Tips for Healthy Living',
            content: '1. Drink plenty of water.\n2. Exercise regularly.\n3. Get at least 8 hours of sleep.\n4. Eat a balanced diet rich in vegetables.\n5. Take time for mental health and relaxation.',
            category: 'Health',
            authorId: user2.id,
            views: 15
        });

        const post3 = await Post.create({
            title: 'The Future of Web Development',
            content: 'Web development is evolving rapidly. With the rise of AI tools and advanced frameworks like React, Next.js, and solid backend solutions like Node.js, building scalable applications has never been easier. What are your thoughts on the future of coding?',
            category: 'Technology',
            authorId: user1.id,
            views: 89
        });

        // Create Comments
        await Comment.create({
            content: 'Great first post! Exciting times ahead.',
            postId: post1.id,
            userId: user2.id
        });

        await Comment.create({
            content: 'I completely agree with the healthy living tips. Sleep is so underrated.',
            postId: post2.id,
            userId: user1.id
        });

        console.log('Database successfully seeded with users, posts, and comments!');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
};

module.exports = seedDatabase;
