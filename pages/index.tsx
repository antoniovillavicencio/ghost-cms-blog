import styles from '../styles/Home.module.scss';
import React from 'react';
import Link from 'next/link';

const { BLOG_URL, CONTENT_API_KEY } = process.env;

type Post = {
  title: string;
  slug: string;
};

async function getPosts() {
  const res = await fetch(
    `${BLOG_URL}/ghost/api/v3/content/posts/?key=${CONTENT_API_KEY}&fields=title,slug,custom_excerpt`
  ).then((res) => res.json());

  const posts = res.posts.map((post) => post);

  return posts;
}

export const getStaticProps = async ({ params }) => {
  const posts = await getPosts();
  return {
    props: { posts }
  };
};

const Home: React.FC<{ posts: Post[] }> = (props) => {
  const { posts } = props;

  return (
    <div className={styles.container}>
      <h1>Hello to my blog!</h1>
      <ul>
        {posts.map((p, index) => {
          return (
            <li key={p.slug}>
              <Link href="/post/[slug]" as={`/post/${p.slug}`}>
                <a>{p.title}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Home;
