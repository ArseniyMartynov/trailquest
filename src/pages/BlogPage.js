import { useState } from 'react';
import { BLOG_POSTS } from '../data';
import SectionHeader from '../components/ui/SectionHeader';

const ArticleDetail = ({ post, onBack }) => (
    <div className="overlay">
        <div className="overlay-inner">
            <button className="back-btn" onClick={onBack}>← Назад до блогу</button>
            <div className="ov-emoji">{post.emoji}</div>
            <span className="section-tag">{post.tag}</span>
            <h1 className="ov-title">{post.title}</h1>
            <p style={{ color: 'var(--muted)', marginBottom: '2rem', fontSize: '.9rem' }}>
                {post.date}
            </p>
            {/*<div className="ov-body">*/}
            {/*    <p>{post.excerpt}</p>*/}
            {/*    <p>*/}
            {/*        Цей матеріал підготовлений командою досвідчених туристів TrailQuest.*/}
            {/*        Природні краєвиди, свіже повітря та неймовірні панорами роблять кожен крок незабутнім.*/}
            {/*    </p>*/}
            {/*    <p>*/}
            {/*        Обов'язково перевірте прогноз погоди, підготуйте спорядження та*/}
            {/*        повідомте когось про маршрут. Безпека — перш за все.*/}
            {/*    </p>*/}
            {/*</div>*/}
            <div className="ov-body">
                {post.content.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                ))}
            </div>
        </div>
    </div>
);

const BlogPage = ({ initPost }) => {
    const [post, setPost] = useState(initPost || null);

    if (post) return <ArticleDetail post={post} onBack={() => setPost(null)} />;

    return (
        <div className="page-wrapper">
            <section className="page-section">
                <SectionHeader
                    tag="Блог"
                    title="Статті та поради"
                    sub="Корисні матеріали від досвідчених туристів та інструкторів."
                />
                <div className="blog-grid">
                    {BLOG_POSTS.map((p) => (
                        <div key={p.id} className="blog-card" onClick={() => setPost(p)}>
                            <div className="blog-emoji">{p.emoji}</div>
                            <span className="blog-pill">{p.tag}</span>
                            <div className="blog-title">{p.title}</div>
                            <div className="blog-excerpt">{p.excerpt}</div>
                            <div className="blog-date">{p.date}</div>
                            <div className="blog-read">Читати →</div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default BlogPage;