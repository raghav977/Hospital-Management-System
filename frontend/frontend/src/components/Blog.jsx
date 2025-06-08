import React from 'react';
import Header from './Header'; // Assuming you have a Header component
import Footer from './Footer';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'Advances in Minimally Invasive Surgery',
      date: 'October 26, 2023',
      excerpt: 'Discover the latest advancements in minimally invasive surgical techniques and their benefits for patients.',
      imageUrl: 'https://th.bing.com/th/id/R.60e74faa51fea3887c23da8ddb795b55?rik=oeXTzINz1Jxd3g&pid=ImgRaw&r=0',
      link: '/blog/1',
    },
    {
      id: 2,
      title: 'Understanding Common Heart Conditions',
      date: 'November 5, 2023',
      excerpt: 'Learn about the symptoms, causes, and treatments for common heart conditions.',
      imageUrl: 'https://th.bing.com/th/id/R.9a23ac2f0a6e8823e4937b25facdb066?rik=ih3B1bifZ6eTlw&pid=ImgRaw&r=0',
      link: '/blog/2',
    },
    {
      id: 3,
      title: 'The Importance of Mental Health in Healthcare',
      date: 'November 15, 2023',
      excerpt: 'Explore the crucial role of mental health support in overall patient care and well-being.',
      imageUrl: 'https://th.bing.com/th/id/OIP.EqoIQyF0VenKSp5CVxqfYAHaEK?rs=1&pid=ImgDetMain',
      link: '/blog/3',
    },
      {
      id: 4,
      title: 'New Treatments for Diabetes',
      date: 'December 2, 2023',
      excerpt: 'Discover the latest treatments and management strategies for diabetes patients.',
      imageUrl: 'https://th.bing.com/th/id/OIP.Q2Wn8mITbRLJ7vY1ADNlxQHaEO?rs=1&pid=ImgDetMain',
      link: '/blog/4',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Header />
        <div className="mt-8">
          <h1 className="text-3xl font-semibold text-blue-600 mb-6 text-center">
            Our Blog
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden"
              >
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2 text-blue-800">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4">{post.date}</p>
                  <p className="text-gray-700 mb-4">{post.excerpt}</p>
                  <a
                    href={post.link}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Read More
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Blog;