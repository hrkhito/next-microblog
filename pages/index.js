import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from "next/link";
import Layout, { siteTitle } from '../components/Layout';
import utilStyle from "../styles/utils.module.css";
import { getPostsData } from '../lib/post';

// SSGの場合
export async function getStaticProps() {
  const allPostsData=getPostsData(); //id,title,date,thumbnail

  return {
    props: {
      allPostsData,
    },
  }
}

// SSRの場合 contextの中にはユーザーがリクエストした情報が入る
// export async function getServerSideProps(context) {
//   return {
//     props: {
//       // コンポーネントに渡すためのpropsが
//     }
//   }
// }

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyle.headingMd}>
        <p>私はフルスタックエンジニアです/Udemy講師として活動しています/好きな言語はJavascriptです</p>
      </section>
      <section>
        <h2>📝エンジニアのブログ</h2>
        <div className={styles.grid}>
          {allPostsData.map(({id,title,date,thumbnail})=>(
            <article key={id}>
              <Link href={`/posts/${id}`}>
                <Image className={styles.thumbnailImage} width="100" height="100" src={`${thumbnail}`} alt="#" />
              </Link>
              <Link className={utilStyle.boldText} href={`/posts/${id}`}>
                {title}
              </Link>
              <br />
              <small className={utilStyle.lightText}>{date}</small>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  )
}
