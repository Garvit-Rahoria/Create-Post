import { useState, useEffect } from 'react';
import axios from 'axios'

function Feed() {

    const [posts, setPosts] = useState([
        {
            _id: "1",
            image: "https://img.magnific.com/free-photo/closeup-shot-beautiful-butterfly-with-interesting-textures-orange-petaled-flower_181624-7640.jpg?semt=ais_test_b&w=740&q=80",
            caption: "Beautiful Scenery"
        }
    ]);

    useEffect(()=> {

        axios.get("http://localhost:3000/posts").
        then((res)=>{
            setPosts(res.data.posts)
        })
    },[])



    return (
        <section className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-10">
                    Latest Posts
                </h1>

                {posts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {posts.map((post) => (
                            <div
                                key={post._id}
                                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                            >
                                <div className="h-64 bg-gray-100 flex items-center justify-center">
                                    <img
                                        src={post.image}
                                        alt={post.caption}
                                        className="w-full h-full object-contain"
                                    />
                                </div>

                                <div className="p-4">
                                    <p className="text-gray-700 text-sm line-clamp-2">
                                        {post.caption}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-24">
                        <div className="text-7xl mb-4">📷</div>
                        <h2 className="text-2xl font-semibold text-gray-700">
                            No Posts Available
                        </h2>
                        <p className="text-gray-500 mt-2">
                            Upload your first post to get started.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}

export default Feed;
